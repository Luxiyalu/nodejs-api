const assert = require('assert');
const expect = require('chai').expect;
const NotesExportService = require('../douban/NotesExportService');

describe('NotesExportService', () => {
  describe('#exportNotes(numOfBooks)', () => {
    it('should return an array of length numOfBooks when it is passed in');

    it('should return all the books when numOfBooks is not passed in');
  });

  describe('#crawBookNotes(bookURL)', () => {
    it('should craw all the notes of a book', async () => {
      const bookNotesURL = 'https://book.douban.com/people/Doite/annotation/6754574/';
      const service = new NotesExportService('Doite');
      const bookPageArticleHTML = await service.getBookNotesHTML(bookNotesURL);

      expect(bookPageArticleHTML).to.match(/Test 1./);
      expect(bookPageArticleHTML).to.match(/Test 2./);
    });
  });

  describe('#getNumOfPagesToExport(numOfBooks)', () => {
    it('should return all pages when negative values are passed in', async () => {
      const service = new NotesExportService('Doite');

      expect(await service.getNumOfPagesToExport()).to.equal(2);
      expect(await service.getNumOfPagesToExport(0)).to.equal(2);
    });

    it('should return number of pages according to number of books requested', async () => {
      const service = new NotesExportService('Doite');

      expect(await service.getNumOfPagesToExport(1)).to.equal(1);
      expect(await service.getNumOfPagesToExport(5)).to.equal(1);
      expect(await service.getNumOfPagesToExport(6)).to.equal(2);
    });

    it('should return all pages user have when number of requested books are more than that', async () => {
      const service = new NotesExportService('Doite');

      expect(await service.getNumOfPagesToExport(99)).to.equal(2);
    });
  });

  describe('#getBookURLs(numOfBooks)', () => {
    it('should return an array of one book if 1 books is requested', async () => {
      const service = new NotesExportService('Doite');

      expect(await service.getBookURLs(1)).to.eql([
        'https://book.douban.com/people/Doite/annotation/6754574/',
      ]);
    });

    it('should return an array of all books (6) if a bigger number is requested', async () => {
      const service = new NotesExportService('Doite');

      // User has only 6 books of notes
      expect(await service.getBookURLs(99)).to.eql([
        'https://book.douban.com/people/Doite/annotation/6754574/',
        'https://book.douban.com/people/Doite/annotation/4789228/',
        'https://book.douban.com/people/Doite/annotation/26329401/',
        'https://book.douban.com/people/Doite/annotation/26435820/',
        'https://book.douban.com/people/Doite/annotation/11580128/',
        'https://book.douban.com/people/Doite/annotation/2227747/',
      ]);
    });
  });

  describe('#getBookURLsFromPage(URL)', () => {
    it('should craw and return URLs of the books on the page', async () => {
      const service = new NotesExportService('Doite');
      const firstPageURL = 'https://book.douban.com/people/Doite/annotation/?start=0';
      const result = await service.getBookURLsFromPage(firstPageURL);
      expect(result).to.eql([
        'https://book.douban.com/people/Doite/annotation/6754574/',
        'https://book.douban.com/people/Doite/annotation/4789228/',
        'https://book.douban.com/people/Doite/annotation/26329401/',
        'https://book.douban.com/people/Doite/annotation/26435820/',
        'https://book.douban.com/people/Doite/annotation/11580128/',
      ]);
    });
  });

  describe('#generatePageURLs(numOfPages)', () => {
    it('should return an array of note page URLs', () => {
      const service = new NotesExportService('Doite');

      expect(service.generatePageURLs(0)).to.eql([
      ]);
      expect(service.generatePageURLs(1)).to.eql([
        'https://book.douban.com/people/Doite/annotation/?start=0',
      ]);
      expect(service.generatePageURLs(2)).to.eql([
        'https://book.douban.com/people/Doite/annotation/?start=0',
        'https://book.douban.com/people/Doite/annotation/?start=5',
      ]);
      expect(service.generatePageURLs(3)).to.eql([
        'https://book.douban.com/people/Doite/annotation/?start=0',
        'https://book.douban.com/people/Doite/annotation/?start=5',
        'https://book.douban.com/people/Doite/annotation/?start=10',
      ]);
    });
  });
});
