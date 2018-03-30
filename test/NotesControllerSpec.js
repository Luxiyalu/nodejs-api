let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Books', () => {
  describe('/GET user notes', () => {

    it.only('should GET one book if size parameter is 1', (done) => {
      chai.request(server).get('/douban/notes/Doite?size=1').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.booksHTMLArr.should.be.a('array');
        res.body.booksHTMLArr.length.should.eql(1);
        done();
      });
    });

  });
});
