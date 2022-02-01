const express = require('express')
const app = express()

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;

