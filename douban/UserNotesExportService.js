
const cherrio = require('cheerio');
const request = require('request-promise');
const BookNotesExportService = require('./BookNotesExportService');

class UserNotesExportService {
  constructor(userHandle, maxPages = 20) {
    this.maxPages = maxPages;
    this.user = userHandle;
    this.userURL = `https://book.douban.com/people/${userHandle}/annotation/`;
  }

  async getNotesHTML(pagesRequested = this.maxPages, pageIndex = 0, accumulator = []) {
    const pageURL = `${ this.userURL }?start=${ pageIndex * 5 }`;
    const pageHTML = await request(pageURL);
    const $ = cherrio.load(pageHTML);
    const bookPageURLs = this.getBookURLsFromPage($);
    const isLastPageRequested = pageIndex >= pagesRequested - 1;

    if (isLastPageRequested || !this.nextPageExists($)) {
      const allBookURLs = accumulator.concat(bookPageURLs);
      const allNotesHTML = await Promise.all(allBookURLs.map(async (bookPageURL) => {
        return new BookNotesExportService(bookPageURL).getNotesHTML();
      }));

      return allNotesHTML;
    } else {
      return this.getNotesHTML(pagesRequested, pageIndex + 1, accumulator.concat(bookPageURLs));
    }
  }

  getBookURLsFromPage($) {
    const $books = $('.annotations-item');
    const bookURLs = $books.map((i, el) => $(el).find('h3 a').attr('href')).get();

    return bookURLs;
  }

  nextPageExists($) {
    const nextPageButton = $('span.next > a');

    return nextPageButton.length > 0;
  }
}

module.exports = UserNotesExportService;
