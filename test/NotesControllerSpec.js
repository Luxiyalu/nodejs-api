let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe.only('NotesController /douban/notes', () => {
  describe('GET /:user', () => {

    it('GET ?pages=1 should GET books on the first page', (done) => {
      chai.request(server).get('/douban/notes/Doite?pages=1').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.booksHTMLArr.should.be.a('array');
        res.body.booksHTMLArr.length.should.eql(5);
        done();
      });
    });

    it('GET user that does not exist should raise error', (done) => {
      chai.request(server).get('/douban/notes/.').end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.error.should.be.a('string');
        done();
      });
    });

  });
});
