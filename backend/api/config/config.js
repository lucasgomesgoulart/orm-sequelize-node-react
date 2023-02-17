module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "railway",
    host: "containers-us-west-134.railway.app",
    dialect: "mysql",
    port: 7338
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "railway",
    host: "containers-us-west-134.railway.app",
    dialect: "mysql"
  }
};
