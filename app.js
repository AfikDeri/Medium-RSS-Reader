const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./routes/index');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'client/public')));

app.use('/api', routes);

module.exports = app;
