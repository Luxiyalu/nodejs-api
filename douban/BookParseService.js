const cherrio = require('cheerio');
const request = require('request-promise');

class BookParseService {
  constructor(bookNotesHTML) {
    this.pageHTML = bookNotesHTML;
  }

  async export() {
    return ['why is this automatically'];
  }
}

module.exports = BookParseService;
