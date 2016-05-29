/**
 * Created by blakers757 on 5/15/2016.
 */
module.exports = function(app){
  // var book = require('../lib/book');
  var Book = require('../models/book.js');

  app.get('/', function(req, res){
    Book.find(function(err, books){
      if(err) return next(err);
      if (!books) return next();
      console.log(books);
      res.type('text/html');
      res.render('home', {books: books});
    });
  });

  app.get('/detail/:title', function(req, res){
    var title = req.params.title;
    Book.findOne({'title': title}, function(err, found_book){
      if(err) return next (err);
      if(!found_book){
        found_book = {title: title};
      }
      res.type('text/html');
      res.render('detail', {book: found_book});
    });
  });

  app.get('/about', function(req, res){
    res.type('text/html');
    res.render('about');
  });

  app.post('/search', function(req, res){
    var title = req.body.title;
    Book.findOne({'title': title}, function(err, found_book){
      if (err) return next (err);
      if(!found_book) {
        // console.log(foundBook);
        found_book = {book: title, isNew: true};
      }
      res.type('text/html');
      res.render('detail', {book: found_book});
    });
  });

  // app.post('/add', function(req, res){
  //   var query = {'title': req.body.title}
  //   var newBook = new Book({title: req.body.title, author: req.body.author});
  //   Book.findOneAndUpdate({query, {upsert:true}, {new:true, passRawResult:true}, function(err, doc, res){
  //     if (err) return next (err);
  //     if (result.lastErrorObject.updatedExisting) {
  //
  //     }
  //     // var action = (return: null) ? 'Added' : 'Updated';
  //     res.type('text/html');
  //     res.render('detail', {result});
  //   });
  // });

  app.post('/add', function(req, res){
    var newBook = new Book({title: req.body.title, author: req.body.author});
    Book.findByIdAndUpdate({title: req.body.title}, newBook, function(err, result){
      if (err) {
        new Book(newBook).save(function(err){
          action: 'Added';
          res.type('text/html');
          res.render('detail', {Book: newBook, result: 'Added'});
        });
      } else {
        res.type('text/html');
        res.render('detail', {Book: newBook, result: 'Updated'});
      }
    });
  });

  app.post('/delete', function(req, res){
    Book.remove({"title": req.body.title}, function(err){
      var action = (err) ? err : 'Deleted';
      res.type('text/html');
      res.render('detail', {Book: {}, result: action});
    });
  });

  //API Routes
  app.get('/api/books', function(req, res){
    Book.find(function(err, books){
      if(err) return next(err);
      console.log(books);
      if (books) {
        res.json (books);
      } else {
        res.status(404).render('404');
      }
    });
  });

  app.get('/api/detail/:title', function(req, res){
    Book.findOne({title: req.params.title}, function(err, found){
      if(err) return next(err);
      if (found) {
        res.json(found);
      } else {
        res.status(404).render('404');
      }
    });
  });

}
