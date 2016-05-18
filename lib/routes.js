/**
 * Created by blakers757 on 5/15/2016.
 */
module.exports = function(app){
  var book = require('../lib/book');

  app.get('/', function(req, res){
    res.render('home', {books: book.getAll()});
    console.log('home');
  });

  app.get('/detail/:title', function(req, res){
    res.type('text/html');
    var found = book.get(req.params.title);
    console.log('detail/title');
    if(!found) {
      found = {title: req.params.title};
      console.log('not found');
    }
    res.render('detail', {book: found});
    console.log('found');
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