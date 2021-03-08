const { Pool } = require('pg');

const credentials = new Pool({
  user:"postgres",
  password:"Wint2020$",
  host:"localhost",
  port:5432,
  database:"ExpressSHOPDB",
  ssl:false
});
module.exports = credentials;