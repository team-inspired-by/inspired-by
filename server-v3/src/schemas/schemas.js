import {
  gql
} from "apollo-server-express";
const typeDefs = gql `
  scalar Date
  enum EnumCategory {
    GENERAL
    GIT
    BOOK
  }

  enum EnumLinkedStore {
    KYOBO
    YES24
  }

  enum EnumUserType {
    KAKAO
    GIT
    GOOGLE
    ADMIN
  }

  enum EnumLevel {
    VISITOR
    MEMBER
    WRITER
    MANAGER
  }

  enum EnumFileType {
    EXT_IMG
    LOCAL_IMG
    EXT_FILE
    LOCAL_FILE
    ETC
  }

  type Content {
    id: ID!
    linkedPost: Post!
    language: String
    contents: String!
    isDraft: Boolean
    createdAt: Date
    updatedAt: Date
  }

  type Post {
    title: String!
    subtitle: String
    postType: String
    languages: String
    author: User!
    series: [Series]
    topics: [Topic]
    scrappedUsers: [User]
    thumbnail: File
    keywords: String
    summary: String
    numViews: Int
    numLikes: Int
    numComments: Int
    isPrivate: Boolean
    publishedAt: Date!
    deprecatedAt: Date
    createdAt: Date
    updatedAt: Date
  }

  type GeneralPost {
    title: String!
    contributions: [Contribution]
    lastContent: Content!
    comments: [Comment]
    contentFiles: [File]
  }

  type BookPost {
    title: String!
    contributions: [Contribution]
    lastContent: Content!
    comments: [Comment]
    contentFiles: [File]
    bookName: String!
    bookPublisher: String!
    bookPrice: String
    bookDescription: String
    bookUrl: String
    linkedStore: String
  }

  type GitPost {
    gitRepoName: String
    gitRepoUrl: String!
    gitAuthor: String
    mainImage: File
  }

  type Contribution {
    id: ID!
    linkedPostTitle: String!
    contributorName: String!
    contributor: User
    type: String!
    description: String
    createdAt: Date
    updatedAt: Date
  }

  interface Like {
    id: ID!
    user: User!
    createdAt: Date
    updatedAt: Date
  }

  type PostLike implements Like {
    id: ID!
    user: User!
    createdAt: Date
    updatedAt: Date
    linkedPost: Post!
  }

  type CommentLike implements Like {
    id: ID!
    user: User!
    createdAt: Date
    updatedAt: Date
    linkedComment: Comment!
  }

  type Comment {
    id: ID!
    linkedPost: Post!
    contents: String!
    author: User!
    isReply: Boolean!
    numLikes: Int!
    createdAt: Date
    updatedAt: Date
  }

  # NOTE: openId is private
  # type OpenId {
  #   id: ID!
  #   idType: String!
  #   linkedUserId: ID!
  #   memo: String
  #   createdAt: Date
  #   updatedAt: Date
  # }

  type User {
    id: ID!
    email: String!
    subscribeEmail: Boolean
    name: String
    alias: String
    isStashed: Boolean
    stasher: User
    stashedDate: Date
    profileImage: File
    profileMessage: String
    initialLetter: String
    isHeavyUser: Boolean
    level: EnumLevel
    writtenPosts: [Post]
    scrappedPosts: [Post]
    comments: [Comment]
    contributions: [Contribution]
    createdAt: Date
    updatedAt: Date
  }

  type File {
    id: ID!
    uploader: User!
    alias: String!
    fileType: EnumFileType
    url: String!
    imageInfo: Image
    linkedBookPost: BookPost
    linkedGeneralPost: GeneralPost
    # TODO: decide whether to make linkedGitPost
    createdAt: Date
    updatedAt: Date
  }

  type Image {
    id: ID!
    size: String
    width: String
    height: String
    color: String
    tags: String
    raw: String
    full: String
    regular: String
    small: String
    thumb: String
    copyright: String!
    createdAt: Date
    updatedAt: Date
  }

  type Series {
    title: String!
    posts: [Post]
    topics: [Topic]
    description: String!
    numViews: Int
    numLikes: Int
    createdAt: Date
    updatedAt: Date
  }

  type Topic {
    name: String!
    posts: [Post]
    coverImage: File
    coverDescription: String
    numViews: Int
    events: [Event]
    series: [Series]
    backImage: File
    icon: File
    createdAt: Date
    updatedAt: Date
  }

  type Event {
    id: ID!
    name: String!
    description: String!
    mainImage: File
    topics: [Topic]
    publishedAt: String
    deprecatedAt: String
    createdAt: Date
    updatedAt: Date
  }

  type QueryTopicResponse {
    success: Boolean!
    message: String
    topic: Topic
  }

  type QueryTopicListResponse {
    success: Boolean!
    message: String
    topics: [Topic]!
  }

  type QueryPostResponse {
    success: Boolean!
    message: String
    post: Post
    posts: [Post]
  }

  type QueryGeneralPostResponse {
    success: Boolean!
    message: String
    post: GeneralPost
  }

  type QueryUserResponse {
    success: Boolean!
    message: String
    user: User
    users: [User]
  }

  type QuerySignUpResponse {
    success: Boolean!
    message: String
    accessToken: String
    alias: String
    email: String
  }

  type QueryYesNoResponse {
    success: Boolean!
    available: Boolean!
  }

  type Query {
    # getUsers: [User]
    getTopicList: QueryTopicListResponse
    getTopic(name: String!, language: String): QueryTopicResponse
    getGeneralPost(title: String!): QueryGeneralPostResponse
    getUsers: QueryUserResponse
    signUpWithGithub(code: String!, state: String!): QuerySignUpResponse
    checkPostTitle(title: String!): QueryYesNoResponse
    checkAlias(alias: String!): QueryYesNoResponse
    checkEmail(email: String!): QueryYesNoResponse
  }

  type AddPostResponse {
    message: String
  }

  type AddUserResponse {
    message: String
    success: Boolean!
  }

  type UploadResponse {
    message: String
    success: Boolean!
  }

  input InputGeneralPost {
    title: String!
    contents: String!
    category: EnumCategory
    ownerId: ID
    accessToken: String!
    createdAt: Date
    updatedAt: Date
  }

  input InputUserRegistration {
    idType: String!
    alias: String!
    email: String!
    terms: Boolean!
    subscribeEmail: Boolean!
    accessToken: String!
  }

  type Mutation {
    addPost(post: InputGeneralPost): AddPostResponse
    registerUser(user: InputUserRegistration!): AddUserResponse
    # addUser(user: InputUser): User
    testS3(file: Upload): UploadResponse
  }
`;

export default typeDefs;