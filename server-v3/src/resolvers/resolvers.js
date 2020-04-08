import {
  GraphQLScalarType
} from "graphql";
import {
  Op
} from "sequelize";
import axios from "axios";
import {
  argsToArgsConfig
} from "graphql/type/definition";

const uuidv4 = require("uuid").v4;

export default {
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
  // User: {
  //     __resolveType(user, context, info)

  //     // writtenPosts: (parent, args, context, info) => parent.getPosts(),
  // },
  File: {
    __resolveType: () => "File"
    // __resolveType(source) {
    //     // if (source.dataValues.fileType) return {
    //     //     __typename: 'File',
    //     //     ...source
    //     // }
    //     return "File";
    // }
  },
  Image: {
    __resolveType: () => "Image"
  },
  Like: {
    __resolveType() {
      return null;
    }
  },
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
    // owner: (parent, args, context, info) => parent.getUser(),
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
    signUpWithGithub: async (parent, args, {
      db
    }, info) => {
      const res = await axios.get(
        `https://github.com/login/oauth/access_token`, {
          params: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: args.code,
            state: args.state
          }
        }
      );

      const pairs = res.data.split("&");
      const result = {};
      pairs.forEach(pair => {
        pair = pair.split("=");
        result[pair[0]] = decodeURIComponent(pair[1] || "");
      });

      console.log("res: ");
      console.log(result);

      const userInfo = await axios.get(`https://api.github.com/user`, {
        headers: {
          Authorization: "token " + result.access_token
        }
      });

      console.log("userInfo: ");
      console.log(userInfo);

      if (result.error)
        return {
          message: result.error + " " + result.error_description,
          success: false
        };
      else if (result.access_token)
        return {
          message: "Successfully authenticated the user.",
          success: true,
          accessToken: result.access_token,
          alias: userInfo.data.name,
          email: userInfo.data.email
        };
      else
        return {
          message: "no accessToken received.",
          success: false
        };
    },
    checkPostTitle: async (parent, args, {
      db
    }, info) => {
      const values = await db.Post.findAll({
        logging: console.log,
        attributes: ["title"],
        where: {
          title: args.title
        }
      });
      console.log("value of checkPostTitle: ");
      console.log(values);
      return {
        success: true,
        available: values.length == 0
      }
    },
    checkAlias: async (parent, args, {
      db
    }, info) => {
      const values = await db.User.findAll({
        logging: console.log,
        attributes: ["alias"],
        where: {
          alias: args.alias
        }
      });
      console.log("values: ");
      console.log(values);
      return {
        success: true,
        available: values.length == 0
      };
    },
    checkEmail: async (parent, args, {
      db
    }, info) => {
      const values = await db.User.findAll({
        logging: console.log,
        attributes: ["email"],
        where: {
          email: args.email
        }
      });
      console.log("email values: ");
      console.log(values);
      return {
        success: true,
        available: values.length == 0
      };
    },
    getTopicList: async (parent, args, {
      db
    }, info) => {
      const values = await db.Topic.findAll({
        logging: console.log,
        attributes: [
          "name",
          "coverImageId",
          "coverDescription",
          "numViews",
          "iconId"
        ],
        include: [{
            as: "coverImage",
            model: db.File
          },
          {
            as: "icon",
            model: db.File
          }
        ]
      });

      if (!values)
        return {
          message: "No data found.",
          success: false
        };
      else
        return {
          message: "Successfully received topics.",
          success: true,
          topics: values
        };
    },
    getTopic: async (parent, args, {
      db
    }, info) => {
      const selector = {
        as: "posts",
        model: db.Post,
        where: {
          languages: {
            [Op.like]: "%" + args.language + "%"
          }
        },
        include: [{
          as: "author",
          model: db.User
        }]
      };
      if (!args.language) delete selector.where;

      const value = await db.Topic.findOne({
        logging: console.log,
        where: {
          name: args.name
        },
        include: [selector]
      });

      if (!value)
        return {
          message: "No data found.",
          success: false
        };
      else
        return {
          message: "Successfully received post lists.",
          success: true,
          topic: value
        };
    },
    getGeneralPost: async (parent, args, {
      db
    }, info) => {
      // console.log("on getGeneralPost: ");
      // console.log(args);
      const value = await db.GeneralPost.findOne({
        where: {
          title: args.title
        },
        include: [{
            as: "lastContent",
            model: db.Content
          },
          {
            as: "comments",
            model: db.Comment,
            include: [{
              as: "author",
              model: db.User
            }]
          },
          {
            as: "contentFiles",
            model: db.File
          }
        ]
      });
      if (!value)
        return {
          message: "No data found.",
          success: false
        };
      else if (value["title"])
        return {
          message: "Successfully received post contents.",
          success: true,
          post: value
        };
      else
        return {
          message: "Unknown Error",
          success: false,
          post: value
        };
    },
    getUsers: async (parent, args, {
      db
    }, info) => {
      console.log("on getUsers()");
      const value = await db.User.findAll();
      return {
        message: "done.",
        success: true,
        user: value[0],
        users: value
      };
    }
  },
  Mutation: {
    addPost: async (_, input, {
      db
    }) => {
      console.log(`on addPost()`);
      await db.Post.create(input.post).then(result => {
        return {
          message: "added a post."
        };
      });
    },
    registerUser: async (_, input, {
      db
    }) => {
      console.log(`on registerUser()`);
      console.log(input);
      let userId = uuidv4();
      const dataUser = {
        id: userId,
        email: input.user.email,
        subscribeEmail: input.user.subscribeEmail,
        alias: input.user.alias
      };
      let data = await db.User.create(dataUser);
      console.log("user data: ");
      console.log(data);

      const userInfo = await axios.get(`https://api.github.com/user`, {
        headers: {
          Authorization: "token " + input.user.accessToken
        }
      });

      const dataOpenId = {
        id: uuidv4(),
        idType: input.user.idType,
        openId: userInfo.data.id,
        accessToken: input.user.accessToken,
        linkedUserId: userId
      };

      data = await db.OpenId.create(dataOpenId);
      console.log("openId data: ");
      console.log(data);
      return {
        message: "Successfully added user " + input.user.alias + ". ",
        success: true
      };
    },
    testS3: async (_, input, {
      db
    }) => {
      console.log("on testS3()");
      console.log(input.file);
      var file = input.file.map(v => v.location);
      console.log(file);

      uploader.single('image').then(data => {
        console.log('received:');
        console.log(data);
      });

      return {
        message: "done.",
        success: true
      };
    }
    // posts: (parent, args, {
    //     db
    // }, info) => db.Post.findAll(),
    // users: (parent, args, {
    //     db
    // }, info) => db.User.findAll()
  }
};