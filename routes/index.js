const express = require('express');
const app = express();

// All Routes
const UserRoutes = require('./user');

app.use('/user', UserRoutes);

module.exports = app;
