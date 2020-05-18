import gql from "graphql-tag";

export const addComment = gql `
mutation(
    $linkedPostTitle: String!
    $content: String!
    $isReply: Boolean
    $replyToCommentId: String
) {
    addComment(
        comment: {
            linkedPostTitle: $linkedPostTitle
            content: $content
            isReply: $isReply
            replyToCommentId: $replyToCommentId
        }
    ) {
        success
        message
        commentId
        content
    }
}
`

export const updateGeneralPost = gql `
mutation(
    $title: String!
    $content: String!
    $thumbnailId: String
    $summary: String
    $publishedAt: Date
    $deprecatedAt: Date
    $topics: String
    $isPrivate: Boolean
) {
    updateGeneralPost(
        post: {
            title: $title
            content: $content
            thumbnailId: $thumbnailId
            summary: $summary
            publishedAt: $publishedAt
            deprecatedAt: $deprecatedAt
            topics: $topics
            isPrivate: $isPrivate
        }
    ) {
        success
        message
    }
}
`

export const addGeneralPost = gql `
mutation(
    $title: String!
    $content: String!
    $thumbnailId: String
    $summary: String
    $publishedAt: Date
    $deprecatedAt: Date
    $topics: String
    $isPrivate: Boolean
) {
    addGeneralPost(
        post: {
            title: $title
            content: $content
            thumbnailId: $thumbnailId
            summary: $summary
            publishedAt: $publishedAt
            deprecatedAt: $deprecatedAt
            topics: $topics
            isPrivate: $isPrivate
        }
    ) {
        success
        message
    }
}
`

export const testPosting = gql `
mutation(
    $title: String!
    $content: String!
    $thumbnailId: String
    $summary: String
    $publishedAt: Date
    $deprecatedAt: Date
    $topics: String
    $isPrivate: Boolean
) {
    testPosting(
        post: {
            title: $title
            content: $content
            thumbnailId: $thumbnailId
            summary: $summary
            publishedAt: $publishedAt
            deprecatedAt: $deprecatedAt
            topics: $topics
            isPrivate: $isPrivate
        }
    ) {
        success
        message
        result
    }
}
`

export const removeGeneralPost = gql `
    mutation(
        $title: String!
    ) {
        removeGeneralPost(
            title: $title
        ) {
            message
            success
        }
    }
`