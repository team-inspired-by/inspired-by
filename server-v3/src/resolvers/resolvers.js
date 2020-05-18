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
// import jwt from "jsonwebtoken";
import {
  refresh,
  generateRefreshToken
} from "../jwt";
import {
  JsonWebTokenError
} from "jsonwebtoken";
import {
  v4
} from "uuid";
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
    },
  }),
  // User: {
  //     __resolveType(user, context, info)

  //     // writtenPosts: (parent, args, context, info) => parent.getPosts(),
  // },
  File: {
    __resolveType: () => "File",
    // __resolveType(source) {
    //     // if (source.dataValues.fileType) return {
    //     //     __typename: 'File',
    //     //     ...source
    //     // }
    //     return "File";
    // }
  },
  Image: {
    __resolveType: () => "Image",
  },
  Like: {
    __resolveType() {
      return null;
    },
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
    },
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
    decodeTest: async (parent, args, {
      db
    }, info) => {
      console.log("testing");
      return {
        success: true,
        message: "testing",
        isUser: false,
      };
    },
    githubLogin: async (parent, args, {
      db
    }, info) => {
      let gitToken = await axios.get(
        `https://github.com/login/oauth/access_token`, {
          params: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: args.code,
            state: args.state,
          },
        }
      );
      const pairs = gitToken.data.split("&");
      gitToken = {};
      pairs.forEach((pair) => {
        pair = pair.split("=");
        gitToken[pair[0]] = decodeURIComponent(pair[1] || "");
      });

      console.log("on checkGithubUser(),");
      console.log("gitToken: ");
      console.log(gitToken);

      if (gitToken.error) {
        return {
          message: gitToken.error.replace(/_/gi, " "),
          success: false,
          isUser: false,
        };
      }

      const gitUserInfo = await axios.get(`https://api.github.com/user`, {
        headers: {
          Authorization: "token " + gitToken.access_token,
        },
      });

      console.log("gitUserInfo: ");
      console.log(gitUserInfo.data, gitUserInfo.data.login);

      const openIdInfo = await db.OpenId.findAll({
        logging: console.log,
        attributes: ["id", "idType"],
        where: {
          idType: "GITHUB",
          openId: gitUserInfo.data.id.toString(),
        },
        include: [{
          as: "user",
          model: db.User
        }]
      });
      console.log("openIdInfo: ");
      console.log(openIdInfo.dataValues, openIdInfo.length);

      if (openIdInfo.length === 1) {
        let openId = openIdInfo[0].dataValues
        const tokens = generateRefreshToken(db, openId.id, openId.user.dataValues.alias, openId.user.dataValues.level)
        return {
          message: "Successfully logined.",
          success: true,
          isUser: true,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          user: openId.user.dataValues
        }
      } else if (openIdInfo.length > 1) {
        return {
          message: "There are duplicated openIds. needs to fix them.",
          success: false,
        }
      } else {
        return {
          message: "This account might not be a member of inspired-by",
          success: true,
          isUser: false,
          openIdId: gitUserInfo.data.id.toString(),
          openIdAlias: gitUserInfo.data.name,
          openIdEmail: gitUserInfo.data.email
        }
      }
    },
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
    checkPostTitle: async (parent, args, {
      db
    }, info) => {
      const values = await db.Post.findAll({
        logging: console.log,
        attributes: ["title"],
        where: {
          title: args.title,
        },
      });
      console.log("value of checkPostTitle: ");
      console.log(values);
      return {
        success: true,
        available: values.length == 0,
      };
    },
    checkAlias: async (parent, args, {
      db
    }, info) => {
      const values = await db.User.findAll({
        logging: console.log,
        attributes: ["alias"],
        where: {
          alias: args.alias,
        },
      });
      console.log("values: ");
      console.log(values);
      return {
        success: true,
        available: values.length == 0,
      };
    },
    checkEmail: async (parent, args, {
      db
    }, info) => {
      const values = await db.User.findAll({
        logging: console.log,
        attributes: ["email"],
        where: {
          email: args.email,
        },
      });
      console.log("email values: ");
      console.log(values);
      return {
        success: true,
        available: values.length == 0,
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
          "iconId",
        ],
        include: [{
            as: "coverImage",
            model: db.File,
          },
          {
            as: "icon",
            model: db.File,
          },
        ],
      });

      if (!values)
        return {
          message: "No data found.",
          success: false,
        };
      else
        return {
          message: "Successfully received topics.",
          success: true,
          topics: values,
        };
    },
    getTopic: async (parent, args, {
      db
    }, info) => {
      const selector = {
        as: "posts",
        model: db.Post,
        where: {
          // languages: {
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
          model: db.User,
        }, {
          as: "topics",
          model: db.Topic
        }, {
          as: "thumbnail",
          model: db.Image
        }],
      };
      // if (!args.language) delete selector.where;

      const value = await db.Topic.findOne({
        logging: console.log,
        where: {
          name: args.name,
        },
        include: [selector],
      });

      if (!value)
        return {
          message: "No data found.",
          success: false,
        };
      else
        return {
          message: "Successfully received post lists.",
          success: true,
          topic: value,
        };
    },
    getWrittenPosts: async (parent, args, {
      db,
      auth
    }, info) => {
      console.log('on getWrittenPosts()')
      console.log('auth: ', auth);
      // if (auth.level != 'WRITER' || auth.level != 'MANAGER') {
      //   return {
      //     message: "not authorized",
      //     success: false,
      //   }
      // }
      const user = await db.User.findOne({
        where: {
          alias: auth.alias
        }
      })
      const posts = await db.Post.findAll({
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
      })
      // for (let i in posts) {
      //   console.log('post: ', posts[i].dataValues)
      // }
      if (posts.length)
        return {
          message: "successfully loaded written posts",
          success: true,
          posts: posts
        }
      else
        return {
          message: "no written posts found",
          success: true
        }
    },
    getGeneralPost: async (parent, args, {
      db
    }, info) => {
      // console.log("on getGeneralPost: ");
      // console.log(args);
      const value = await db.GeneralPost.findOne({
        where: {
          title: args.title,
        },
        include: [{
            as: "lastContent",
            model: db.Content,
          },
          {
            as: "comments",
            model: db.Comment,
            include: [{
              as: "author",
              model: db.User,
            }, ],
          },
          {
            as: "contentFiles",
            model: db.File,
          },
        ],
      });
      if (!value)
        return {
          message: "No data found.",
          success: false,
        };
      else if (value["title"])
        return {
          message: "Successfully received post contents.",
          success: true,
          post: value,
        };
      else
        return {
          message: "Unknown Error",
          success: false,
          post: value,
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
        users: value,
      };
    },
    getUserInfo: async (parent, args, {
      db,
      auth
    }, info) => {
      console.log("on getUserInfo()");
      // console.log("auth: ", auth);
      const user = await db.User.findOne({
        logging: console.log,
        attributes: ["id", "email", "name", "level", "alias"],
        where: {
          alias: auth.alias
        }
      });
      // console.log("user: ", user)
      if (user)
        return {
          message: "successfully received user info.",
          success: true,
          user: user.dataValues
        }
      else
        return {
          message: "user not found",
          success: false
        }
    },
    getImage: async (parent, args, {
      db,
      auth
    }) => {
      // TODO: auth
      const data = await db.File.findOne({
        where: {
          id: args.id
        },
        include: [{
          as: "imageInfo",
          model: db.Image
        }]
      })
      // console.log('image: ', data)
      if (data !== null) {
        return {
          message: "successfully received an image file.",
          success: true,
          file: data.dataValues
        }
      } else {
        return {
          message: "no image found.",
          success: false
        }
      }
    },
    getData: async (parent, args, {
      db,
      auth
    }, info) => {
      // TODO: auth
      let data;
      switch (args.type) {
        case "GENERAL":
          data = await db.GeneralPost.findAll({
            include: [{
              as: "linkedPost",
              model: db.Post
            }]
          })
          break;
        case "POST":
          data = await db.Post.findAll({
            include: [{
              as: "generalPost",
              model: db.GeneralPost
            }]
          })
          break;
        case "CONTENT":
          data = await db.Content.findAll()
          break;
      }

      return {
        message: "successfully loaded data.",
        success: true,
        data: JSON.stringify(data)
      }
    }
  },
  Mutation: {
    refreshToken: async (_, input, {
      db
    }) => {
      console.log("on refreshToken()");
      const tokens = refresh(db, input.accessToken, input.refreshToken);
      if (tokens.success)
        return {
          message: "successfully added",
          success: true,
          refreshToken: tokens.refreshToken,
          accessToken: tokens.accessToken,
        };
      else
        return {
          message: tokens.errorMessage | "error when refreshing token.",
          success: false,
        };
    },
    testPosting: async (_, input, {
      db,
      auth
    }) => {
      console.log('on testPosting()');
      console.log('auth: ', auth);

      const userData = await db.User.findOne({
        logging: console.log,
        attributes: ["id", "email", "alias", "name", "level"],
        where: {
          alias: auth.alias
        }
      })

      console.log('userData: ', userData.dataValues);

      const inputPost = input.post
      const dataPost = {
        title: inputPost.title,
        postType: "GENERAL",
        authorId: userData.dataValues.id,
        thumbnailId: inputPost.thumbnailId,
        summary: inputPost.summary,
        publishedAt: inputPost.publishedAt,
        deprecatedAt: inputPost.deprecatedAt,
        // topics: a,
        isPrivate: inputPost.isPrivate
      }
      // console.log('dataPost: ', dataPost)

      const post = await db.Post.create(dataPost)
      console.log('post: ', post.dataValues)

      // if (auth.level !== "WRITER" || auth.level !== "MANAGER") {
      //   return {
      //     message: "unauthorized access",
      //     success: false
      //   }
      // }

      if (inputPost.topics)
        inputPost.topics.split(',').forEach(val => {
          db.Topic.findOrCreate({
            where: {
              name: val
            }
          }).spread((topic, created) => {
            console.log('result on findOrCreate Topic: ', topic.dataValues, created)
            post.addTopic(topic.dataValues.name)
          })
        });

      const contentId = v4();
      const dataContent = {
        id: contentId,
        linkedPostTitle: inputPost.title,
        content: inputPost.content
      }
      const content = await db.Content.create(dataContent)

      const dataGeneralPost = {
        title: inputPost.title,
        lastContentId: content.dataValues.id
      }
      const generalPost = await db.GeneralPost.create(dataGeneralPost)

      console.log('generalPost: ', generalPost.dataValues)
      // const value2 = await db.Post.findOne({
      //   where: {
      //     title: post.title
      //   },
      //   include: [{
      //     as: "topics",
      //     model: db.Topic
      //   }]
      // })
      // console.log('value2: ', value2.dataValues)

      return {
        message: "test accomplished.",
        success: true,
        result: JSON.stringify(generalPost.dataValues)
      }
    },
    addComment: async (_, input, {
      db,
      auth
    }) => {
      // TODO auth

      console.log("add comment executed.")

      const userData = await db.User.findOne({
        logging: console.log,
        attributes: ["id"],
        where: {
          alias: auth.alias
        }
      });

      if (!userData) return {
        message: "failed to verifying auth",
        success: false
      }

      console.log("userData: ", userData);

      const commentId = v4();
      await db.Comment.create({
        id: commentId,
        linkedPostTitle: input.comment.linkedPostTitle,
        content: input.comment.content,
        authorId: userData.dataValues.id,
        isReply: input.comment.isReply,
        replyToCommentId: input.comment.replyToCommentId
      })

      return {
        message: "successfully create comment",
        success: true,
        commentId: commentId,
        content: input.comment.content
      }
    },
    updateGeneralPost: async (_, input, {
      db,
      auth
    }) => {
      console.log('on updateGeneralPost()');
      // TODO auth
      // console.log('auth: ', auth);

      const userData = await db.User.findOne({
        logging: console.log,
        attributes: ["id", "email", "alias", "name", "level"],
        where: {
          alias: auth.alias
        }
      })

      console.log('userData: ', userData.dataValues);


      const inputPost = input.post
      if (!inputPost.title) {
        return {
          message: "Error on loading publishing post.",
          success: false
        }
      }
      const dataPost = {
        thumbnailId: inputPost.thumbnailId,
        summary: inputPost.summary,
        publishedAt: inputPost.publishedAt,
        deprecatedAt: inputPost.deprecatedAt,
        // topics: a,
        isPrivate: inputPost.isPrivate
      }
      // console.log('dataPost: ', dataPost)

      const post = await db.Post.update(dataPost, {
        where: {
          title: inputPost.title
        }
      })
      console.log("post updated")
      // console.log('post: ', post.dataValues)

      // if (auth.level !== "WRITER" || auth.level !== "MANAGER") {
      //   return {
      //     message: "unauthorized access",
      //     success: false
      //   }
      // }

      if (inputPost.topics)
        inputPost.topics.split(',').forEach(val => {
          db.Topic.findOrCreate({
            where: {
              name: val
            }
          }).spread(async (topic, created) => {
            console.log('result on findOrCreate Topic: ', topic.dataValues, created)
            const _post = await db.Post.findOne({
              where: {
                title: inputPost.title
              }
            })
            await _post.addTopic(topic);
          })
        });

      const contentId = v4();
      const dataContent = {
        id: contentId,
        linkedPostTitle: inputPost.title,
        content: inputPost.content
      }
      const content = await db.Content.create(dataContent)

      const dataGeneralPost = {
        lastContentId: content.dataValues.id
      }
      const generalPost = await db.GeneralPost.update(dataGeneralPost, {
        where: {
          title: inputPost.title
        }
      })

      console.log('generalPost: ', generalPost.dataValues)
      // const value2 = await db.Post.findOne({
      //   where: {
      //     title: post.title
      //   },
      //   include: [{
      //     as: "topics",
      //     model: db.Topic
      //   }]
      // })
      // console.log('value2: ', value2.dataValues)

      return {
        message: "successfully updated a general post",
        success: true,
      }
    },
    addGeneralPost: async (_, input, {
      db,
      auth
    }) => {
      console.log('on addGeneralPost()');
      // TODO auth
      // console.log('auth: ', auth);

      const userData = await db.User.findOne({
        logging: console.log,
        attributes: ["id", "email", "alias", "name", "level"],
        where: {
          alias: auth.alias
        }
      })

      console.log('userData: ', userData.dataValues);

      const inputPost = input.post
      const dataPost = {
        title: inputPost.title,
        postType: "GENERAL",
        authorId: userData.dataValues.id,
        thumbnailId: inputPost.thumbnailId,
        summary: inputPost.summary,
        publishedAt: inputPost.publishedAt,
        deprecatedAt: inputPost.deprecatedAt,
        // topics: a,
        isPrivate: inputPost.isPrivate
      }
      // console.log('dataPost: ', dataPost)

      const post = await db.Post.create(dataPost)
      // console.log('post: ', post.dataValues)

      // if (auth.level !== "WRITER" || auth.level !== "MANAGER") {
      //   return {
      //     message: "unauthorized access",
      //     success: false
      //   }
      // }

      if (inputPost.topics)
        inputPost.topics.split(',').forEach(val => {
          db.Topic.findOrCreate({
            where: {
              name: val
            }
          }).spread((topic, created) => {
            console.log('result on findOrCreate Topic: ', topic.dataValues, created)
            post.addTopic(topic.dataValues.name)
          })
        });

      const contentId = v4();
      const dataContent = {
        id: contentId,
        linkedPostTitle: inputPost.title,
        content: inputPost.content
      }
      const content = await db.Content.create(dataContent)

      const dataGeneralPost = {
        title: inputPost.title,
        lastContentId: content.dataValues.id
      }
      const generalPost = await db.GeneralPost.create(dataGeneralPost)

      console.log('generalPost: ', generalPost.dataValues)
      // const value2 = await db.Post.findOne({
      //   where: {
      //     title: post.title
      //   },
      //   include: [{
      //     as: "topics",
      //     model: db.Topic
      //   }]
      // })
      // console.log('value2: ', value2.dataValues)

      return {
        message: "successfully added a general post",
        success: true,
      }
    },
    removeGeneralPost: async (_, input, {
      db,
      auth
    }) => {
      console.log('on removeGeneralPost(): ')
      console.log(auth)
      // TODO: auth check

      await db.GeneralPost.destroy({
        where: {
          title: input.title
        }
      }).then(res => {
        console.log('res on general: ', res)

      }).catch(err => {
        console.error("error occurred on general.", err)
      })

      // await db.Content.destroy({
      //   where: {
      //     linkedPostTitle: input.title
      //   }
      // }).then(res => {
      //   console.log('res on content: ', res)
      // }).catch(err => {
      //   console.error("error occurred on content: ", err)
      // })
      // await db.Post.destroy({
      //   where: {
      //     title: input.title
      //   },
      // }).then(res => {
      //   console.log('res on post: ', res)

      // }).catch(err => {
      //   console.error("error occurred on post.", err)
      // })

      // return {
      //   message: "Successfully removed general post: ",
      //   success: true
      // }

      // return {
      //   message: "test executed.",
      //   success: true
      // }

    },
    registerUser: async (_, input, {
      db
    }) => {
      console.log(`on registerUser()`);

      if (!input.user.terms) {
        console.log('User ' + input.user.email + ' does not agreed the terms');
        return {
          message: "The user doesn't agreed the terms",
          success: false
        }
      }

      let userId = v4();
      const userInfo = {
        id: userId,
        email: input.user.email,
        subscribeEmail: input.user.subscribeEmail,
        alias: input.user.alias,
        name: input.user.alias,
        level: 'MEMBER'
      };
      let user = await db.User.create(userInfo);
      console.log("user data: ", user);

      const tokens = generateRefreshToken(db, input.user.openId, input.user.alias, 'MEMBER')
      console.log("tokens: ", tokens)

      const openIdInfo = {
        id: v4(),
        idType: input.user.idType,
        openId: input.user.openId,
        linkedUserId: userId
      }

      const openId = await db.OpenId.create(openIdInfo);
      console.log("openId data: ", openId);

      return {
        message: "successfully registered the user.",
        success: true,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      }
    },
    registerImage: async (_, input, {
      db,
      auth
    }) => {
      console.log("on registerImage()");
      console.log(input)

      console.log("auth:")
      console.log(auth)

      const user = await db.User.findOne({
        where: {
          alias: auth.alias
        }
      })

      console.log("user data:")
      console.log(user)

      const fileId = v4();
      const fileInfo = {
        id: fileId,
        uploaderId: user.id,
        alias: input.fileInfo.alias,
        fileType: input.fileInfo.fileType,
        url: input.fileInfo.copyrightLink
      }

      const file = await db.File.create(fileInfo);
      console.log('file data:')
      console.log(file)

      const imageInfo = {
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
      }

      const image = await db.Image.create(imageInfo);
      console.log('image data: ')
      console.log(image)

      return {
        message: "successfully registered an image.",
        success: true,
        imageId: image.id
      }

    },
    testS3: async (_, input, {
      db
    }) => {
      console.log("on testS3()");
      console.log(input.file);
      var file = input.file.map((v) => v.location);
      console.log(file);

      uploader.single("image").then((data) => {
        console.log("received:");
        console.log(data);
      });

      return {
        message: "done.",
        success: true,
      };
    },
    // posts: (parent, args, {
    //     db
    // }, info) => db.Post.findAll(),
    // users: (parent, args, {
    //     db
    // }, info) => db.User.findAll()
  },
};