
//EXPRESS
var express = require('express');
var fortune = require('./lib/fortune.js');
// var books = require('./lib/books.js')
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// POST http://localhost:3000/api/users
// parameters sent with
// app.post('/api/users', function(req, res){
//   var user_id = req.body.id;
//   var token = req.body.token;
//   var geo = req.body.geo;
//   res.send(user_id + ' ' + token + ' ' + geo);
// });

//set up handlebars view engine
var handlebars = require('express-handlebars')
  .create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

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
  res.render('home');
});
app.get('/about', function(req, res){
  res.render('about', {fortune: fortune.getFortune()});
});


//SEARCH
var books = [
  {id: 0, title: 'mobydick', author: 'Herman Melville'},
  {id: 1, title: 'thescarletletter', author: 'Nathaniel Hawthorne'},
  {id: 2, title: 'greatexpectations', author: 'Charles Dickens'},
  {id: 3, title: 'donquixote', author: 'Miguel de Cervantez'},
  {id: 4, title: 'themerchantofvenice', author: 'William Shakespeare'}
];

// books.forEach(function(author){
//   var result = author.id + author.title;
//   return (result);
// });

app.get('/books', function(req, res){
  res.render('books');
});

app.post('/search', function(req, res){
  res.type('text/html');
  var header = 'Searching for: ' + req.body.search_title;
  // res.render("/books-results",  {books: books.getBooks()});
  var result = books.find(function(item){
    return item.title === req.body.search_title;
  });

  if(result) {
    res.send(header + "\tAuthor " + result.author);
  } else {
    res.send(header + "\tSorry, Title Not Found");
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
