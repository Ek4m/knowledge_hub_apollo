"use server";
import { GET_ALL_DOCS_QUERY } from "../queries";
import {} from "@apollo/client/core";
import { IDoc } from "../types";
import { GraphQLFormattedError } from "graphql";
import { apolloServerClient } from "@/app/graphql/config.server";
import { unstable_cache } from "next/cache";

export const getDocs = unstable_cache(async (): Promise<{
  errors: GraphQLFormattedError[];
  data: IDoc[];
}> => {
  try {
    const response = await apolloServerClient.query({
      query: GET_ALL_DOCS_QUERY,
    });
    if (response.errors) {
      const obj = JSON.parse(
        JSON.stringify({ errors: response.errors, data: [] })
      );
      return obj;
    } else {
      return { errors: [], data: response.data.getDocs };
    }
  } catch (error) {
    console.log(error);
    return { errors: [], data: [] };
  }
}, ["get-docs"]);
