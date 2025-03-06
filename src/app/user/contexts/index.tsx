"use client";
import { ME_QUERY } from "@/app/(auth)/queries";
import { ApolloQueryResult, useQuery } from "@apollo/client";
import { createContext, FC, PropsWithChildren } from "react";

export interface IUser {
  id: number;
  email: string;
  role: string;
  profile?: {
    firstName: string;
    lastName: string;
  };
}

export const UserContext = createContext<{
  data?: IUser;
  userLoading: boolean;
  refetch?(): Promise<ApolloQueryResult<IUser>>;
}>({ userLoading: false, data: undefined, refetch: undefined });

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const user = useQuery(ME_QUERY);
  return (
    <UserContext.Provider
      value={{
        refetch: user.refetch,
        userLoading: user.loading,
        data: user.data,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
