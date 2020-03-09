import gql from 'graphql-tag'

export const TestQuery = gql `
    query {
        posts {
            id
            category
        }   
    }
`

// export const TestGitQuery = gql `
// query ($number_of_repos: Int!){
//     viewer {
//         name
//         repositories(last: $number_of_repos) {
//             nodes {
//                 name
//             }
//         }
//     }
// }`

export const TestGitReadme = gql `
query($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
        object (expression: "master:README.md") {
            ... on Blob {
                text
            }
        }
    }
}
`

export const TestGitQuery = gql `
query($number_of_repos: Int!, $object_expression: String!){
    repository(owner: "team-inspired-by", name: "inspired-by") {
        name
        nameWithOwner
        owner {
            id
            login
            url
        }
        licenseInfo {
            id
            key
            name
        }
        homepageUrl
        description
        descriptionHTML
        hasProjectsEnabled
        hasIssuesEnabled
        hasWikiEnabled
        createdAt
        openGraphImageUrl
        object (expression: $object_expression) {
            ... on Tree {
                entries {
                    name
                    type
                }
            }
        }
        repositoryTopics(first: $number_of_repos) {
            edges {
                node {
                    id
                    topic {
                        name
                    }
                    url
                }
            }
        }
        primaryLanguage {
            color
            name
        }
        collaborators {
            edges {
                node {
                    id
                    name
                    email
                    bio
                    company
                    createdAt
                }
            }
        }
    }
}`

// export const TestGitQuery = gql `
// query {
//     repository(owner: "team-inspired-by", name: "inspired-by") {
//         issues(last: 20, states: CLOSED) {
//             edges {
//                 node {
//                     title
//                     url
//                     labels(first: 5) {
//                         edges {
//                             node {
//                                 name
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }`

export const TestMutation = gql `
mutation{
  createPost(userId:"5e50d80bd3a9df1fdca8a800", input: {
    category: GENERAL,
    coverImg: "test coverImg",
    summary: "test summary",
    contents: """
    ## Overview
     This document gives a way to make a frontend web application with Vue. The steps below are exactly same as "inspired_by" blog.

    ## Create a vue project with vue-cli

    > For information on how to use Vue CLI 3, visit [official documentation](https://cli.vuejs.org/guide/)

    - What I chose:

    ## Install vuetify

    - They say:

    > Vuetify is a Vue UI Library with beautifully handcrafted Material Components. No design skills required — everything you need to create amazing applications is at your fingertips.
    """,
    isPrivate: false,
    topics: [{
      name: "test1"
    },{
      name: "test2"
    }]
  }){
    id
    category
    summary
    coverImg
    contents
    author{
      userType
    }
    topics{
      id
    }
    comments{
      id
    }
    numViews
    numLikes
    numComments
    isPrivate
  }
}
    `

export const RecentRepo = gql `
    query clients {
        client: viewer{
        name
        repositories(last: 3) {
            nodes {
            name
            }
        }
        }
    }
`

export const RecentRepo2 = gql `
    query {
        viewer {
            name
            repositories(last: 3) {
                nodes {
                    name
                }
            }
        }
    }
`

export const Topics = gql `
    query {
        topic(name:openCV) {
            name
        }
    }
`

export const AuthorSearch = gql `
    query {
        search(query: "100kimch", type: USER, first: 5) {
            userCount
            pageInfo {
                endCursor
                startCursor
            }
            edges {
                node {
                    ...on User {
                        id
                        name
                        createdAt
                        url
                        repositories(first: 3) {
                            edges {
                                node {
                                    id
                                    name
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`