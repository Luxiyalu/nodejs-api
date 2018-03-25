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
    it('should craw and return URLs of the books on the page');
    it('should return an array with length <= 5');
  });

  describe('#generatePageURLs(numOfBook)', () => {
    it('should return an array of note page URLs', () => {
      const service = new NotesExportService('Luxiyalu');

      expect(service.generatePageURLs(1)).to.eql([
        'https://book.douban.com/people/Luxiyalu/annotation/?start=0',
      ]);
      expect(service.generatePageURLs(5)).to.eql([
        'https://book.douban.com/people/Luxiyalu/annotation/?start=0',
      ]);
      expect(service.generatePageURLs(6)).to.eql([
        'https://book.douban.com/people/Luxiyalu/annotation/?start=0',
        'https://book.douban.com/people/Luxiyalu/annotation/?start=5',
      ]);
      expect(service.generatePageURLs(10)).to.eql([
        'https://book.douban.com/people/Luxiyalu/annotation/?start=0',
        'https://book.douban.com/people/Luxiyalu/annotation/?start=5',
      ]);
      expect(service.generatePageURLs(11)).to.eql([
        'https://book.douban.com/people/Luxiyalu/annotation/?start=0',
        'https://book.douban.com/people/Luxiyalu/annotation/?start=5',
        'https://book.douban.com/people/Luxiyalu/annotation/?start=10',
      ]);
    });
  });
});
