let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('NotesController /douban/notes', () => {
  describe('GET /:user', () => {

    it('GET ?size=1 should GET one book', (done) => {
      chai.request(server).get('/douban/notes/Doite?size=1').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.booksHTMLArr.should.be.a('array');
        res.body.booksHTMLArr.length.should.eql(1);
        done();
      });
    });

    it.only('GET user that does not exist should raise error', (done) => {
      chai.request(server).get('/douban/notes/.').end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.error.should.be.a('string');
        done();
      });
    });

  });
});
