class NotesExportService {
  constructor(userHandle) {
    this.user = userHandle;
    this.userURL = `https://book.douban.com/people/${userHandle}/annotation/`;
  }

  generatePageURLs(numOfBooks) {
    const numOfPages = Math.ceil(numOfBooks / 5);
    const pageURLs = Array(numOfPages).fill(0).map((e, i) => `${this.userURL}?start=${i * 5}`);
    return pageURLs;
  }
}

module.exports = NotesExportService;
