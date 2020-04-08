"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _sequelize = _interopRequireDefault(require("sequelize"));

var _apolloServerExpress = require("apollo-server-express");

var _graphql = require("graphql");

var _graphqlImport = require("graphql-import");

var _graphqlSubscriptions = require("graphql-subscriptions");

var _language = require("graphql/language");

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _models = _interopRequireDefault(require("./models"));

var _http = require("http");

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _schemas = _interopRequireDefault(require("./schemas/schemas"));

var _resolvers = _interopRequireDefault(require("./resolvers/resolvers"));

require("dotenv").config();

_awsSdk["default"].config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

var app = (0, _express["default"])(); // const router = express.Router();

var uploader = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: new _awsSdk["default"].S3(),
    bucket: "bucket-inspired-by",
    acl: "public-read-write",
    key: function key(req, file, cb) {
      cb(null, "original/".concat(Date.now()).concat(_path["default"].basename(file.originalname)));
    }
  }),
  limit: {
    fileSize: 22 * 1024 * 1024
  }
});
app.use((0, _cors["default"])());
app.post("/upload", uploader.single("image"), function (req, res, next) {
  console.log("data: ", req);
  console.log("data: ", res); // console.log("Successfully uploaded " + req.files.length + " files!");

  res.send("Successfully uploaded files!");
});
app.get("/test", function (req, res) {
  console.log("hello");
  res.send("Hello");
}); // const typeDefs = gql ;
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