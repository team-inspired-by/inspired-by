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
                contents
            }
            comments {
                id
                contents
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

export const getPostLists = gql `
query {
  getPostLists {
      message
      success
      posts {
          title
          category
          summary
          numLikes
          numViews
          numComments
          createdAt
      }
  }
}
`;

export const checkPostTitle = gql `
query ($title: String!) {
    checkPostTitle (title: $title) {
        success
        available
    }
}
`;