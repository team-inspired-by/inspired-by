"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _graphql = require("graphql");

var _sequelize = require("sequelize");

var _axios = _interopRequireDefault(require("axios"));

var _definition = require("graphql/type/definition");

var uuidv4 = require("uuid").v4;

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
    signUpWithGithub: function () {
      var _signUpWithGithub = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, args, _ref, info) {
        var db, res, pairs, result, userInfo;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                db = _ref.db;
                _context.next = 3;
                return _axios["default"].get("https://github.com/login/oauth/access_token", {
                  params: {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code: args.code,
                    state: args.state
                  }
                });

              case 3:
                res = _context.sent;
                pairs = res.data.split("&");
                result = {};
                pairs.forEach(function (pair) {
                  pair = pair.split("=");
                  result[pair[0]] = decodeURIComponent(pair[1] || "");
                });
                console.log("res: ");
                console.log(result);
                _context.next = 11;
                return _axios["default"].get("https://api.github.com/user", {
                  headers: {
                    Authorization: "token " + result.access_token
                  }
                });

              case 11:
                userInfo = _context.sent;
                console.log("userInfo: ");
                console.log(userInfo);

                if (!result.error) {
                  _context.next = 18;
                  break;
                }

                return _context.abrupt("return", {
                  message: result.error + " " + result.error_description,
                  success: false
                });

              case 18:
                if (!result.access_token) {
                  _context.next = 22;
                  break;
                }

                return _context.abrupt("return", {
                  message: "Successfully authenticated the user.",
                  success: true,
                  accessToken: result.access_token,
                  alias: userInfo.data.name,
                  email: userInfo.data.email
                });

              case 22:
                return _context.abrupt("return", {
                  message: "no accessToken received.",
                  success: false
                });

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function signUpWithGithub(_x, _x2, _x3, _x4) {
        return _signUpWithGithub.apply(this, arguments);
      }

      return signUpWithGithub;
    }(),
    checkPostTitle: function () {
      var _checkPostTitle = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, args, _ref2, info) {
        var db, values;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                db = _ref2.db;
                _context2.next = 3;
                return db.Post.findAll({
                  logging: console.log,
                  attributes: ["title"],
                  where: {
                    title: args.title
                  }
                });

              case 3:
                values = _context2.sent;
                console.log("value of checkPostTitle: ");
                console.log(values);
                return _context2.abrupt("return", {
                  success: true,
                  available: values.length == 0
                });

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function checkPostTitle(_x5, _x6, _x7, _x8) {
        return _checkPostTitle.apply(this, arguments);
      }

      return checkPostTitle;
    }(),
    checkAlias: function () {
      var _checkAlias = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(parent, args, _ref3, info) {
        var db, values;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                db = _ref3.db;
                _context3.next = 3;
                return db.User.findAll({
                  logging: console.log,
                  attributes: ["alias"],
                  where: {
                    alias: args.alias
                  }
                });

              case 3:
                values = _context3.sent;
                console.log("values: ");
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

      function checkAlias(_x9, _x10, _x11, _x12) {
        return _checkAlias.apply(this, arguments);
      }

      return checkAlias;
    }(),
    checkEmail: function () {
      var _checkEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(parent, args, _ref4, info) {
        var db, values;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                db = _ref4.db;
                _context4.next = 3;
                return db.User.findAll({
                  logging: console.log,
                  attributes: ["email"],
                  where: {
                    email: args.email
                  }
                });

              case 3:
                values = _context4.sent;
                console.log("email values: ");
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

      function checkEmail(_x13, _x14, _x15, _x16) {
        return _checkEmail.apply(this, arguments);
      }

      return checkEmail;
    }(),
    getTopicList: function () {
      var _getTopicList = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(parent, args, _ref5, info) {
        var db, values;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                db = _ref5.db;
                _context5.next = 3;
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
                values = _context5.sent;

                if (values) {
                  _context5.next = 8;
                  break;
                }

                return _context5.abrupt("return", {
                  message: "No data found.",
                  success: false
                });

              case 8:
                return _context5.abrupt("return", {
                  message: "Successfully received topics.",
                  success: true,
                  topics: values
                });

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getTopicList(_x17, _x18, _x19, _x20) {
        return _getTopicList.apply(this, arguments);
      }

      return getTopicList;
    }(),
    getTopic: function () {
      var _getTopic = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(parent, args, _ref6, info) {
        var db, selector, value;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                db = _ref6.db;
                selector = {
                  as: "posts",
                  model: db.Post,
                  where: {
                    languages: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%" + args.language + "%")
                  },
                  include: [{
                    as: "author",
                    model: db.User
                  }]
                };
                if (!args.language) delete selector.where;
                _context6.next = 5;
                return db.Topic.findOne({
                  logging: console.log,
                  where: {
                    name: args.name
                  },
                  include: [selector]
                });

              case 5:
                value = _context6.sent;

                if (value) {
                  _context6.next = 10;
                  break;
                }

                return _context6.abrupt("return", {
                  message: "No data found.",
                  success: false
                });

              case 10:
                return _context6.abrupt("return", {
                  message: "Successfully received post lists.",
                  success: true,
                  topic: value
                });

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function getTopic(_x21, _x22, _x23, _x24) {
        return _getTopic.apply(this, arguments);
      }

      return getTopic;
    }(),
    getGeneralPost: function () {
      var _getGeneralPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(parent, args, _ref7, info) {
        var db, value;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                db = _ref7.db;
                _context7.next = 3;
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
                value = _context7.sent;

                if (value) {
                  _context7.next = 8;
                  break;
                }

                return _context7.abrupt("return", {
                  message: "No data found.",
                  success: false
                });

              case 8:
                if (!value["title"]) {
                  _context7.next = 12;
                  break;
                }

                return _context7.abrupt("return", {
                  message: "Successfully received post contents.",
                  success: true,
                  post: value
                });

              case 12:
                return _context7.abrupt("return", {
                  message: "Unknown Error",
                  success: false,
                  post: value
                });

              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function getGeneralPost(_x25, _x26, _x27, _x28) {
        return _getGeneralPost.apply(this, arguments);
      }

      return getGeneralPost;
    }(),
    getUsers: function () {
      var _getUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(parent, args, _ref8, info) {
        var db, value;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                db = _ref8.db;
                console.log("on getUsers()");
                _context8.next = 4;
                return db.User.findAll();

              case 4:
                value = _context8.sent;
                return _context8.abrupt("return", {
                  message: "done.",
                  success: true,
                  user: value[0],
                  users: value
                });

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function getUsers(_x29, _x30, _x31, _x32) {
        return _getUsers.apply(this, arguments);
      }

      return getUsers;
    }()
  },
  Mutation: {
    addPost: function () {
      var _addPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(_, input, _ref9) {
        var db;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                db = _ref9.db;
                console.log("on addPost()");
                _context9.next = 4;
                return db.Post.create(input.post).then(function (result) {
                  return {
                    message: "added a post."
                  };
                });

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function addPost(_x33, _x34, _x35) {
        return _addPost.apply(this, arguments);
      }

      return addPost;
    }(),
    registerUser: function () {
      var _registerUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(_, input, _ref10) {
        var db, userId, dataUser, data, userInfo, dataOpenId;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                db = _ref10.db;
                console.log("on registerUser()");
                console.log(input);
                userId = uuidv4();
                dataUser = {
                  id: userId,
                  email: input.user.email,
                  subscribeEmail: input.user.subscribeEmail,
                  alias: input.user.alias
                };
                _context10.next = 7;
                return db.User.create(dataUser);

              case 7:
                data = _context10.sent;
                console.log("user data: ");
                console.log(data);
                _context10.next = 12;
                return _axios["default"].get("https://api.github.com/user", {
                  headers: {
                    Authorization: "token " + input.user.accessToken
                  }
                });

              case 12:
                userInfo = _context10.sent;
                dataOpenId = {
                  id: uuidv4(),
                  idType: input.user.idType,
                  openId: userInfo.data.id,
                  accessToken: input.user.accessToken,
                  linkedUserId: userId
                };
                _context10.next = 16;
                return db.OpenId.create(dataOpenId);

              case 16:
                data = _context10.sent;
                console.log("openId data: ");
                console.log(data);
                return _context10.abrupt("return", {
                  message: "Successfully added user " + input.user.alias + ". ",
                  success: true
                });

              case 20:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function registerUser(_x36, _x37, _x38) {
        return _registerUser.apply(this, arguments);
      }

      return registerUser;
    }(),
    testS3: function () {
      var _testS = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(_, input, _ref11) {
        var db, file;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                db = _ref11.db;
                console.log("on testS3()");
                console.log(input.file);
                file = input.file.map(function (v) {
                  return v.location;
                });
                console.log(file);
                uploader.single('image').then(function (data) {
                  console.log('received:');
                  console.log(data);
                });
                return _context11.abrupt("return", {
                  message: "done.",
                  success: true
                });

              case 7:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function testS3(_x39, _x40, _x41) {
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