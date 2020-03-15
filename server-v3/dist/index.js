"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _sequelize = _interopRequireDefault(require("sequelize"));

var _apolloServerExpress = require("apollo-server-express");

var _graphql = require("graphql");

var _graphqlImport = require("graphql-import");

var _graphqlSubscriptions = require("graphql-subscriptions");

var _language = require("graphql/language");

var _models = _interopRequireDefault(require("./models"));

var _http = require("http");

var _express = _interopRequireDefault(require("express"));

var _schemas = _interopRequireDefault(require("./schemas/schemas"));

var _resolvers = _interopRequireDefault(require("./resolvers/resolvers"));

// import {
//   resolver
// } from"graphql-sequelize";
// import redsolver from"./resolvers";
// import {
//   PORT = 4000, JWT_SECRET = "undefined"
// } = process.env;
var app = (0, _express["default"])(); // const typeDefs = gql ;
// const typeDef = importSchema('../schema/schema.graphql');

var server = new _apolloServerExpress.ApolloServer({
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
    db: _models["default"]
  },
  resolvers: _resolvers["default"],
  typeDefs: _schemas["default"],
  introspection: process.env.NODE_ENV !== "production",
  playground: process.env.NODE_ENV !== "production"
});
server.applyMiddleware({
  app: app,
  path: "/graphql"
});
app.listen({
  port: 4000
}, function () {
  console.log("\nserver ready at http://localhost:4000".concat(server.graphqlPath));
});