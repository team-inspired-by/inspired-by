import gql from "graphql-tag";

// export const refreshToken = gql `
//   query($accessToken: String!, $refreshToken: String!) {
//     refreshToken {
//       success
//       message
//       accessToken
//     }
//   }
// `;

export const getUserInfo = gql `
  query {
    getUserInfo {
      success
      message
      user {
        id
        name
        email
        level
        alias
      }
    }
  }
`;

export const githubLogin = gql `
  query($code: String!, $state: String!) {
    githubLogin(code: $code, state: $state) {
      success
      message
      isUser
      accessToken
      refreshToken
      user {
          id
          name
          email
          level
          alias
      }
      openIdId
      openIdAlias
      openIdEmail
    }
  }
`;

// export const checkGithubUser = gql`
//   query($code: String!, $state: String!) {
//     checkGithubUser(code: $code, state: $state) {
//       success
//     }
//   }
// `;

// export const getAccessToken = gql`
//   query($code: String!, $state: String!) {
//     signUpWithGithub(code: $code, state: $state) {
//       success
//       message
//       accessToken
//       alias
//       email
//     }
//   }
// `;

export const checkAlias = gql `
  query($alias: String!) {
    checkAlias(alias: $alias) {
      success
      available
    }
  }
`;

export const checkEmail = gql `
  query($email: String!) {
    checkEmail(email: $email) {
      success
      available
    }
  }
`;

export const getUsers = gql `
  query {
    getUsers {
      message
      success
      users {
        id
        email
        subscribeEmail
        name
        alias
        isStashed
        isHeavyUser
        level
        createdAt
        updatedAt
      }
    }
  }
`;