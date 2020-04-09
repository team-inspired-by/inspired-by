import gql from "graphql-tag";

export const uploadImage = gql`
  mutation($file: Upload!) {
    uploadImage(file: $file) {
      success
      message
    }
  }
`;

export const getAccessToken = gql`
  query($code: String!, $state: String!) {
    signUpWithGithub(code: $code, state: $state) {
      success
      message
      accessToken
      alias
      email
    }
  }
`;
