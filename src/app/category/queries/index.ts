import { gql } from "@apollo/client";

export const GET_CATEGORIES_QUERY = gql`
{
    getCategories{
        id
        name
    }
}
`;
