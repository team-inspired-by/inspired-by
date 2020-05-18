"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _graphql = require("graphql");

var _sequelize = require("sequelize");

var _axios = _interopRequireDefault(require("axios"));

var _definition = require("graphql/type/definition");

var _jwt = require("../jwt");

var _jsonwebtoken = require("jsonwebtoken");

var _uuid = require("uuid");

// import jwt from "jsonwebtoken";
// const uuidv4 = require("uuid").v4;
// const sign = function (userInfo) {
//   let accessToken = jwt.sign({
//     id: userInfo.id
//   }, process.env.NODE_JWT_KEY, {
//     expiresIn: '5m'
//   });
//   let refreshToken = jwt.sign({}, )
//   console.log("on sign():", token);
//   return token
// };
var _default = {
  Date: new _graphql.GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue: function parseValue(value) {
      // value from the client
      console.log("resolving date:");
      console.log(value);
      return new Date(value);
    },
    serialize: function serialize(value) {
      // value sent to the client
      return value.getTime();
    },
    parseLiteral: function parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        // ast value is always in string format
        return parseInt(ast.value, 10);
      }

      return null;
    }
  }),
  // User: {
  //     __resolveType(user, context, info)
  //     // writtenPosts: (parent, args, context, info) => parent.getPosts(),
  // },
  File: {
    __resolveType: function __resolveType() {
      return "File";
    } // __resolveType(source) {
    //     // if (source.dataValues.fileType) return {
    //     //     __typename: 'File',
    //     //     ...source
    //     // }
    //     return "File";
    // }

  },
  Image: {
    __resolveType: function __resolveType() {
      return "Image";
    }
  },
  Like: {
    __resolveType: function __resolveType() {
      return null;
    }
  },
  Post: {
    __resolveType: function __resolveType(post, context, info) {
      if (post.gitId) {
        return "GitPost";
      }

      if (post.bookName) {
        return "BookPost";
      }

      return "GeneralPost";
    } // owner: (parent, args, context, info) => parent.getUser(),

  },
  // StashedPost: {
  //     __resolveType(stashedPost, context, info) {
  //         if (stashedPost.gitId) {
  //             return "StashedGitPost";
  //         }
  //         if (stashedPost.bookName) {
  //             return "StashedBookPost";
  //         }
  //         return "StashedGeneralPost";
  //     }
  // },
  Query: {
    decodeTest: function () {
      var _decodeTest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, args, _ref, info) {
        var db;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                db = _ref.db;
                console.log("testing");
                return _context.abrupt("return", {
                  success: true,
                  message: "testing",
                  isUser: false
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function decodeTest(_x, _x2, _x3, _x4) {
        return _decodeTest.apply(this, arguments);
      }

      return decodeTest;
    }(),
    githubLogin: function () {
      var _githubLogin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, args, _ref2, info) {
        var db, gitToken, pairs, gitUserInfo, openIdInfo, openId, tokens;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                db = _ref2.db;
                _context2.next = 3;
                return _axios["default"].get("https://github.com/login/oauth/access_token", {
                  params: {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code: args.code,
                    state: args.state
                  }
                });

              case 3:
                gitToken = _context2.sent;
                pairs = gitToken.data.split("&");
                gitToken = {};
                pairs.forEach(function (pair) {
                  pair = pair.split("=");
                  gitToken[pair[0]] = decodeURIComponent(pair[1] || "");
                });
                console.log("on checkGithubUser(),");
                console.log("gitToken: ");
                console.log(gitToken);

                if (!gitToken.error) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return", {
                  message: gitToken.error.replace(/_/gi, " "),
                  success: false,
                  isUser: false
                });

              case 12:
                _context2.next = 14;
                return _axios["default"].get("https://api.github.com/user", {
                  headers: {
                    Authorization: "token " + gitToken.access_token
                  }
                });

              case 14:
                gitUserInfo = _context2.sent;
                console.log("gitUserInfo: ");
                console.log(gitUserInfo.data, gitUserInfo.data.login);
                _context2.next = 19;
                return db.OpenId.findAll({
                  logging: console.log,
                  attributes: ["id", "idType"],
                  where: {
                    idType: "GITHUB",
                    openId: gitUserInfo.data.id.toString()
                  },
                  include: [{
                    as: "user",
                    model: db.User
                  }]
                });

              case 19:
                openIdInfo = _context2.sent;
                console.log("openIdInfo: ");
                console.log(openIdInfo.dataValues, openIdInfo.length);

                if (!(openIdInfo.length === 1)) {
                  _context2.next = 28;
                  break;
                }

                openId = openIdInfo[0].dataValues;
                tokens = (0, _jwt.generateRefreshToken)(db, openId.id, openId.user.dataValues.alias, openId.user.dataValues.level);
                return _context2.abrupt("return", {
                  message: "Successfully logined.",
                  success: true,
                  isUser: true,
                  accessToken: tokens.accessToken,
                  refreshToken: tokens.refreshToken,
                  user: openId.user.dataValues
                });

              case 28:
                if (!(openIdInfo.length > 1)) {
                  _context2.next = 32;
                  break;
                }

                return _context2.abrupt("return", {
                  message: "There are duplicated openIds. needs to fix them.",
                  success: false
                });

              case 32:
                return _context2.abrupt("return", {
                  message: "This account might not be a member of inspired-by",
                  success: true,
                  isUser: false,
                  openIdId: gitUserInfo.data.id.toString(),
                  openIdAlias: gitUserInfo.data.name,
                  openIdEmail: gitUserInfo.data.email
                });

              case 33:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function githubLogin(_x5, _x6, _x7, _x8) {
        return _githubLogin.apply(this, arguments);
      }

      return githubLogin;
    }(),
    // signUpWithGithub: async (parent, args, {
    //   db
    // }, info) => {
    //   const res = await axios.get(
    //     `https://github.com/login/oauth/access_token`, {
    //       params: {
    //         client_id: process.env.GITHUB_CLIENT_ID,
    //         client_secret: process.env.GITHUB_CLIENT_SECRET,
    //         code: args.code,
    //         state: args.state
    //       }
    //     }
    //   );
    //   const pairs = res.data.split("&");
    //   const gitData = {};
    //   pairs.forEach(pair => {
    //     pair = pair.split("=");
    //     result[pair[0]] = decodeURIComponent(pair[1] || "");
    //   });
    //   console.log("res: ");
    //   console.log(gitData.data);
    //   const values = await db.User.findAll({
    //     logging: console.log,
    //     attributes: ["alias"],
    //     where: {
    //       alias: args.alias
    //     }
    //   });
    //   const userInfo = await axios.get(`https://api.github.com/user`, {
    //     headers: {
    //       Authorization: "token " + gitData.data.id
    //     }
    //   });
    //   console.log("userInfo: ");
    //   console.log(userInfo);
    //   if (result.error)
    //     return {
    //       message: result.error + " " + result.error_description,
    //       success: false
    //     };
    //   else if (result.access_token)
    //     return {
    //       message: "Successfully authenticated the user.",
    //       success: true,
    //       accessToken: result.access_token,
    //       alias: userInfo.data.name,
    //       email: userInfo.data.email
    //     };
    //   else
    //     return {
    //       message: "no accessToken received.",
    //       success: false
    //     };
    // },
    checkPostTitle: function () {
      var _checkPostTitle = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(parent, args, _ref3, info) {
        var db, values;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                db = _ref3.db;
                _context3.next = 3;
                return db.Post.findAll({
                  logging: console.log,
                  attributes: ["title"],
                  where: {
                    title: args.title
                  }
                });

              case 3:
                values = _context3.sent;
                console.log("value of checkPostTitle: ");
                console.log(values);
                return _context3.abrupt("return", {
                  success: true,
                  available: values.length == 0
                });

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function checkPostTitle(_x9, _x10, _x11, _x12) {
        return _checkPostTitle.apply(this, arguments);
      }

      return checkPostTitle;
    }(),
    checkAlias: function () {
      var _checkAlias = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(parent, args, _ref4, info) {
        var db, values;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                db = _ref4.db;
                _context4.next = 3;
                return db.User.findAll({
                  logging: console.log,
                  attributes: ["alias"],
                  where: {
                    alias: args.alias
                  }
                });

              case 3:
                values = _context4.sent;
                console.log("values: ");
                console.log(values);
                return _context4.abrupt("return", {
                  success: true,
                  available: values.length == 0
                });

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function checkAlias(_x13, _x14, _x15, _x16) {
        return _checkAlias.apply(this, arguments);
      }

      return checkAlias;
    }(),
    checkEmail: function () {
      var _checkEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(parent, args, _ref5, info) {
        var db, values;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                db = _ref5.db;
                _context5.next = 3;
                return db.User.findAll({
                  logging: console.log,
                  attributes: ["email"],
                  where: {
                    email: args.email
                  }
                });

              case 3:
                values = _context5.sent;
                console.log("email values: ");
                console.log(values);
                return _context5.abrupt("return", {
                  success: true,
                  available: values.length == 0
                });

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function checkEmail(_x17, _x18, _x19, _x20) {
        return _checkEmail.apply(this, arguments);
      }

      return checkEmail;
    }(),
    getTopicList: function () {
      var _getTopicList = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(parent, args, _ref6, info) {
        var db, values;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                db = _ref6.db;
                _context6.next = 3;
                return db.Topic.findAll({
                  logging: console.log,
                  attributes: ["name", "coverImageId", "coverDescription", "numViews", "iconId"],
                  include: [{
                    as: "coverImage",
                    model: db.File
                  }, {
                    as: "icon",
                    model: db.File
                  }]
                });

              case 3:
                values = _context6.sent;

                if (values) {
                  _context6.next = 8;
                  break;
                }

                return _context6.abrupt("return", {
                  message: "No data found.",
                  success: false
                });

              case 8:
                return _context6.abrupt("return", {
                  message: "Successfully received topics.",
                  success: true,
                  topics: values
                });

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function getTopicList(_x21, _x22, _x23, _x24) {
        return _getTopicList.apply(this, arguments);
      }

      return getTopicList;
    }(),
    getTopic: function () {
      var _getTopic = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(parent, args, _ref7, info) {
        var db, selector, value;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                db = _ref7.db;
                selector = {
                  as: "posts",
                  model: db.Post,
                  where: {// languages: {
                    //   [Op.like]: "%" + args.language + "%",
                    // },
                    // topics: {
                    //   name: {
                    //     [Op.like]: "%" + args.name + "%"
                    //     // [Op.like]: "%" + args.name + "%"
                    //   }
                    // }
                  },
                  include: [{
                    as: "author",
                    model: db.User
                  }, {
                    as: "topics",
                    model: db.Topic
                  }, {
                    as: "thumbnail",
                    model: db.Image
                  }]
                }; // if (!args.language) delete selector.where;

                _context7.next = 4;
                return db.Topic.findOne({
                  logging: console.log,
                  where: {
                    name: args.name
                  },
                  include: [selector]
                });

              case 4:
                value = _context7.sent;

                if (value) {
                  _context7.next = 9;
                  break;
                }

                return _context7.abrupt("return", {
                  message: "No data found.",
                  success: false
                });

              case 9:
                return _context7.abrupt("return", {
                  message: "Successfully received post lists.",
                  success: true,
                  topic: value
                });

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function getTopic(_x25, _x26, _x27, _x28) {
        return _getTopic.apply(this, arguments);
      }

      return getTopic;
    }(),
    getWrittenPosts: function () {
      var _getWrittenPosts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(parent, args, _ref8, info) {
        var db, auth, user, posts;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                db = _ref8.db, auth = _ref8.auth;
                console.log('on getWrittenPosts()');
                console.log('auth: ', auth); // if (auth.level != 'WRITER' || auth.level != 'MANAGER') {
                //   return {
                //     message: "not authorized",
                //     success: false,
                //   }
                // }

                _context8.next = 5;
                return db.User.findOne({
                  where: {
                    alias: auth.alias
                  }
                });

              case 5:
                user = _context8.sent;
                _context8.next = 8;
                return db.Post.findAll({
                  where: {
                    authorId: user.dataValues.id
                  },
                  include: [{
                    as: "topics",
                    model: db.Topic
                  }, {
                    as: "thumbnail",
                    model: db.Image
                  }]
                });

              case 8:
                posts = _context8.sent;

                if (!posts.length) {
                  _context8.next = 13;
                  break;
                }

                return _context8.abrupt("return", {
                  message: "successfully loaded written posts",
                  success: true,
                  posts: posts
                });

              case 13:
                return _context8.abrupt("return", {
                  message: "no written posts found",
                  success: true
                });

              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function getWrittenPosts(_x29, _x30, _x31, _x32) {
        return _getWrittenPosts.apply(this, arguments);
      }

      return getWrittenPosts;
    }(),
    getGeneralPost: function () {
      var _getGeneralPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(parent, args, _ref9, info) {
        var db, value;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                db = _ref9.db;
                _context9.next = 3;
                return db.GeneralPost.findOne({
                  where: {
                    title: args.title
                  },
                  include: [{
                    as: "lastContent",
                    model: db.Content
                  }, {
                    as: "comments",
                    model: db.Comment,
                    include: [{
                      as: "author",
                      model: db.User
                    }]
                  }, {
                    as: "contentFiles",
                    model: db.File
                  }]
                });

              case 3:
                value = _context9.sent;

                if (value) {
                  _context9.next = 8;
                  break;
                }

                return _context9.abrupt("return", {
                  message: "No data found.",
                  success: false
                });

              case 8:
                if (!value["title"]) {
                  _context9.next = 12;
                  break;
                }

                return _context9.abrupt("return", {
                  message: "Successfully received post contents.",
                  success: true,
                  post: value
                });

              case 12:
                return _context9.abrupt("return", {
                  message: "Unknown Error",
                  success: false,
                  post: value
                });

              case 13:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function getGeneralPost(_x33, _x34, _x35, _x36) {
        return _getGeneralPost.apply(this, arguments);
      }

      return getGeneralPost;
    }(),
    getUsers: function () {
      var _getUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(parent, args, _ref10, info) {
        var db, value;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                db = _ref10.db;
                console.log("on getUsers()");
                _context10.next = 4;
                return db.User.findAll();

              case 4:
                value = _context10.sent;
                return _context10.abrupt("return", {
                  message: "done.",
                  success: true,
                  user: value[0],
                  users: value
                });

              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function getUsers(_x37, _x38, _x39, _x40) {
        return _getUsers.apply(this, arguments);
      }

      return getUsers;
    }(),
    getUserInfo: function () {
      var _getUserInfo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(parent, args, _ref11, info) {
        var db, auth, user;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                db = _ref11.db, auth = _ref11.auth;
                console.log("on getUserInfo()"); // console.log("auth: ", auth);

                _context11.next = 4;
                return db.User.findOne({
                  logging: console.log,
                  attributes: ["id", "email", "name", "level", "alias"],
                  where: {
                    alias: auth.alias
                  }
                });

              case 4:
                user = _context11.sent;

                if (!user) {
                  _context11.next = 9;
                  break;
                }

                return _context11.abrupt("return", {
                  message: "successfully received user info.",
                  success: true,
                  user: user.dataValues
                });

              case 9:
                return _context11.abrupt("return", {
                  message: "user not found",
                  success: false
                });

              case 10:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function getUserInfo(_x41, _x42, _x43, _x44) {
        return _getUserInfo.apply(this, arguments);
      }

      return getUserInfo;
    }(),
    getImage: function () {
      var _getImage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(parent, args, _ref12) {
        var db, auth, data;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                db = _ref12.db, auth = _ref12.auth;
                _context12.next = 3;
                return db.File.findOne({
                  where: {
                    id: args.id
                  },
                  include: [{
                    as: "imageInfo",
                    model: db.Image
                  }]
                });

              case 3:
                data = _context12.sent;

                if (!(data !== null)) {
                  _context12.next = 8;
                  break;
                }

                return _context12.abrupt("return", {
                  message: "successfully received an image file.",
                  success: true,
                  file: data.dataValues
                });

              case 8:
                return _context12.abrupt("return", {
                  message: "no image found.",
                  success: false
                });

              case 9:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function getImage(_x45, _x46, _x47) {
        return _getImage.apply(this, arguments);
      }

      return getImage;
    }(),
    getData: function () {
      var _getData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(parent, args, _ref13, info) {
        var db, auth, data;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                db = _ref13.db, auth = _ref13.auth;
                _context13.t0 = args.type;
                _context13.next = _context13.t0 === "GENERAL" ? 4 : _context13.t0 === "POST" ? 8 : _context13.t0 === "CONTENT" ? 12 : 16;
                break;

              case 4:
                _context13.next = 6;
                return db.GeneralPost.findAll({
                  include: [{
                    as: "linkedPost",
                    model: db.Post
                  }]
                });

              case 6:
                data = _context13.sent;
                return _context13.abrupt("break", 16);

              case 8:
                _context13.next = 10;
                return db.Post.findAll({
                  include: [{
                    as: "generalPost",
                    model: db.GeneralPost
                  }]
                });

              case 10:
                data = _context13.sent;
                return _context13.abrupt("break", 16);

              case 12:
                _context13.next = 14;
                return db.Content.findAll();

              case 14:
                data = _context13.sent;
                return _context13.abrupt("break", 16);

              case 16:
                return _context13.abrupt("return", {
                  message: "successfully loaded data.",
                  success: true,
                  data: JSON.stringify(data)
                });

              case 17:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      function getData(_x48, _x49, _x50, _x51) {
        return _getData.apply(this, arguments);
      }

      return getData;
    }()
  },
  Mutation: {
    refreshToken: function () {
      var _refreshToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(_, input, _ref14) {
        var db, tokens;
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                db = _ref14.db;
                console.log("on refreshToken()");
                tokens = (0, _jwt.refresh)(db, input.accessToken, input.refreshToken);

                if (!tokens.success) {
                  _context14.next = 7;
                  break;
                }

                return _context14.abrupt("return", {
                  message: "successfully added",
                  success: true,
                  refreshToken: tokens.refreshToken,
                  accessToken: tokens.accessToken
                });

              case 7:
                return _context14.abrupt("return", {
                  message: tokens.errorMessage | "error when refreshing token.",
                  success: false
                });

              case 8:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      function refreshToken(_x52, _x53, _x54) {
        return _refreshToken.apply(this, arguments);
      }

      return refreshToken;
    }(),
    testPosting: function () {
      var _testPosting = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(_, input, _ref15) {
        var db, auth, userData, inputPost, dataPost, post, contentId, dataContent, content, dataGeneralPost, generalPost;
        return _regenerator["default"].wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                db = _ref15.db, auth = _ref15.auth;
                console.log('on testPosting()');
                console.log('auth: ', auth);
                _context15.next = 5;
                return db.User.findOne({
                  logging: console.log,
                  attributes: ["id", "email", "alias", "name", "level"],
                  where: {
                    alias: auth.alias
                  }
                });

              case 5:
                userData = _context15.sent;
                console.log('userData: ', userData.dataValues);
                inputPost = input.post;
                dataPost = {
                  title: inputPost.title,
                  postType: "GENERAL",
                  authorId: userData.dataValues.id,
                  thumbnailId: inputPost.thumbnailId,
                  summary: inputPost.summary,
                  publishedAt: inputPost.publishedAt,
                  deprecatedAt: inputPost.deprecatedAt,
                  // topics: a,
                  isPrivate: inputPost.isPrivate
                }; // console.log('dataPost: ', dataPost)

                _context15.next = 11;
                return db.Post.create(dataPost);

              case 11:
                post = _context15.sent;
                console.log('post: ', post.dataValues); // if (auth.level !== "WRITER" || auth.level !== "MANAGER") {
                //   return {
                //     message: "unauthorized access",
                //     success: false
                //   }
                // }

                if (inputPost.topics) inputPost.topics.split(',').forEach(function (val) {
                  db.Topic.findOrCreate({
                    where: {
                      name: val
                    }
                  }).spread(function (topic, created) {
                    console.log('result on findOrCreate Topic: ', topic.dataValues, created);
                    post.addTopic(topic.dataValues.name);
                  });
                });
                contentId = (0, _uuid.v4)();
                dataContent = {
                  id: contentId,
                  linkedPostTitle: inputPost.title,
                  content: inputPost.content
                };
                _context15.next = 18;
                return db.Content.create(dataContent);

              case 18:
                content = _context15.sent;
                dataGeneralPost = {
                  title: inputPost.title,
                  lastContentId: content.dataValues.id
                };
                _context15.next = 22;
                return db.GeneralPost.create(dataGeneralPost);

              case 22:
                generalPost = _context15.sent;
                console.log('generalPost: ', generalPost.dataValues); // const value2 = await db.Post.findOne({
                //   where: {
                //     title: post.title
                //   },
                //   include: [{
                //     as: "topics",
                //     model: db.Topic
                //   }]
                // })
                // console.log('value2: ', value2.dataValues)

                return _context15.abrupt("return", {
                  message: "test accomplished.",
                  success: true,
                  result: JSON.stringify(generalPost.dataValues)
                });

              case 25:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }));

      function testPosting(_x55, _x56, _x57) {
        return _testPosting.apply(this, arguments);
      }

      return testPosting;
    }(),
    addComment: function () {
      var _addComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(_, input, _ref16) {
        var db, auth, userData, commentId;
        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                db = _ref16.db, auth = _ref16.auth;
                // TODO auth
                console.log("add comment executed.");
                _context16.next = 4;
                return db.User.findOne({
                  logging: console.log,
                  attributes: ["id"],
                  where: {
                    alias: auth.alias
                  }
                });

              case 4:
                userData = _context16.sent;

                if (userData) {
                  _context16.next = 7;
                  break;
                }

                return _context16.abrupt("return", {
                  message: "failed to verifying auth",
                  success: false
                });

              case 7:
                console.log("userData: ", userData);
                commentId = (0, _uuid.v4)();
                _context16.next = 11;
                return db.Comment.create({
                  id: commentId,
                  linkedPostTitle: input.comment.linkedPostTitle,
                  content: input.comment.content,
                  authorId: userData.dataValues.id,
                  isReply: input.comment.isReply,
                  replyToCommentId: input.comment.replyToCommentId
                });

              case 11:
                return _context16.abrupt("return", {
                  message: "successfully create comment",
                  success: true,
                  commentId: commentId,
                  content: input.comment.content
                });

              case 12:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }));

      function addComment(_x58, _x59, _x60) {
        return _addComment.apply(this, arguments);
      }

      return addComment;
    }(),
    updateGeneralPost: function () {
      var _updateGeneralPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(_, input, _ref17) {
        var db, auth, userData, inputPost, dataPost, post, contentId, dataContent, content, dataGeneralPost, generalPost;
        return _regenerator["default"].wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                db = _ref17.db, auth = _ref17.auth;
                console.log('on updateGeneralPost()'); // TODO auth
                // console.log('auth: ', auth);

                _context18.next = 4;
                return db.User.findOne({
                  logging: console.log,
                  attributes: ["id", "email", "alias", "name", "level"],
                  where: {
                    alias: auth.alias
                  }
                });

              case 4:
                userData = _context18.sent;
                console.log('userData: ', userData.dataValues);
                inputPost = input.post;

                if (inputPost.title) {
                  _context18.next = 9;
                  break;
                }

                return _context18.abrupt("return", {
                  message: "Error on loading publishing post.",
                  success: false
                });

              case 9:
                dataPost = {
                  thumbnailId: inputPost.thumbnailId,
                  summary: inputPost.summary,
                  publishedAt: inputPost.publishedAt,
                  deprecatedAt: inputPost.deprecatedAt,
                  // topics: a,
                  isPrivate: inputPost.isPrivate
                }; // console.log('dataPost: ', dataPost)

                _context18.next = 12;
                return db.Post.update(dataPost, {
                  where: {
                    title: inputPost.title
                  }
                });

              case 12:
                post = _context18.sent;
                console.log("post updated"); // console.log('post: ', post.dataValues)
                // if (auth.level !== "WRITER" || auth.level !== "MANAGER") {
                //   return {
                //     message: "unauthorized access",
                //     success: false
                //   }
                // }

                if (inputPost.topics) inputPost.topics.split(',').forEach(function (val) {
                  db.Topic.findOrCreate({
                    where: {
                      name: val
                    }
                  }).spread( /*#__PURE__*/function () {
                    var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(topic, created) {
                      var _post;

                      return _regenerator["default"].wrap(function _callee17$(_context17) {
                        while (1) {
                          switch (_context17.prev = _context17.next) {
                            case 0:
                              console.log('result on findOrCreate Topic: ', topic.dataValues, created);
                              _context17.next = 3;
                              return db.Post.findOne({
                                where: {
                                  title: inputPost.title
                                }
                              });

                            case 3:
                              _post = _context17.sent;
                              _context17.next = 6;
                              return _post.addTopic(topic);

                            case 6:
                            case "end":
                              return _context17.stop();
                          }
                        }
                      }, _callee17);
                    }));

                    return function (_x64, _x65) {
                      return _ref18.apply(this, arguments);
                    };
                  }());
                });
                contentId = (0, _uuid.v4)();
                dataContent = {
                  id: contentId,
                  linkedPostTitle: inputPost.title,
                  content: inputPost.content
                };
                _context18.next = 19;
                return db.Content.create(dataContent);

              case 19:
                content = _context18.sent;
                dataGeneralPost = {
                  lastContentId: content.dataValues.id
                };
                _context18.next = 23;
                return db.GeneralPost.update(dataGeneralPost, {
                  where: {
                    title: inputPost.title
                  }
                });

              case 23:
                generalPost = _context18.sent;
                console.log('generalPost: ', generalPost.dataValues); // const value2 = await db.Post.findOne({
                //   where: {
                //     title: post.title
                //   },
                //   include: [{
                //     as: "topics",
                //     model: db.Topic
                //   }]
                // })
                // console.log('value2: ', value2.dataValues)

                return _context18.abrupt("return", {
                  message: "successfully updated a general post",
                  success: true
                });

              case 26:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18);
      }));

      function updateGeneralPost(_x61, _x62, _x63) {
        return _updateGeneralPost.apply(this, arguments);
      }

      return updateGeneralPost;
    }(),
    addGeneralPost: function () {
      var _addGeneralPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(_, input, _ref19) {
        var db, auth, userData, inputPost, dataPost, post, contentId, dataContent, content, dataGeneralPost, generalPost;
        return _regenerator["default"].wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                db = _ref19.db, auth = _ref19.auth;
                console.log('on addGeneralPost()'); // TODO auth
                // console.log('auth: ', auth);

                _context19.next = 4;
                return db.User.findOne({
                  logging: console.log,
                  attributes: ["id", "email", "alias", "name", "level"],
                  where: {
                    alias: auth.alias
                  }
                });

              case 4:
                userData = _context19.sent;
                console.log('userData: ', userData.dataValues);
                inputPost = input.post;
                dataPost = {
                  title: inputPost.title,
                  postType: "GENERAL",
                  authorId: userData.dataValues.id,
                  thumbnailId: inputPost.thumbnailId,
                  summary: inputPost.summary,
                  publishedAt: inputPost.publishedAt,
                  deprecatedAt: inputPost.deprecatedAt,
                  // topics: a,
                  isPrivate: inputPost.isPrivate
                }; // console.log('dataPost: ', dataPost)

                _context19.next = 10;
                return db.Post.create(dataPost);

              case 10:
                post = _context19.sent;
                // console.log('post: ', post.dataValues)
                // if (auth.level !== "WRITER" || auth.level !== "MANAGER") {
                //   return {
                //     message: "unauthorized access",
                //     success: false
                //   }
                // }
                if (inputPost.topics) inputPost.topics.split(',').forEach(function (val) {
                  db.Topic.findOrCreate({
                    where: {
                      name: val
                    }
                  }).spread(function (topic, created) {
                    console.log('result on findOrCreate Topic: ', topic.dataValues, created);
                    post.addTopic(topic.dataValues.name);
                  });
                });
                contentId = (0, _uuid.v4)();
                dataContent = {
                  id: contentId,
                  linkedPostTitle: inputPost.title,
                  content: inputPost.content
                };
                _context19.next = 16;
                return db.Content.create(dataContent);

              case 16:
                content = _context19.sent;
                dataGeneralPost = {
                  title: inputPost.title,
                  lastContentId: content.dataValues.id
                };
                _context19.next = 20;
                return db.GeneralPost.create(dataGeneralPost);

              case 20:
                generalPost = _context19.sent;
                console.log('generalPost: ', generalPost.dataValues); // const value2 = await db.Post.findOne({
                //   where: {
                //     title: post.title
                //   },
                //   include: [{
                //     as: "topics",
                //     model: db.Topic
                //   }]
                // })
                // console.log('value2: ', value2.dataValues)

                return _context19.abrupt("return", {
                  message: "successfully added a general post",
                  success: true
                });

              case 23:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19);
      }));

      function addGeneralPost(_x66, _x67, _x68) {
        return _addGeneralPost.apply(this, arguments);
      }

      return addGeneralPost;
    }(),
    removeGeneralPost: function () {
      var _removeGeneralPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(_, input, _ref20) {
        var db, auth;
        return _regenerator["default"].wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                db = _ref20.db, auth = _ref20.auth;
                console.log('on removeGeneralPost(): ');
                console.log(auth); // TODO: auth check

                _context20.next = 5;
                return db.GeneralPost.destroy({
                  where: {
                    title: input.title
                  }
                }).then(function (res) {
                  console.log('res on general: ', res);
                })["catch"](function (err) {
                  console.error("error occurred on general.", err);
                });

              case 5:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20);
      }));

      function removeGeneralPost(_x69, _x70, _x71) {
        return _removeGeneralPost.apply(this, arguments);
      }

      return removeGeneralPost;
    }(),
    registerUser: function () {
      var _registerUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(_, input, _ref21) {
        var db, userId, userInfo, user, tokens, openIdInfo, openId;
        return _regenerator["default"].wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                db = _ref21.db;
                console.log("on registerUser()");

                if (input.user.terms) {
                  _context21.next = 5;
                  break;
                }

                console.log('User ' + input.user.email + ' does not agreed the terms');
                return _context21.abrupt("return", {
                  message: "The user doesn't agreed the terms",
                  success: false
                });

              case 5:
                userId = (0, _uuid.v4)();
                userInfo = {
                  id: userId,
                  email: input.user.email,
                  subscribeEmail: input.user.subscribeEmail,
                  alias: input.user.alias,
                  name: input.user.alias,
                  level: 'MEMBER'
                };
                _context21.next = 9;
                return db.User.create(userInfo);

              case 9:
                user = _context21.sent;
                console.log("user data: ", user);
                tokens = (0, _jwt.generateRefreshToken)(db, input.user.openId, input.user.alias, 'MEMBER');
                console.log("tokens: ", tokens);
                openIdInfo = {
                  id: (0, _uuid.v4)(),
                  idType: input.user.idType,
                  openId: input.user.openId,
                  linkedUserId: userId
                };
                _context21.next = 16;
                return db.OpenId.create(openIdInfo);

              case 16:
                openId = _context21.sent;
                console.log("openId data: ", openId);
                return _context21.abrupt("return", {
                  message: "successfully registered the user.",
                  success: true,
                  accessToken: tokens.accessToken,
                  refreshToken: tokens.refreshToken
                });

              case 19:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21);
      }));

      function registerUser(_x72, _x73, _x74) {
        return _registerUser.apply(this, arguments);
      }

      return registerUser;
    }(),
    registerImage: function () {
      var _registerImage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22(_, input, _ref22) {
        var db, auth, user, fileId, fileInfo, file, imageInfo, image;
        return _regenerator["default"].wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                db = _ref22.db, auth = _ref22.auth;
                console.log("on registerImage()");
                console.log(input);
                console.log("auth:");
                console.log(auth);
                _context22.next = 7;
                return db.User.findOne({
                  where: {
                    alias: auth.alias
                  }
                });

              case 7:
                user = _context22.sent;
                console.log("user data:");
                console.log(user);
                fileId = (0, _uuid.v4)();
                fileInfo = {
                  id: fileId,
                  uploaderId: user.id,
                  alias: input.fileInfo.alias,
                  fileType: input.fileInfo.fileType,
                  url: input.fileInfo.copyrightLink
                };
                _context22.next = 14;
                return db.File.create(fileInfo);

              case 14:
                file = _context22.sent;
                console.log('file data:');
                console.log(file);
                imageInfo = {
                  id: fileId,
                  hasInfo: input.fileInfo.hasInfo,
                  size: input.fileInfo.size,
                  width: input.fileInfo.width,
                  height: input.fileInfo.height,
                  color: input.fileInfo.color,
                  tags: input.fileInfo.tags,
                  raw: input.fileInfo.raw,
                  full: input.fileInfo.full,
                  regular: input.fileInfo.regular,
                  small: input.fileInfo.small,
                  thumb: input.fileInfo.thumb,
                  copyright: input.fileInfo.copyright,
                  copyrightLink: input.fileInfo.copyrightLink
                };
                _context22.next = 20;
                return db.Image.create(imageInfo);

              case 20:
                image = _context22.sent;
                console.log('image data: ');
                console.log(image);
                return _context22.abrupt("return", {
                  message: "successfully registered an image.",
                  success: true,
                  imageId: image.id
                });

              case 24:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22);
      }));

      function registerImage(_x75, _x76, _x77) {
        return _registerImage.apply(this, arguments);
      }

      return registerImage;
    }(),
    testS3: function () {
      var _testS = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23(_, input, _ref23) {
        var db, file;
        return _regenerator["default"].wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                db = _ref23.db;
                console.log("on testS3()");
                console.log(input.file);
                file = input.file.map(function (v) {
                  return v.location;
                });
                console.log(file);
                uploader.single("image").then(function (data) {
                  console.log("received:");
                  console.log(data);
                });
                return _context23.abrupt("return", {
                  message: "done.",
                  success: true
                });

              case 7:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23);
      }));

      function testS3(_x78, _x79, _x80) {
        return _testS.apply(this, arguments);
      }

      return testS3;
    }() // posts: (parent, args, {
    //     db
    // }, info) => db.Post.findAll(),
    // users: (parent, args, {
    //     db
    // }, info) => db.User.findAll()

  }
};
exports["default"] = _default;