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
      //console.log(books);
      res.type('text/html');
      res.render('home', {books: books});
    });
  });

  app.get('/detail/:title', function(req, res){
    var title = req.params.title;
    Book.findOne({'title': title}, function(err, found_book){
      if(err) return next (err);
      if(!found_book){
        //console.log(stuff);
        found_book = {title: title};
      }
      res.type('text/html');
      //console.log(found_book);
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
        // console.log(book);
        found_book = {title: title};
        res.render('detail', {book: found_book});
      }
      res.type('text/html');
      //console.log(found_book);
      res.render('detail', {book: found_book});
    });
  });

  // app.post('/add', function(req, res){
  //   // var query = {'title': req.body.title}
  //   // var newBook = new Book({title: req.body.title, author: req.body.author});
  //   Book.findOneAndUpdate(
  //     {'title': req.body.title},
  //     {
  //         '$set': {
  //         'author': req.body.author,
  //       }
  //     },
  //     {'new': true, 'upsert': true},
  //     function(err, doc, raw){
  //       if (err) return next (err);
  //       console.log(raw);
  //     }
  //   );
  // });
      // query, {new:false}, {upsert:true}, function(err, doc, raw){
      // if (result.lastErrorObject.updatedExisting) {
      //
      // }
      // var action = (return: null) ? 'Added' : 'Updated';
      // res.type('text/html');
      // res.render('detail', {result});
    // });


  app.post('/add', function(req, res){
    var newBook = {title: req.body.title, author: req.body.author};
    Book.findOneAndUpdate({title: req.body.title}, newBook, function(err, result){
      if (err) {
        new Book(newBook).save(function(err){
          action = 'Added';
          res.type('text/html');
          //console.log(result);
          res.render('detail', {book: newBook, result: 'Added'});
        });
      } else {
        res.type('text/html');
        //console.log(result);
        res.render('update', {book: newBook, result: 'Updated'});
      }
    });
  });

  app.post('/delete', function(req, res){
    Book.findOneAndRemove({"title": req.body.title}, function(err){
      var action = (err) ? err : 'Deleted';
      res.type('text/html');
      //console.log(action);
      res.render('delete', {book: {}, result: action});
    });
  });

  //API Routes
  app.get('/api/books', function(req, res){
    Book.find(function(err, books){
      if(err) return next(err);
      console.log(books);
      if (books) {
        console.log(books);
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
        console.log(found);
        res.json(found);
      } else {
        res.status(404).render('404');
      }
    });
  });

}
