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

    res.status(200).send({
      booksHTMLArr: booksHTMLArr,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
