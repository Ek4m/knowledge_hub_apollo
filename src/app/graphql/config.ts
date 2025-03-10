"use client";
import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import Cookies from "js-cookie";
import { createClient } from "graphql-ws";

import { REFRESH_TOKEN_QUERY } from "../(auth)/queries";
import { __access_token, __refresh_token } from "../(auth)/constants/values";
import { API_URI, ERROR_CODES } from "./constants";
import { getMainDefinition, Observable } from "@apollo/client/utilities";

let pendingRequests: CallableFunction[] = [];
let isRefreshing = false;

const apolloClient = new ApolloClient({
  defaultOptions: {
    mutate: { errorPolicy: "all" },
    query: { errorPolicy: "all" },
    watchQuery: { errorPolicy: "all" },
  },
  link: from([]),
  cache: new InMemoryCache(),
});

const applyRefreshToken = async () => {
  console.log(isRefreshing);
  if (isRefreshing) {
    return new Promise((resolve) => pendingRequests.push(resolve));
  } else {
    try {
      isRefreshing = true;
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
  }
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

const httpLink = createHttpLink({ uri: `http://${API_URI}` });

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${API_URI}`,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink, // web socket connection for subscriptions
  httpLink // http connection for query and mutation
);

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      if (
        error.extensions &&
        error.extensions.code === ERROR_CODES.UNAUTHORIZED
      ) {
        const err = graphQLErrors.find(
          (e) => e.extensions && e.extensions?.code === ERROR_CODES.UNAUTHORIZED
        );
        if (err) {
          return new Observable((observer) => {
            applyRefreshToken().then((token) => {
              if (typeof token === "string") {
                operation.setContext(({ headers = {} }) => {
                  return {
                    headers: {
                      ...headers,
                      Authorization: `Bearer ${token}`,
                    },
                  };
                });
                return forward(operation).subscribe(observer);
              }
            });
          });
        }
      }
    }
  }
});

apolloClient.setLink(from([errorLink, authLink, splitLink]));
export { apolloClient };
