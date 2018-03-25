const assert = require('assert');
const expect = require('chai').expect;
const NotesExportService = require('../douban/NotesExportService');

describe('NotesExportService', () => {
  describe('#exportNotes(numOfBooks)', () => {
    it('should return an array of length numOfBooks when it is passed in');

    it('should return all the books when numOfBooks is not passed in');
  });

  describe('#exportBookNotes(bookURL)', () => {
    it('should export all the notes from the page in array');
  });

  describe('#getBookURLs(numOfBooks)', () => {
    it('should return an array, whose length is the number of books requested');
  });

  describe('#getBookURLsFromPage(URL)', () => {
    it('should craw and return URLs of the books on the page', async () => {
      const service = new NotesExportService('Doite');
      const firstPageURL = 'https://book.douban.com/people/Doite/annotation/?start=0';
      const result = await service.getBookURLsFromPage(firstPageURL);
      expect(result).to.eql([
        'https://book.douban.com/people/Doite/annotation/4789228/',
        'https://book.douban.com/people/Doite/annotation/26329401/',
        'https://book.douban.com/people/Doite/annotation/26435820/',
        'https://book.douban.com/people/Doite/annotation/11580128/',
        'https://book.douban.com/people/Doite/annotation/6754574/',
      ]);
    });
  });

  describe('#generatePageURLs(numOfBook)', () => {
    it('should return an array of note page URLs', () => {
      const service = new NotesExportService('Doite');

      expect(service.generatePageURLs(1)).to.eql([
        'https://book.douban.com/people/Doite/annotation/?start=0',
      ]);
      expect(service.generatePageURLs(5)).to.eql([
        'https://book.douban.com/people/Doite/annotation/?start=0',
      ]);
      expect(service.generatePageURLs(6)).to.eql([
        'https://book.douban.com/people/Doite/annotation/?start=0',
        'https://book.douban.com/people/Doite/annotation/?start=5',
      ]);
      expect(service.generatePageURLs(10)).to.eql([
        'https://book.douban.com/people/Doite/annotation/?start=0',
        'https://book.douban.com/people/Doite/annotation/?start=5',
      ]);
      expect(service.generatePageURLs(11)).to.eql([
        'https://book.douban.com/people/Doite/annotation/?start=0',
        'https://book.douban.com/people/Doite/annotation/?start=5',
        'https://book.douban.com/people/Doite/annotation/?start=10',
      ]);
    });
  });
});
