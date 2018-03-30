
const cherrio = require('cheerio');
const request = require('request-promise');
const BookNotesExportService = require('./BookNotesExportService');

class NotesExportService {
  constructor(userHandle, maxBooks = 100) {
    this.maxBooks = maxBooks;
    this.user = userHandle;
    this.userURL = `https://book.douban.com/people/${userHandle}/annotation/`;
  }

  async getBooksNotesHTML(numOfBooks) {
    const bookURLs = await this.getBookURLs(numOfBooks);
    const bookNotesRequestsArr = bookURLs.map(async bookURL => await this.getBookNotesHTML(bookURL));
    const bookNotesArr = await Promise.all(bookNotesRequestsArr);

    return bookNotesArr;
  }

  async getBookNotesHTML(bookNotesPageURL) {
    const bookNotesExport = new BookNotesExportService(bookNotesPageURL);
    const bookNotesHTML = await bookNotesExport.getNotesHTML();

    return bookNotesHTML;
  }

  async getBookURLs(numOfBooks) {
    const numOfPagesToExport = await this.getNumOfPagesToExport(numOfBooks);
    const pageURLs = this.generatePageURLs(numOfPagesToExport);
    const pageURLsRequestArr = pageURLs.map(async pageURL => await this.getBookURLsFromPage(pageURL));
    const bookURLsArr = await Promise.all(pageURLsRequestArr);
    const bookURLs = bookURLsArr.reduce((a, b) => a.concat(b));

    return bookURLs.slice(0, numOfBooks);
  }

  async getBookURLsFromPage(pageURL) {
    const html = await request(pageURL);
    const $ = cherrio.load(html);
    const $books = $('.annotations-item');
    const bookURLs = $books.map((i, el) => {
      return $(el).find('h3 a').attr('href');
    }).get();

    return bookURLs;
  }

  async getNumOfPagesToExport(numOfBooks) {
    const totalNumOfPages = await this.getTotalNumOfPages();
    const requestedPages = Math.ceil(numOfBooks / 5) || totalNumOfPages;

    return Math.min(requestedPages, totalNumOfPages);
  }

  async getTotalNumOfPages() {
    const firstPageHTML = await request(this.userURL);
    const $ = cherrio.load(firstPageHTML);
    const numOfPagesStr = $('.paginator > a').last().text();

    return parseInt(numOfPagesStr, 10);
  }

  generatePageURLs(numOfPages) {
    const fixLengthArr = Array(numOfPages).fill(null);
    const pageURLs = fixLengthArr.map((e, i) => `${this.userURL}?start=${i * 5}`);

    return pageURLs;
  }
}

module.exports = NotesExportService;
