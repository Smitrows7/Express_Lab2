// require the Express module
const express = require("express");
const cart = require("./itemCart");
const cors = require("cors");
// creates an instance of an Express server
const app = express();

//const bodyParser = require('body-parser');

//allows us to use query strings params,path params, and body all in the req object
app.use(cors());
app.use(express.json());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(require('connect').bodyParser());

app.use("/item-cart",cart);
// define the port
const port = 3000;
//localhost:3000/item-cart  Content-Type: application/json { "id":"11", "product":"Butter","price":"7.00","quantity":"1" }
// run the server
app.listen(port, () => console.log(`Listening on port: ${port}.`));