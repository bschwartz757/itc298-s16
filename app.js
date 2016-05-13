
//EXPRESS
var express = require('express');
var book = require('./lib/book.js')
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//set up handlebars view engine
var handlebars = require('express-handlebars')
  .create({defaultLayout:'main', extname: '.hbs'});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

app.set('port', process.env.PORT || 3000);

//add 'static' middleware
app.use(express.static(__dirname + '/public'));

//display headers info
app.get('/headers', function(req, res){
  res.set('Content-Type', 'text/plain');
  var s = '';
  for (var name in req.headers) s += name + ': ' + req.header[name] + '\n';
  res.send(s);
});

//home/about routes
app.get('/', function(req, res){
  res.render('home', {books: book.getAll()});
});
app.get('/about', function(req, res){
  res.render('about');
});

app.post('/detail', function(req, res){
  res.type('text/html');
  var result = book.get(req.body.title);
  if(result) {
    res.render('detail', {book: result.book, length: result.length});
   } else {
    var newBook = {"title": req.body.title};
    res.render('detail', {book: newBook});
  }
});

app.get('/detail/:title', function(req, res){
  res.type('text/html');
  var result = book.get(req.params.title);
  if(result) {
    res.render('detail', {book: result.book, length: result.length});
   } else {
    var newBook = {"title": req.params.title};
    res.render('detail', {book: newBook});
  }
});

app.post('/search', function(req, res){
  res.type('text/html');
  var result = book.get(req.body.title);
  if(result) {
    res.render('detail', {book: result.book, length: result.length});
   } else {
    var newBook = {"title": req.body.title};
    res.render('detail', {book: newBook});
  }
});

app.post('/add', function(req, res){
  res.type('text/html');
  var newBook = {"id": req.body.id, "title": req.body.title, "author": req.body.author};
  var result = book.add(newBook);
  if(found){
    res.render('detail', {book: result.book});
  } else {
    res.render('detail', {book: newBook, result: result});
  }
});

app.post('/delete', function(req, res){
  res.type('text/html');
  var result = book.delete(req.body.title);
  if(deleted){
    res.render('detail', {result: book.delete(req.body.title)});
  } else {
    res.render('detail', {result: books.length})
  }
});

//404 catch-all handler (middleware)
app.use(function(req, res, next){
  res.status(404).render('404');
});

//500 error handler (middleware)
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
   app.get('port') + '; press Ctrl-C to terminate.');
});
