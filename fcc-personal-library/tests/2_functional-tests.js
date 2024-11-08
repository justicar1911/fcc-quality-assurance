/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  let bookId;
  let invalidId = 'invalidId'
  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  // test('#example Test GET /api/books', function (done) {
  //   chai.request(server)
  //     .get('/api/books')
  //     .end(function (err, res) {
  //       assert.equal(res.status, 200);
  //       assert.isArray(res.body, 'response should be an array');
  //       assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
  //       assert.property(res.body[0], 'title', 'Books in array should contain title');
  //       assert.property(res.body[0], '_id', 'Books in array should contain _id');
  //       done();
  //     });
  // });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function () {


    suite('POST /api/books with title => create book object/expect book object', function () {

      test('Test POST /api/books with title', function (done) {
        chai
          .request(server)
          .post('/api/books')
          .send({ title: "Text Book" })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'Response should be an object');
            assert.property(res.body, '_id', 'Response should include _id');
            assert.property(res.body, 'title', 'Response should include title');
            bookId = res.body._id;
            done();
          })
      });

      test('Test POST /api/books with no title given', function (done) {
        chai
          .request(server)
          .post('/api/books')
          .send({ title: "" })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.text, 'Response should be a String');
            assert.equal(res.text, "missing required field title", 'Error message should be "missing required field title"');
            done();
          })
      });

    });


    suite('GET /api/books => array of books', function () {

      test('Test GET /api/books', function (done) {
        chai
          .request(server)
          .get('/api/books')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body, 'Response should be an Array of book');
            assert.property(res.body[0], '_id', 'Response should include _id');
            assert.property(res.body[0], 'title', 'Response should include title');
            assert.property(res.body[0], 'commentcount', 'Response should include commentcount');
            done();
          })
      });
    });


    suite('GET /api/books/[id] => book object with [id]', function () {

      test('Test GET /api/books/[id] with id not in db', function (done) {
        chai
          .request(server)
          .get(`/api/books/${invalidId}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.text, 'Response should be a String');
            assert.equal(res.text, "no book exists", 'Error message should be "no book exists"');
            done();
          })
      });

      test('Test GET /api/books/[id] with valid id in db', function (done) {
        chai
          .request(server)
          .get(`/api/books/${bookId}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'Response should be an object');
            assert.property(res.body, '_id', 'Response should include _id');
            assert.property(res.body, 'title', 'Response should include title');
            assert.property(res.body, 'comments', 'Response should include comments');
            assert.property(res.body, 'commentcount', 'Response should include commentcount');
            done();
          })
      });

    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function () {

      test('Test POST /api/books/[id] with comment', function (done) {
        chai
          .request(server)
          .post(`/api/books/${bookId}`)
          .send({ comment: "Text comment" })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'Response should be an object');
            assert.property(res.body, '_id', 'Response should include _id');
            assert.property(res.body, 'title', 'Response should include title');
            assert.property(res.body, 'comments', 'Response should include comments');
            assert.equal(res.body.comments[res.body.commentcount - 1], "Text comment", 'Comment from user input and received by database should be equal');
            assert.property(res.body, 'commentcount', 'Response should include commentcount');
            assert.equal(res.body.commentcount, res.body.comments.length, 'commentcount should equal to number of comment');
            done();
          })
      });

      test('Test POST /api/books/[id] without comment field', function (done) {
        chai
          .request(server)
          .post(`/api/books/${bookId}`)
          .send({ comment: "" })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.text, 'Response should be a String');
            assert.equal(res.text, "missing required field comment", 'Error message should be "missing required field comment"');
            done();
          })
      });

      test('Test POST /api/books/[id] with comment, id not in db', function (done) {
        chai
          .request(server)
          .post(`/api/books/${invalidId}`)
          .send({ comment: "Text comment" })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.text, 'Response should be a String');
            assert.equal(res.text, "no book exists", 'Error message should be "no book exists"');
            done();
          })
      });

    });

    suite('DELETE /api/books/[id] => delete book object id', function () {

      test('Test DELETE /api/books/[id] with valid id in db', function (done) {
        chai
          .request(server)
          .delete(`/api/books/${bookId}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.text, 'Response should be a String');
            assert.equal(res.text, "delete successful", 'Error message should be "delete successful"');
            done();
          })
      });

      test('Test DELETE /api/books/[id] with  id not in db', function (done) {
        chai
          .request(server)
          .delete(`/api/books`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.text, 'Response should be a String');
            assert.equal(res.text, "complete delete successful", 'Error message should be "complete delete successful"');
            done();
          })
      });

    });

  });

});
