module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "railway",
    host: "containers-us-west-148.railway.app",
    dialect: "mysql",
    port: 5506
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "railway",
    host: "containers-us-west-148.railway.app",
    dialect: "mysql"
  }
};
