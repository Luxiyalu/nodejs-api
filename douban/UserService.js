
const cherrio = require('cheerio');
const request = require('request-promise');
const BookNotesExportService = require('./BookNotesExportService');

class UserService {
  constructor(userHandle) {
    this.user = userHandle;
    this.userURL = `https://www.douban.com/people/${userHandle}/`;
  }

  async userExists() {
    try {
      const userPageRedirectHTML = await request({
        uri: this.userURL,
        headers: {
          // Need this header to not hit 403. Douban only allows visit of user page if visitor is logged in
          'User-Agent': 'Request-Promise',
        },
      });
      // If user page exists, will get redirected to login page:
      const pageExists = !!userPageRedirectHTML.match(/登录豆瓣/);

      return pageExists;
    } catch (err) {
      return false;
    }
  }
}

module.exports = UserService;
