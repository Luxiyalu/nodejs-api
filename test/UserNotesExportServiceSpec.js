const assert = require('assert');
const should = require('chai').should;
const UserNotesExportService = require('../douban/UserNotesExportService');

describe.only('UserNotesExportService', () => {
  describe('#getNotesHTML()', () => {

    describe('when no parameters are passed in', () => {
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

    describe('when pages parameter is passed in', () => {
      it('should return an array of 5 books when 1 page of notes are requested', async () => {
        const service = new UserNotesExportService('Doite');
        const bookNotesHTML = await service.getNotesHTML(1);

        bookNotesHTML.should.be.a('array');
        bookNotesHTML.should.have.lengthOf(5);
      });

      it('should return an array of all books when max page of notes are requested', async () => {
        const service = new UserNotesExportService('Doite');
        const bookNotesHTML = await service.getNotesHTML(3);

        bookNotesHTML.should.be.a('array');
        bookNotesHTML.should.have.lengthOf(6);
      });
    });

  });
});
