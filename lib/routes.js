/**
 * Created by blakers757 on 5/15/2016.
 */
module.exports = function(app){
  var book = require('../lib/book');
  var Book = require('../models/book.js');

  app.get('/', function(req, res){
    // res.type('text/html');
    Book.find(function(err, books){
      if(err) throw err;
      console.log(books);
      var context = {
        books: books.map(function(book){
          return {
            title: book.title,
            author: book.author
          }
        })
      };
      res.render('home', context);
    });
  });

  app.get('/detail/:title', function(req, res){
    // res.type('text/html');
    Book.findOne({title: req.params.title}, function(err, book){
      if(err) throw err;
      if(book){
        res.render('detail', {book});
      } else {
        res.status(404).render('404');
      }
    });
  });

  app.get('/about', function(req, res){
    res.type('text/html');
    res.render('about');
  });

  app.post('/search', function(req, res){
      // res.type('text/html');
      var foundBook = Book.findOne({title: req.body.title}, function(err, book){
        console.log('search');
        if(foundBook) {
          // console.log(foundBook);
          res.render('detail', {book});
        } else {
        foundBook = {book: req.body.title, isNew: true};
      }
    });
  });

  app.post('/add', function(req, res){
    res.type('text/html');
    var newBook = Book.findOne({title: req.body.title}, function(err, book){
      if (err) throw err;
      if (book){
        res.render('details', {book})
      } else {
        var newBook = new Book({"id": req.body.id, "title": req.body.title, "author": req.body.author}).save();
        res.render('detail', {book: newBook, result: result});
      }
    })
    // var newBook = {"id": req.body.id, "title": req.body.title, "author": req.body.author};
    // var result = book.add(newBook);
    // res.render('detail', {book: newBook, result: result});
  });

  app.post('/delete', function(req, res){
    res.type('text/html');
    var result = Book.findOne({req.body.title}, function(err, book){
      if (err) throw err;
      console.log(result);
      //result = book.delete(req.body.title) ? 'deleted' : '';
      res.render('detail', {result: result.action});
    });

    // var result = book.delete(req.body.title);
    // console.log(result);
    // //result = book.delete(req.body.title) ? 'deleted' : '';
    // res.render('detail', {result: result.action});
  });

  //API Routes
  app.get('/api/books', function(req, res){
    Book.find(function(err, books){
      if(err) throw err;
      console.log(books);
      var context = {
        books: books.map(function(book){
          return {
            title: book.title,
            author: book.author
          }
        })
      };
      res.render('home', context);
    });
  });

  app.get('/api/detail/:title', function(req, res){
    Book.findOne({title: req.params.title}, function(err, book){
      if(err) throw err;
      if(book){
        res.render('detail', {book});
      } else {
        res.status(404).render('404');
      }
    });
}
