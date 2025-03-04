import {gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  mutation SignIn($body: SignInDto!) {
    signIn(body: $body) {
      accessToken
      refreshToken
    }
  }
`;
