const express = require('express')
const app = express()
const mysql = require('mysql');


const userRoutes = require('./routes/user');

app.use(express.json());

app.use('/api/user', userRoutes);

module.exports = app;

