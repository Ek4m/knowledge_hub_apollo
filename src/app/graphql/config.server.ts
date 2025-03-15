import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cookies } from "next/headers";
import { __access_token } from "../(auth)/constants/values";
import { API_URI } from "./constants";

const httpLink = new HttpLink({ uri: `http://${API_URI}` });

const authLink = setContext(async (_, prevContext) => {
  const cookiesMap = await cookies();
  const token = cookiesMap.get(__access_token);
  return {
    headers: {
      ...prevContext.headers,
      Authorization: `Bearer ${token?.value}`,
    },
  };
});
export const apolloServerClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
  link: from([authLink, httpLink]),
});
