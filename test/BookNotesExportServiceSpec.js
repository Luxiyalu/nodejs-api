const assert = require('assert');
const chai = require('chai')
const spies = require('chai-spies');
const should = chai.should;
chai.use(spies);
const BookNotesExportService = require('../douban/BookNotesExportService');
const book12NotesURL = 'https://book.douban.com/people/Doite/annotation/4789228/';
const book21NotesURL = 'https://book.douban.com/people/Doite/annotation/6754574/';

describe('BookNotesExportService', () => {
  describe('#getNotesHTML()', () => {
    it('should export all 2 pages of notes when there are 12 notes', async () => {
      const service = new BookNotesExportService(book12NotesURL);
      const spy = chai.spy.on(service, 'getSinglePageNotesHTML');
      const bookNotesArr = await service.getNotesHTML();

      spy.should.have.been.called.exactly(2);
    });

    it('should export all 3 pages of notes when there are 21 notes', async () => {
      const service = new BookNotesExportService(book21NotesURL);
      const spy = chai.spy.on(service, 'getSinglePageNotesHTML');
      const bookNotesArr = await service.getNotesHTML();

      spy.should.have.been.called.exactly(3);
    });
  });
});
