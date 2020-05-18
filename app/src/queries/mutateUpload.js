import gql from "graphql-tag";

export const registerImage = gql `
  mutation(
    $alias: String!
    $fileType: String!
    $url: String!
    $hasInfo: Boolean!
    $size: String
    $width: String
    $height: String
    $color: String
    $tags: String
    $raw: String
    $full: String
    $regular: String
    $small: String
    $thumb: String
    $copyright: String
    $copyrightLink: String
  ) {
    registerImage(
      fileInfo: {
        alias: $alias
        fileType: $fileType
        url: $url
        hasInfo: $hasInfo
        size: $size
        width: $width
        height: $height
        color: $color
        tags: $tags
        raw: $raw
        full: $full
        regular: $regular
        small: $small
        thumb: $thumb
        copyright: $copyright
        copyrightLink: $copyrightLink
      }
    ) {
      success
      message
      imageId
    }
  }
`;