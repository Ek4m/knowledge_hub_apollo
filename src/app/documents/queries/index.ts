import { gql } from "@apollo/client";

export const CREATE_DOC_QUERY = gql`
  mutation CreateDoc($body: CreateDocDto!) {
    createDoc(body: $body) {
      id
    }
  }
`;

export const GET_MY_DOCS_QUERY = gql`
  {
    myDocs {
      id
      title
    }
  }
`;

export const GET_DOC_QUERY = gql`
  query GetDoc($id: String!) {
    docDetails(id: $id) {
      id
      title
      content
      userId
      createdAt
      updatedAt
    }
  }
`;
