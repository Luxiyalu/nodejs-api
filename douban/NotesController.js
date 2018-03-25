const NotesExportService = require('./NotesExportService');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/:user', async (req, res) => {
  try {
    const noteExportInstance = new NotesExportService(req.params.user);
    const booksHTMLArr = await noteExportInstance.getBooksNotesHTML(req.query.size);
    const booksParseInstances = booksHTMLArr.map(bookHTML => new BookParseService(bookHTML));
    const booksParsePromises = booksParseInstances.map(async parse => parse.export());
    const parsedBooks = await Promise.all(booksParsePromises);

    res.status(200).send(parsedBooks);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
