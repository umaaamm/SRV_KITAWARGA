module.exports = {
    HOST: "34.171.99.121",
    USER: "postgres",
    PASSWORD: "postgres",
    DB: "kitawarga",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };


//   module.exports = {
//     HOST: process.env.INSTANCE_UNIX_SOCKET,
//     USER: process.env.DB_USER,
//     PASSWORD: process.env.DB_PASS,
//     DB: process.env.DB_NAME,
//     dialect: "postgres",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   };
