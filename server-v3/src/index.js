import Sequelize from "sequelize";
import { ApolloServer, gql } from "apollo-server-express";
import {
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from "graphql";
import { importSchema } from "graphql-import";
import { PubSub } from "graphql-subscriptions";
import { Kind } from "graphql/language";
import aws from "aws-sdk";
require("dotenv").config();

aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

import db from "./models";

// import {
//   PORT = 4000, JWT_SECRET = "undefined"
// } = process.env;

import { createServer } from "http";

import express from "express";
const app = express();
// const router = express.Router();
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import cors from "cors";

const uploader = multer({
  storage: multerS3({
    s3: new aws.S3(),
    bucket: "bucket-inspired-by",
    acl: "public-read-write",
    key(req, file, cb) {
      cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    }
  }),
  limit: {
    fileSize: 22 * 1024 * 1024
  }
});

app.use(cors());
app.post("/upload", uploader.single("image"), (req, res, next) => {
  console.log("data: ", req);
  console.log("data: ", res);

  // console.log("Successfully uploaded " + req.files.length + " files!");
  res.send("Successfully uploaded files!");
});

app.get("/test", (req, res) => {
  console.log("hello");
  res.send("Hello");
});
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

app.listen(
  {
    port: 4000
  },
  () => {
    console.log(`
server ready at http://localhost:4000${server.graphqlPath}`);
  }
);
