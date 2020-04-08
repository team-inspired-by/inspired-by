require("dotenv").config();
const env = process.env;

module.exports = {
  development: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: "postgres"
  },
  production: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: "postgres"
  }
};