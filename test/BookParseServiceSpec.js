const assert = require('assert');
const expect = require('chai').expect;
const BookParseService = require('../douban/BookParseService');
const NotesExportService = require('../douban/NotesExportService');
let bookPageArticleHTML;

describe.only('BookParseService', () => {
  before(async () => {
    const bookNotesURL = 'https://book.douban.com/people/Doite/annotation/6754574/';
    const service = new NotesExportService('Doite');
    bookPageArticleHTML = await service.getBookNotesHTML(bookNotesURL);
  });

  describe('#export()', () => {
    it('should export an object with book info', () => {
      const bookParse = new BookParseService(bookPageArticleHTML);
    });
    it('should export an object with an array of notes');
  });
});
