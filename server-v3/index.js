const {
  ApolloServer,
  gql
} = require("apollo-server");
const {
  GraphQLScalarType
} = require("graphql");
const {
  Kind
} = require("graphql/language");

const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      // value from the client
      return new Date(value);
    },
    serialize(value) {
      // value sent to the client
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        // ast value is always in string format
        return parseInt(ast.value, 10);
      }
      return null;
    }
  }),
  Post: {
    __resolveType(post, context, info) {
      if (post.gitId) {
        return "GitPost";
      }

      if (post.bookName) {
        return "BookPost";
      }
      return "GeneralPost";
    }
  },
  StashedPost: {
    __resolveType(stashedPost, context, info) {
      if (stashedPost.gitId) {
        return "StashedGitPost";
      }
      if (stashedPost.bookName) {
        return "StashedBookPost";
      }
    }
  },
  Mutation: {
    addPost: (_, input, {
      dataSources
    }) => {
      console.log(`on mutation addPost: ${input}`)
      return {
        message: "Hello"
      }
    }
  }
};
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

  interface Post {
    title: String!
    category: EnumCategory!
    ownerId: ID
    owner: User
    contributions: [Contribution]
    originalContents: String!
    series: [Series]
    topics: [Topic]
    comments: [Comment]
    keywords: String
    summary: String
    numViews: Int!
    numLikes: Int!
    numComments: Int!
    isPrivate: Boolean!
    usedFiles: [File]
    thumbImages: [Image]
    contentImages: [Image]
    publishedAt: String
    deprecatedAt: String
    createdAt: Date!
    updatedAt: Date!
  }

  type GeneralPost implements Post {
    title: String!
    contents: String!
    category: EnumCategory!
    ownerId: ID
    owner: User
    contributions: [Contribution]
    originalContents: String!
    series: [Series]
    topics: [Topic]
    comments: [Comment]
    keywords: String
    summary: String
    numViews: Int!
    numLikes: Int!
    numComments: Int!
    isPrivate: Boolean!
    usedFiles: [File]
    thumbImages: [Image]
    contentImages: [Image]
    publishedAt: String
    deprecatedAt: String
    createdAt: Date!
    updatedAt: Date!
  }

  type BookPost implements Post {
    title: String!
    bookName: String!
    bookPublisher: String!
    bookPrice: String
    bookDescription: String
    bookUrl: String
    linkedStore: EnumLinkedStore!
    contents: String!
    category: EnumCategory!
    ownerId: ID
    owner: User
    contributions: [Contribution]
    originalContents: String!
    series: [Series]
    topics: [Topic]
    comments: [Comment]
    keywords: String
    summary: String
    numViews: Int!
    numLikes: Int!
    numComments: Int!
    isPrivate: Boolean!
    usedFiles: [File]
    thumbImages: [Image]
    contentImages: [Image]
    publishedAt: String
    deprecatedAt: String
    createdAt: Date!
    updatedAt: Date!
  }

  type GitPost implements Post {
    title: String!
    gitId: String!
    gitAuthor: String!
    gitTitle: String!
    category: EnumCategory!
    ownerId: ID
    owner: User
    contributions: [Contribution]
    originalContents: String!
    series: [Series]
    topics: [Topic]
    comments: [Comment]
    keywords: String
    summary: String
    numViews: Int!
    numLikes: Int!
    numComments: Int!
    isPrivate: Boolean!
    usedFiles: [File]
    thumbImages: [Image]
    contentImages: [Image]
    publishedAt: String
    deprecatedAt: String
    createdAt: Date!
    updatedAt: Date!
  }

  interface StashedPost {
    title: String!
    category: EnumCategory!
    ownerId: ID!
    owner: String!
    contributions: [String]
    originalContents: String!
    series: String
    topics: String
    comments: String
    keywords: String
    summary: String
    numViews: Int!
    numLikes: Int!
    numComments: Int!
    isPrivate: Boolean!
    usedFiles: String
    thumbImages: String
    contentImages: String
    publishedAt: String
    deprecatedAt: String
    createdAt: Date!
    updatedAt: Date!
  }

  type GeneralStashedPost implements StashedPost {
    contents: String!
    title: String!
    category: EnumCategory!
    ownerId: ID!
    owner: String!
    contributions: [String]
    originalContents: String!
    series: String
    topics: String
    comments: String
    keywords: String
    summary: String
    numViews: Int!
    numLikes: Int!
    numComments: Int!
    isPrivate: Boolean!
    usedFiles: String
    thumbImages: String
    contentImages: String
    publishedAt: String
    deprecatedAt: String
    createdAt: Date!
    updatedAt: Date!
  }

  type StashedBookPost implements StashedPost {
    title: String!
    post: StashedPost!
    bookName: String!
    bookPublisher: String!
    bookPrice: String
    bookDescription: String
    bookUrl: String
    linkedStore: EnumLinkedStore!
    contents: String!
    category: EnumCategory!
    ownerId: ID!
    owner: String!
    contributions: [String]
    originalContents: String!
    series: String
    topics: String
    comments: String
    keywords: String
    summary: String
    numViews: Int!
    numLikes: Int!
    numComments: Int!
    isPrivate: Boolean!
    usedFiles: String
    thumbImages: String
    contentImages: String
    publishedAt: String
    deprecatedAt: String
    createdAt: Date!
    updatedAt: Date!
  }

  type StashedGitPost implements StashedPost {
    title: String!
    gitId: String!
    gitAuthor: String!
    gitTitle: String!
    category: EnumCategory!
    ownerId: ID!
    owner: String!
    contributions: [String]
    originalContents: String!
    series: String
    topics: String
    comments: String
    keywords: String
    summary: String
    numViews: Int!
    numLikes: Int!
    numComments: Int!
    isPrivate: Boolean!
    usedFiles: String
    thumbImages: String
    contentImages: String
    publishedAt: String
    deprecatedAt: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Contribution {
    id: ID!
    postTitle: String!
    post: Post!
    contributorName: String!
    contributor: User
    type: String!
    description: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Comment {
    id: ID!
    postTitle: String!
    post: Post!
    contents: String!
    author: User!
    isReply: Boolean!
    replies: [Comment]
    numLikes: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  type User {
    id: ID!
    openId: String!
    isPrimaryId: Boolean!
    linkedId: String
    accessToken: String!
    userType: EnumUserType!
    isStashed: Boolean!
    stasher: User
    stashedDate: String
    email: String!
    subscribeEmail: Boolean!
    name: String
    alias: String
    profileImg: String
    initialLetter: String
    isHeavyUser: Boolean!
    level: EnumLevel!
    writtenPosts: [Post]
    scrappedPosts: [Post]
    comments: [Comment]
    contributions: [Contribution]
    createdAt: Date!
    updatedAt: Date!
  }

  type File {
    id: ID!
    uploader: User!
    alias: String!
    fileType: EnumFileType!
    url: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Image {
    id: ID!
    size: String!
    width: String!
    height: String!
    color: String
    tags: String
    raw: String
    full: String
    regular: String
    small: String
    thumb: String
    fileId: ID!
    fileInfo: File!
    copyright: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Series {
    title: String!
    posts: [Post]
    description: String!
    numViews: Int!
    numLikes: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  type Topic {
    name: String!
    coverImageId: ID
    coverImage: Image
    coverDescription: String
    numViews: Int!
    events: [Event]
    backImageId: ID
    backImage: Image
    iconId: ID
    icon: Image
    createdAt: Date!
    updatedAt: Date!
  }

  type Event {
    id: ID!
    name: String!
    description: String!
    mainImage: Image
    topics: [Topic]
    publishedAt: String
    deprecatedAt: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    getUsers: [User]
    getPosts: [Post]
  }

  type AddPostResponse {
    message: String
  }

  input InputGeneralPost {
    title: String!
    contents: String!
    category: EnumCategory!
    ownerId: ID
    owner: InputUser
    originalContents: String!
    numViews: Int!
    numLikes: Int!
    numComments: Int!
    isPrivate: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  input InputUser {
    id: ID!
    openId: String!
    isPrimaryId: Boolean!
    accessToken: String!
    userType: EnumUserType!
    isStashed: Boolean!
    email: String!
    subscribeEmail: Boolean!
    isHeavyUser: Boolean!
    level: EnumLevel!
    createdAt: Date!
    updatedAt: Date!
  }

  type Mutation {
    addPost(post: InputGeneralPost): AddPostResponse
    addUser(user: InputUser): User
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers
});
server.listen().then(({
  url
}) => {
  console.log(`server ready at ${url}`);
});