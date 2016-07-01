/**
 * Created by blakers757 on 5/15/2016.
 */
module.exports = function(app){
  // var book = require('../lib/book');
  var Book = require('../models/book.js');
  var path = require('path');

  // app.get('/', function(req, res){
  //   Book.find(function(err, books){
  //     if(err) return next(err);
  //     if (!books) return next();
  //     //console.log(books);
  //     res.type('text/html');
  //     res.render('home', {books: books});
  //   });
  // });

  // app.post('/search', function(req, res){
  //   var title = req.body.title;
  //   Book.findOne({'title': title}, function(err, found_book){
  //     if (err) return next (err);
  //     if(!found_book) {
  //       // console.log(book);
  //       found_book = {title: title};
  //       res.render('detail', {book: found_book});
  //     }
  //     res.type('text/html');
  //     //console.log(found_book);
  //     res.render('detail', {book: found_book});
  //   });
  // });

  // app.get('/api/detail/:title', function(req, res){
  //   Book.findOne({title: req.params.title}, function(err, found){
  //     if(err) return next(err);
  //     if (found) {
  //       console.log(found);
  //       res.json(found);
  //     } else {
  //       res.status(404).render('404');
  //     }
  //   });
  // });

  // app.get('/detail/:title', function(req, res){
  //   var title = req.params.title;
  //   Book.findOne({'title': title}, function(err, found_book){
  //     if(err) return next (err);
  //     if(!found_book){
  //       //console.log(stuff);
  //       found_book = {title: title};
  //     }
  //     res.type('text/html');
  //     //console.log(found_book);
  //     res.render('detail', {book: found_book});
  //   });
  // });

  // app.get('/about', function(req, res){
  //   res.type('text/html');
  //   res.render('about');
  // });

  // app.post('/api/add', function(req, res){
  //   var newBook = {title: req.body.title, author: req.body.author};
  //   Book.findOneAndUpdate({title: req.body.title}, newBook, function(err, result){
  //     if (err) {
  //       new Book(newBook).save(function(err){
  //         action = 'Added';
  //         res.type('text/html');
  //         //console.log(result);
  //         res.render('detail', {book: newBook, result: 'Added'});
  //       });
  //     } else {
  //       res.type('text/html');
  //       //console.log(result);
  //       res.render('update', {book: newBook, result: 'Updated'});
  //     }
  //   });
  // });

  //API Routes
  app.get('/', function(req, res){
    res.type('text/html');
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });

  app.get('/api/books', function(req, res){
    Book.find(function(err, books){
      if(err) return next(err);
      if (books) {
        res.json (books);
      } else {
        res.status(404).render('404');
      }
    });
  });

  app.get('/api/detail/:title', function(req, res){
    var title = req.params.title;
    Book.findOne({'title': title}, function(err, found){
      if(found) {
        res.json(found)
      } else {
        res.status(404).send('404 - not found');
      }
    });
  });

  app.post('/api/add', function(req, res){
    console.log(req.body);
    var new_book = {"title": req.body.title, 'author': req.body.author};
    Book.findByIdAndUpdate({_id:req.body._id}, new_book, function(err, result){
      if (err){
        new Book(new_book).save(function(err){
          res.json({'result': 'added'});
        });
      } else {
        res.json({'result': 'saved'});
      };
    });
  });

  app.post('/api/delete', function(req, res){
    Book.findOneAndRemove({"title": req.body.title}, function(err){
      var action = (err) ? err : 'Deleted';
      console.log(action);
      res.json({'result': 'action'});
    });
  });

}
