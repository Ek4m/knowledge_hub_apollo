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
