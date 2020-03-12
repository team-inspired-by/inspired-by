console.log("executing server-v3");
import Sequelize from "sequelize";
import {
  ApolloServer,
  gql
} from "apollo-server-express";
import {
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from "graphql";
// import {
//   importSchema
// } from "graphql-import";
import {
  PubSub
} from "graphql-subscriptions";
import {
  Kind
} from "graphql/language";
// import {
//   resolver
// } from"graphql-sequelize";

import models from "./models";
// import redsolver from"./resolvers";

// import {
//   PORT = 4000, JWT_SECRET = "undefined"
// } = process.env;

import {
  createServer
} from "http";

import express from "express";
const app = express();

const data = {
  posts: []
};

const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      // value from the client
      console.log("resolving date:");
      console.log(value);
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
  Query: {
    showPosts(parent, args, context, info) {
      console.log('on showPosts:')
      console.log(data.posts)
      console.log(_)
      console.log(input)
      return {
        message: JSON.stringify(data.posts),
        post: data.posts[0]
      }
    }
  },
  Mutation: {
    addPost: (_, input, {
      dataSources
    }) => {
      console.log(`on mutation addPost:`);
      console.log(input);
      data.posts.push(input);
      console.log(data.posts);
      return {
        message: JSON.stringify(data.posts)
      };
    }
  }
};

// const typeDefs = gql ;
// const typeDef = importSchema('../schema/schema.graphql');
import typeDefs from './schema/schema';
const server = new ApolloServer({
  // context: ({ req }): {
  //   getUser: () => Promise<User>;
  //   models: ModelType;
  //   pubsub: PubSub;
  //   appSecret: String;
  // } => ({
  //     getUser: (): Promise<User> => {
  //     const { User: userModel } = nodels;
  //     const token = getToken(req);

  //     if (!token) {
  //       return null;
  //     }

  //     const user = verifyUser(token);
  //     const { userId } = user;

  //     return userModel.findOne({
  //       where: {
  //         id: userId
  //       },
  //       raw: true,
  //     });
  //     },
  // }),
  resolvers: resolvers,
  typeDefs,
  introspection: process.env.NODE_ENV !== "production",
  playground: process.env.NODE_ENV !== "production"
});

server.applyMiddleware({
  app,
  path: "/graphql"
});

app.listen({
    port: 4000
  },
  () => {
    console.log(`
server ready at http: //localhost:4000${server.graphqlPath}`);
  }
);