console.log("Executing: server-v2 index.js...")

const {
  resolver
} = require("graphql-sequelize");
const Sequelize = require("sequelize");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require("graphql");
const models = require('./models');
const express = require("express");
const graphqlHTTP = require("express-graphql");

// var options = {
//   exclude: ["Users"]
// };
var options = {}

const {
  generateSchema
} = require("sequelize-graphql-schema")(options);
// const models = require('./models')
const app = express();

// const sequelize = new Sequelize("Test", "sequelize_test", "sequelize_test", {
//   host: "127.0.0.1",
//   dialect: "postgres",
//   port: 5432,
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   }
// });
// let User = sequelize.define("user", {
//   name: Sequelize.STRING
// });

// let Task = sequelize.define("task", {
//   title: Sequelize.STRING
// });

// User.Tasks = User.hasMany(Task, {
//   as: "tasks"
// });

// let taskType = new GraphQLObjectType({
//   name: "Task",
//   description: "A task",
//   fields: () => ({
//     id: {
//       type: new GraphQLNonNull(GraphQLInt),
//       description: "This id of the task"
//     },
//     title: {
//       type: GraphQLString,
//       description: "The title of the task."
//     }
//   })
// });

// let userType = new GraphQLObjectType({
//   name: "User",
//   description: "A user",
//   fields: () => ({
//     id: {
//       type: new GraphQLNonNull(GraphQLInt),
//       description: "The id of the user."
//     },
//     name: {
//       type: GraphQLString,
//       description: "The name of the user."
//     },
//     tasks: {
//       type: new GraphQLList(taskType),
//       resolve: resolver(User.tasks)
//     }
//   })
// });

// let schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: "RootQueryType",
//     fields: {
//       // Field for retrieving a user by ID
//       user: {
//         type: userType,
//         // args will automatically be mapped to `where`
//         args: {
//           id: {
//             description: "id of the user",
//             type: new GraphQLNonNull(GraphQLInt)
//           }
//         },
//         resolve: resolver(User)
//       },

//       // Field for searching for a user by name
//       userSearch: {
//         type: new GraphQLList(userType),
//         args: {
//           query: {
//             description: "Fuzzy-matched name of user",
//             type: new GraphQLNonNull(GraphQLString)
//           }
//         },
//         resolve: resolver(User, {
//           // Custom `where` clause that fuzzy-matches user's name and
//           // alphabetical sort by username
//           before: (findOptions, args) => {
//             findOptions.where = {
//               name: {
//                 $like: `%${args.query}%`
//               }
//             };
//             findOptions.order = [
//               ["name", "ASC"]
//             ];
//             return findOptions;
//           },
//           // Custom sort override for exact matches first
//           after: (results, args) => {
//             return results.sort((a, b) => {
//               if (a.name === args.query) {
//                 return 1;
//               } else if (b.name === args.query) {
//                 return -1;
//               }

//               return 0;
//             });
//           }
//         })
//       }
//     }
//   })
// });

// let schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: "RootQueryType",
//     fields: {
//       users: {
//         // The resolver will use `findOne` or `findAll` depending on whether the field it's used in is a `GraphQLList` or not.
//         type: new GraphQLList(userType),
//         args: {
//           // An arg with the key limit will automatically be converted to a limit on the target
//           limit: {
//             type: GraphQLInt
//           },
//           // An arg with the key order will automatically be converted to a order on the target
//           order: {
//             type: GraphQLString
//           }
//         }
//       }
//     }
//   })
// });

app.use(
  "/graphql",
  graphqlHTTP({
    schema: new GraphQLSchema(generateSchema(models)),
    // schema: schema,
    graphiql: true
  })
);

app.listen(8080, function () {
  console.log("Running in 8080. Graphiql http://localhost:8080/graphql");
});