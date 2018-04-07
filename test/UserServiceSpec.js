const assert = require('assert');
const should = require('chai').should;
const UserService = require('../douban/UserService');

describe('UserService', () => {
  describe('#userExists()', () => {
    it('should return false if user does not exist', async () => {
      const service = new UserService('.');
      const userExists = await service.userExists();

      userExists.should.be.false;
    });

    it('should return true if user does exist', async () => {
      const service = new UserService('Doite');
      const userExists = await service.userExists();

      userExists.should.be.true;
    });
  });
});
