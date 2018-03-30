const express = require('express');
const cors = require('cors');
const app = express();

const DoubanNotesController = require('./douban/NotesController');

app.use(cors({origin: [ /localhost.*/, /luxiyalu\.com.*/ ]}));
app.use('/douban/notes', DoubanNotesController);

app.get('/', (req, res) => {
  res.status(200).send('home');
});

module.exports = app;
