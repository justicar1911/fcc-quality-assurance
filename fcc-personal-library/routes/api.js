/*
*
*
*       Complete the API routing below
*       
*       
*/
'use strict';
const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteAllBooks,
  deleteBook } = require('../src/models/books.model')
module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      let books = await getAllBooks()
      return res.status(200).json(books)
    })

    .post(async function (req, res) {
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) {
        return res.status(200).send('missing required field title')
      }

      let book = await createBook({ title })

      return res.status(200).json({
        title: book.title,
        _id: book._id
      })
    })

    .delete(async function (req, res) {
      //if successful response will be 'complete delete successful'
      await deleteAllBooks()

      return res.status(200).send('complete delete successful')

    });



  app.route('/api/books/:id')
    .get(async function (req, res) {
      let bookId = req.params.id;

      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      let book = await getBook(bookId)
      if (!book || book.length == 0) {
        return res.status(200).send("no book exists")
      }

      return res.status(200).json(book)
    })

    .post(async function (req, res) {
      let bookId = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (!comment) {
        return res.status(200).send('missing required field comment')
      }

      let book = await updateBook(bookId, comment)
      if (!book || book.length == 0) {
        return res.status(200).send("no book exists")
      }

      return res.status(200).json(book)
    })

    .delete(async function (req, res) {
      let bookId = req.params.id;
      //if successful response will be 'delete successful'

      let book = await deleteBook(bookId)
      if (!book || book.length == 0) {
        return res.status(200).send("no book exists")
      }
      return res.status(200).send('delete successful')
    });

};
