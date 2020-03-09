const {
  ApolloServer,
  gql
} = require("apollo-server");
const Mongoose = require("mongoose");

// dotenv for get .env file.
require("dotenv").config();

const MONGO_URL = "mongodb://localhost:27017/";
Mongoose.connect(MONGO_URL, {
  user: process.env.MONGODB_USERNAME,
  pass: process.env.MONGODB_PASSWORD
});

const localSchema = {
  Inspiration: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    }
  },
  Post: {
    alias: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    }
  },
  Comment: {
    postId: {
      type: String,
      unique: true,
      required: true
    }
  },
  User: {
    id: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    rank: {
      type: String,
      trim: true
    }
  }
};

const modelSchema = [];
for (let key in localSchema) {
  modelSchema[key] = Mongoose.model(
    key,
    new Mongoose.Schema(localSchema[key], {
      timestamps: true
    })
  );
}

const typeDefs = gql `
  type Inspiration {
    id: String
    name: String
  }

  type Post {
    id: String
    title: String
    description: String
    content: String
    inspired_by: [Inspiration]
    comments: [Comment]
  }

  type Comment {
    id: String
    postId: String
    content: String
    user: User
    post: Post
  }

  type User {
    userId: String
    email: String
    level: String
  }

  type Query {
    ping: String
    post(_id: String): Post
    posts: [Post]
    comment(_id: String): Comment
    inspiration
  }

  type Mutation {
    createPost(title: String, content: String): Post
    createComment(postId: String, content: String): Comment
    createInspiration(name: String, description: String): Inspiration
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const prepare = o => {
  o._id = o._id.toString();
  return o;
};

const resolvers = {
  Query: {
    ping: () => "pong",
    posts: async (_, data) => {
      return await modelSchema["Post"]
        .find({})
        .then(posts => {
          console.log(posts);
          return posts;
        })
        .catch(err => console.log(err));
    },
    inspirations: async (_, data) =>
      await modelSchema["Inspiration"]
      .find({})
      .then(data => {
        console.log(data);
        return data;
      })
      .catch(err => console.err(err))
  },
  Mutation: {
    createPost: async (title, content) => {
      const post = new modelSchema["Post"]({
        id: Math.floor(Math.random() * 100, 100),
        title: title,
        content: content
      });

      return await post.save().then(data => {
        console.log("post saved successfully.");
        return data;
      });
    },
    createInspiration: async (name, description) => {
      const inspiration = new modelSchema["Inspiration"]({
        name: name,
        description: description
      });

      return await inspiration.save().then(_, data => {
        console.log("Inspiration '" + name + "' added.");
        return [_, data];
      });
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({
  url
}) => {
  console.log(`Listening at ${url}`);
});