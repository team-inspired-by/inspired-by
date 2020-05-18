import gql from "graphql-tag";

export const registerUser = gql `
  mutation(
    $idType: String!
    $openId: String!
    $alias: String!
    $email: String!
    $terms: Boolean!
    $subscribeEmail: Boolean!
  ) {
    registerUser(
      user: {
        idType: $idType
        openId: $openId
        alias: $alias
        email: $email
        terms: $terms
        subscribeEmail: $subscribeEmail
      }
    ) {
      success
      message
      accessToken
      refreshToken
    }
  }
`;