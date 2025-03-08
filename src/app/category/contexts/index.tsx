"use client";
import { ApolloQueryResult, useQuery } from "@apollo/client";
import { createContext, FC, PropsWithChildren } from "react";
import { GET_CATEGORIES_QUERY } from "../queries";

export interface ICategory {
  id: string;
  name: string;
}

export const CategoryContext = createContext<{
  data?: ICategory[];
  userLoading: boolean;
  refetch?(): Promise<ApolloQueryResult<ICategory[]>>;
}>({ userLoading: false, data: undefined, refetch: undefined });

export const CategoryProvider: FC<PropsWithChildren> = ({ children }) => {
  const user = useQuery(GET_CATEGORIES_QUERY);
  return (
    <CategoryContext.Provider
      value={{
        refetch: user.refetch,
        userLoading: user.loading,
        data: user.data?.getCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
