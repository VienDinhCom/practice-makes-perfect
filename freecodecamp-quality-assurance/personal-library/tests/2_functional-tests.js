const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const assert = chai.assert;

chai.use(chaiHttp);

suite('Functional Tests', function () {
  suite('Routing tests', function () {
    let testBookId;

    suite('POST /api/books with title => create book object/expect book object', function () {
      test('Test POST /api/books with title', function (done) {
        chai
          .request(server)
          .post('/api/books')
          .send({ title: 'Test Book' })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, '_id', 'response should contain _id');
            assert.property(res.body, 'title', 'response should contain title');
            assert.equal(res.body.title, 'Test Book');
            testBookId = res.body._id; // Save for later tests
            done();
          });
      });

      test('Test POST /api/books with no title given', function (done) {
        chai
          .request(server)
          .post('/api/books')
          .send({})
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'missing required field title');
            done();
          });
      });
    });

    suite('GET /api/books => array of books', function () {
      test('Test GET /api/books', function (done) {
        chai
          .request(server)
          .get('/api/books')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body, 'response should be an array');
            assert.property(res.body[0], '_id', 'books should contain _id');
            assert.property(res.body[0], 'title', 'books should contain title');
            assert.property(res.body[0], 'commentcount', 'books should contain commentcount');
            done();
          });
      });
    });

    suite('GET /api/books/[id] => book object with [id]', function () {
      test('Test GET /api/books/[id] with id not in db', function (done) {
        chai
          .request(server)
          .get('/api/books/invalidid123')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists');
            done();
          });
      });

      test('Test GET /api/books/[id] with valid id in db', function (done) {
        chai
          .request(server)
          .get('/api/books/' + testBookId)
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, '_id', 'response should contain _id');
            assert.property(res.body, 'title', 'response should contain title');
            assert.property(res.body, 'comments', 'response should contain comments array');
            assert.isArray(res.body.comments, 'comments should be an array');
            done();
          });
      });
    });

    suite('POST /api/books/[id] => add comment/expect book object with id', function () {
      test('Test POST /api/books/[id] with comment', function (done) {
        chai
          .request(server)
          .post('/api/books/' + testBookId)
          .send({ comment: 'Test Comment' })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, '_id', 'response should contain _id');
            assert.property(res.body, 'title', 'response should contain title');
            assert.property(res.body, 'comments', 'response should contain comments');
            assert.isArray(res.body.comments, 'comments should be an array');
            assert.include(res.body.comments, 'Test Comment', 'comments should include new comment');
            done();
          });
      });

      test('Test POST /api/books/[id] without comment field', function (done) {
        chai
          .request(server)
          .post('/api/books/' + testBookId)
          .send({})
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'missing required field comment');
            done();
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function (done) {
        chai
          .request(server)
          .post('/api/books/invalidid123')
          .send({ comment: 'Test Comment' })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists');
            done();
          });
      });
    });

    suite('DELETE /api/books/[id] => delete book object id', function () {
      test('Test DELETE /api/books/[id] with valid id in db', function (done) {
        chai
          .request(server)
          .delete('/api/books/' + testBookId)
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'delete successful');
            done();
          });
      });

      test('Test DELETE /api/books/[id] with id not in db', function (done) {
        chai
          .request(server)
          .delete('/api/books/invalidid123')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists');
            done();
          });
      });
    });
  });
});
