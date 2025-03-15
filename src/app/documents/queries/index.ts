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

export const GET_ALL_DOCS_QUERY = gql`
  {
    getDocs {
      id
      title
      content
      userId
      createdAt
      updatedAt
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

export const EDIT_DOC_MUTATION = gql`
  mutation EditDoc($body: EditDocDto!) {
    editDoc(body: $body) {
      userId
      doc {
        id
        title
        content
      }
    }
  }
`;

export const EDIT_DOC_SUBSCRIPTION = gql`
  subscription onDocEdited($userId: Int!) {
    doccontentedited(userId: $userId) {
      userId
      doc {
        id
        title
        content
      }
    }
  }
`;
