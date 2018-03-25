
const cherrio = require('cheerio');
const request = require('request-promise');

class NotesExportService {
  constructor(userHandle) {
    this.user = userHandle;
    this.userURL = `https://book.douban.com/people/${userHandle}/annotation/`;
  }

  async exportNotes(numOfBooks) {
    const pageURLs = this.generatePageURLs(numOfBooks);
    const bookURLs = await pageURLs.map(async (pageURL) => await this.getBookURLsFromPage(pageURL)).reduce((a, b) => a.concat(b));
    const bookNotesArr = bookURLs.map(bookURL => this.crawBookNotes(bookURL));
  }
  generatePageURLs(numOfBooks) {
    const numOfPages = Math.ceil(numOfBooks / 5);
    const pageURLs = Array(numOfPages).fill(0).map((e, i) => `${this.userURL}?start=${i * 5}`);
    return pageURLs;
  }
  async getBookURLsFromPage(pageURL) {
    // return await 1;
    try {
      const html = await request(pageURL);
      const $ = cherrio.load(html);
      const $books = $('.annotations-item');
      const bookURLs = $books.map((i, el) => {
        return $(el).find('h3 a').attr('href');
      }).get();
      // return Promise.resolve(bookURLs);
      return bookURLs;
    }
    catch (error) {
      // return Promise.reject(error);
      return error;
    }
  }
  crawBookNotes(bookURL) {
  }
}

module.exports = NotesExportService;
