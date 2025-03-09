import { gql } from "@apollo/client";

export const ADD_COMMENT_MUTATION = gql`
  mutation AddComment($body: CreateCommentDto!) {
    addComment(body: $body) {
      id
    }
  }
`;

export const ADD_COMMENT_SUBSCRIPTION = gql`
  subscription onCommentAdded($docId: String!) {
    commentadded(docId: $docId) {
      id
      content
      createdAt
      user{
        id
        email
      }
    }
  }
`;

export const GET_COMMENTS_QUERY = gql`
  query GetComments($docId: String!) {
    getComments(docId: $docId) {
      id
      content
      createdAt
      user {
        id
        email
      }
    }
  }
`;
