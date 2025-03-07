"use client";
import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import Cookies from "js-cookie";

import { REFRESH_TOKEN_QUERY } from "../(auth)/queries";
import { __access_token, __refresh_token } from "../(auth)/constants/values";
import { ERROR_CODES } from "./constants";

let pendingRequests: CallableFunction[] = [];
let isRefreshing = false;

const apolloClient = new ApolloClient({
  link: from([]),
  cache: new InMemoryCache(),
});

const applyRefreshToken = async () => {
  if (isRefreshing)
    return new Promise((resolve) => pendingRequests.push(resolve));
  try {
    const refreshToken = Cookies.get(__refresh_token);
    const body = { refreshToken };
    const { data } = await apolloClient.mutate({
      mutation: REFRESH_TOKEN_QUERY,
      variables: { body },
    });
    if (data.refresh) {
      Cookies.set(__refresh_token, data.refresh.refreshToken);
      Cookies.set(__access_token, data.refresh.accessToken);
      pendingRequests.forEach((req) => req(data.refresh.accessToken));
      pendingRequests = [];
      return data.refresh.accessToken;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isRefreshing = false;
  }
  return null;
};

const authLink = setContext(async (_, second) => {
  const token = Cookies.get(__access_token);
  return {
    headers: {
      ...second.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({ uri: "http://localhost:4000/graphql" });

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === ERROR_CODES.UNAUTHORIZED) {
        // Return a new Observable to handle the token refresh
        return new Observable((observer) => {
          // Refresh your accessToken async here
          applyRefreshToken()
            .then((newAccessToken) => {
              // Retry with new token
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers,
                  Authorization: `Bearer ${newAccessToken}`,
                },
              }));
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              };
              forward(operation).subscribe(subscriber);
            })
            .catch((error) => {
              // Handle failed refresh
              observer.error(error);
            });
        });
      }
    }
  }
});

apolloClient.setLink(from([errorLink, authLink, httpLink]));
export { apolloClient };
