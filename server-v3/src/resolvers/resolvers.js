import {
    GraphQLScalarType
} from "graphql";
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
    StashedPost: {
        __resolveType(stashedPost, context, info) {
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
        getPosts: async (parent, args, {
            db
        }, info) => {
            console.log("on getPosts()");
            const value = await db.Post.findAll();
            return {
                message: "done.",
                post: value[0],
                posts: value
            };
        },
        getUsers: async (parent, args, {
            db
        }, info) => {
            console.log("on getUsers()");
            const value = await db.User.findAll();
            return {
                message: "done.",
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
                    message: 'added a post.'
                }
            });
        }
        // posts: (parent, args, {
        //     db
        // }, info) => db.Post.findAll(),
        // users: (parent, args, {
        //     db
        // }, info) => db.User.findAll()
    }
};