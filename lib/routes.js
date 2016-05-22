/**
 * Created by blakers757 on 5/15/2016.
 */
module.exports = function(app){
  var book = require('../lib/book');
  var Book = require('../models/book.js');

  app.get('/', function(req, res){
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
    // var item = req.params.title;
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


    res.type('text/html');
    var foundBook = book.get(req.body.title);
    console.log('search');
    if(!foundBook) {
      foundBook = {title: req.body.title, isNew: true};
    }
    console.log(foundBook);
    res.render('detail', {book: foundBook, isNew: false});
  });

  app.post('/add', function(req, res){
    res.type('text/html');
    var newBook = {"id": req.body.id, "title": req.body.title, "author": req.body.author};
    var result = book.add(newBook);
    res.render('detail', {book: newBook, result: result});
  });

  app.post('/delete', function(req, res){
    res.type('text/html');
    var result = book.delete(req.body.title);
    console.log(result);
    //result = book.delete(req.body.title) ? 'deleted' : '';
    res.render('detail', {result: result.action});
  });

  //API Routes
  app.get('/api/books', function(req, res){
    var books = book.getAll();
    if(books){
      res.json(books);
      console.log(books);
    } else {
      res.status(404).send('404 - Not Found');
    }
  });

  app.get('/api/detail/:title', function(req, res){
    var found = book.get(req.params.title);
    if(found){
      res.json(found);
      console.log(found);
    } else {
      res.status(404).send('404 - Not Found');
    }
  });
}
