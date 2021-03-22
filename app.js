const express = require('express');
const cors = require('cors');

const app = express();
//open mongodb connection
require("./mongoDbConnection");
const personRoute = require('./routes/personRoute');
app.set('view engine', 'pug');
app.use(cors());
app.use(express.json());
app.use("/person", personRoute)

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

module.exports = app