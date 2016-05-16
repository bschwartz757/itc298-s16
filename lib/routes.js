/**
 * Created by blakers757 on 5/15/2016.
 */
module.exports = function(app){
  var book = require('../lib/book');

  app.get('/', function(req, res){
    res.render('home', {books: book.getAll()});
  });

  app.get('/detail/:title', function(req, res){
    res.type('text/html');
    var found = book.get(req.params.title);
    if(!found) {
      found = {title: req.params.title};
    }
    res.render('detail', {book: found});
  });

  app.get('/about', function(req, res){
    res.type('text/html');
    res.render('about');
  });

  app.post('/search', function(req, res){
    res.type('text/html');
    var found = book.get(req.body.title);
    if(found) {
      found = {title: req.body.title};
    }
    res.render('detail', {book: found});
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
    res.render('detail', {result: book.delete(req.body.title)});
  });

  //API Routes
  app.get('/api/books', function(req, res){
    var books = books.getAll();
    if(books){
      res.json(books);
    } else {
      res.status(404).send('404 - Not Found');
    }
  });

  app.get('/api/detail/:title', function(req, res){
    var found = book.get(req.params.title);
    if(found){
      res.json(found);
    } else {
      res.status(404).send('404 - Not Found');
    }
  });
}