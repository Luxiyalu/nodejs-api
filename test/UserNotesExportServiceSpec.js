const assert = require('assert');
const should = require('chai').should;
const UserNotesExportService = require('../douban/UserNotesExportService');

describe('UserNotesExportService', () => {
  describe('#getNotesHTML()', () => {

    it('should return an empty array when user does not have notes', async () => {
      const service = new UserNotesExportService('176188067');
      const bookNotesHTML = await service.getNotesHTML();

      bookNotesHTML.should.be.a('array');
      bookNotesHTML.should.have.lengthOf(0);
    });


    it('should return an array of all 6 books when user has 6 books of notes', async () => {
      const service = new UserNotesExportService('Doite');
      const bookNotesHTML = await service.getNotesHTML();

      bookNotesHTML.should.be.a('array');
      bookNotesHTML.should.have.lengthOf(6);
    });

  });
  // The other two methods are private:
  // If #getNotesHTML() passes, the other two should be fine; if it doesn't pass.. both are very simple to debug :)
});
