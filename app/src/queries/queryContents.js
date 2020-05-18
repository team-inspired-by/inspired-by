import gql from "graphql-tag";

export const getTopicList = gql `
query($needIcon: Boolean = false) {
    getTopicList {
        message
        success
        topics {
            name
            coverImage {
                id
                imageInfo {
                    size
                    width
                    height
                    color
                    tags
                    full
                    regular
                    small
                    thumb
                }
            }
            coverDescription
            numViews
            icon @include(if: $needIcon) {
                id
                imageInfo {
                    size
                    width
                    height
                    color
                    tags
                    full
                    regular
                    small
                    thumb
                }
            }
        }
    }
}`

export const getTopic = gql `
query ($name: String!, $language: String = null) {
    getTopic(name: $name, language: $language) {
        message
        success
        topic {
            name
            posts {
                title
                subtitle
                postType
                languages
                author {
                    name
                }
                thumbnail {
                    regular
                    thumb
                }
                topics {
                    name
                }
                summary
                numLikes
                createdAt
                updatedAt
            }
            # coverImage
            # coverDescription
            # numViews
            events {
                name
                description
                # mainImage {

                # }
            }
            series {
                title
                description
                numViews
                numLikes
            }
            backImage {
                url
                imageInfo {
                    full
                    regular
                }
            }
        }
    }
}`

export const getGeneralPost = gql `
query($title: String!) {
    getGeneralPost(title: $title) {
        message
        success
        post {
            title
            lastContent {
                content
            }
            comments {
                id
                content
                author {
                    email
                    name
                    alias
                }
            }
        }
    }
}
`;

// export const getPostLists = gql `
// query {
//   getPostLists {
//       message
//       success
//       posts {
//           title
//           summary
//           numLikes
//           numViews
//           numComments
//           createdAt
//       }
//   }
// }
// `;

export const getWrittenPosts = gql `
query($topic: String) {
    getWrittenPosts(topic: $topic) {
        message
        success
        posts {
            title
            postType
            summary
            topics {
                name
            }
            numLikes
            numViews
            numComments
            thumbnail {
                id
                thumb
            }
            createdAt
        }
    }
}
`

export const checkPostTitle = gql `
query ($title: String!) {
    checkPostTitle (title: $title) {
        success
        available
    }
}
`;

export const getImage = gql `
query ($id: String!) {
    getImage (id: $id) {
        message
        success
        file {
            id
            fileType
            url
            alias
            imageInfo {
                hasInfo
                width
                height
                color
                tags
                regular
            }
        }
    }
}
`

export const getData = gql `
query ($type: String!) {
    getData (type: $type) {
        message
        success
        data
    }
}
`