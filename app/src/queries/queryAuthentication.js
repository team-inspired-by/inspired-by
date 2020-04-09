import gql from "graphql-tag";

export const getAccessToken = gql `
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

export const registerUser = gql `
mutation($idType: String!, $alias: String!, $email: String!, $terms: Boolean!, $subscribeEmail: Boolean!, $accessToken: String!) {
    registerUser(user: {
        idType: $idType,
        alias: $alias,
        email: $email,
        terms: $terms,
        subscribeEmail: $subscribeEmail,
        accessToken: $accessToken
    }) {
        success
        message
    }
}
`;