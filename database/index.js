const Pool = require("pg").Pool;
const { user, host, database, password, port } = require("../config");

const pool = new Pool({
  user: "sachinyadav",
  host: "127.0.0.1",
  database: "postgres",
  password: "password",
  port: 5432,
});

module.exports = pool;
