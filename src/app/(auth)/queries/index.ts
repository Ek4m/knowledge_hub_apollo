import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  mutation SignIn($body: SignInDto!) {
    signIn(body: $body) {
      accessToken
      refreshToken
    }
  }
`;

export const REGISTER_QUERY = gql`
  mutation SignUp($body: SignUpDto!) {
    signUp(body: $body) {
      id
      email
      role
    }
  }
`;

export const REFRESH_TOKEN_QUERY = gql`
  mutation Refresh($body: RefreshDto!) {
    refresh(body: $body) {
      accessToken
      refreshToken
    }
  }
`;

export const ME_QUERY = gql`
  {
    me {
      id
      email
      role
      profile{
        firstName
        lastName
      }
    }
  }
`;
