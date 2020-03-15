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
import {
  importSchema
} from "graphql-import";
import {
  PubSub
} from "graphql-subscriptions";
import {
  Kind
} from "graphql/language";
// import {
//   resolver
// } from"graphql-sequelize";

import db from "./models";
// import redsolver from"./resolvers";

// import {
//   PORT = 4000, JWT_SECRET = "undefined"
// } = process.env;

import {
  createServer
} from "http";

import express from "express";
const app = express();

// const typeDefs = gql ;
// const typeDef = importSchema('../schema/schema.graphql');
import typeDefs from "./schemas/schemas";
import resolvers from "./resolvers/resolvers";

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
  context: {
    db
  },
  resolvers,
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
server ready at http://localhost:4000${server.graphqlPath}`);
  }
);