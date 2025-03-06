"use client";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { apolloClient } from "./graphql/config";

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>{children}</ChakraProvider>
    </ApolloProvider>
  );
}; 
