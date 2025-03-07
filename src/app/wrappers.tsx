"use client";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { apolloClient } from "./graphql/config";
import { UserProvider } from "./user/contexts";

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <UserProvider>
          {children}
          </UserProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
};
