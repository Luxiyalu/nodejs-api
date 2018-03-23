const express = require('express');
const app = express();

const DoubanNotesController = require('./douban/NotesController');
app.use('/douban/notes', DoubanNotesController);

app.get('/', (req, res) => {
  res.status(200).send('home');
});

module.exports = app;
