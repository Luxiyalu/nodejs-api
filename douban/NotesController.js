const NotesExportService = require('./NotesExportService');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/:user', async (req, res) => {
  const userHandle = req.params.user;
  const numOfBooks = req.query.size;

  try {
    const noteExport = new NotesExportService(userHandle);
    const bookNotesHTMLArr = await noteExport.getBooksNotesHTML(numOfBooks);
    const noteParse = new NoteParseService(bookNotesHTMLArr);
    const booksArr = noteParse.getBooksNotes();

    res.status(200).send(booksArr);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
