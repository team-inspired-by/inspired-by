import gql from 'graphql-tag'
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