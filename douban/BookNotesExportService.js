const cherrio = require('cheerio');
const request = require('request-promise');

class BookNotesExportService {
  constructor(bookNotesPageURL) {
    this.bookNotesPageURL = bookNotesPageURL;
  }

  async getNotesHTML(pageIndex = 0, accumulator = '') {
    const pageURL = `${ this.bookNotesPageURL }?start=${ pageIndex * 10 }`;
    const pageHTML = await request(pageURL);
    const $ = cherrio.load(pageHTML);
    const nextPageExists = this.nextPageExists($);
    const pageNotesHTML = this.getSinglePageNotesHTML($);

    if (!nextPageExists) {
      return accumulator + pageNotesHTML;
    } else {
      return this.getNotesHTML(pageIndex + 1, accumulator + pageNotesHTML);
    }
  }

  getSinglePageNotesHTML($) {
    const pageNotesHTML = $.html('.article');

    return pageNotesHTML;
  }

  nextPageExists($) {
    const nextPageButton = $('span.next > a');

    return nextPageButton.length > 0;
  }
}

module.exports = BookNotesExportService;
