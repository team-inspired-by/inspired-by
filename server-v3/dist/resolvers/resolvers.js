"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _graphql = require("graphql");

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
  StashedPost: {
    __resolveType: function __resolveType(stashedPost, context, info) {
      if (stashedPost.gitId) {
        return "StashedGitPost";
      }

      if (stashedPost.bookName) {
        return "StashedBookPost";
      }

      return "StashedGeneralPost";
    }
  },
  Query: {
    getPosts: function () {
      var _getPosts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, args, _ref, info) {
        var db, value;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                db = _ref.db;
                console.log("on getPosts()");
                _context.next = 4;
                return db.Post.findAll();

              case 4:
                value = _context.sent;
                return _context.abrupt("return", {
                  message: "done.",
                  post: value[0],
                  posts: value
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getPosts(_x, _x2, _x3, _x4) {
        return _getPosts.apply(this, arguments);
      }

      return getPosts;
    }(),
    getUsers: function () {
      var _getUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, args, _ref2, info) {
        var db, value;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                db = _ref2.db;
                console.log("on getUsers()");
                _context2.next = 4;
                return db.User.findAll();

              case 4:
                value = _context2.sent;
                return _context2.abrupt("return", {
                  message: "done.",
                  user: value[0],
                  users: value
                });

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getUsers(_x5, _x6, _x7, _x8) {
        return _getUsers.apply(this, arguments);
      }

      return getUsers;
    }()
  },
  Mutation: {
    addPost: function () {
      var _addPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_, input, _ref3) {
        var db;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                db = _ref3.db;
                console.log("on addPost()");
                db.Post.create(input.post).then(function (result) {
                  console.log(result);
                  return {
                    message: 'added a post.'
                  };
                });

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function addPost(_x9, _x10, _x11) {
        return _addPost.apply(this, arguments);
      }

      return addPost;
    }() // posts: (parent, args, {
    //     db
    // }, info) => db.Post.findAll(),
    // users: (parent, args, {
    //     db
    // }, info) => db.User.findAll()

  }
};
exports["default"] = _default;