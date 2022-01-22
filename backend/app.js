const express = require('express')
const app = express()
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ''
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

const userRoutes = require('./routes/user');

app.use(express.json());

app.use('/api/auth', userRoutes);

module.exports = app;