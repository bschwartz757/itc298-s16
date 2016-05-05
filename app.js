
//EXPRESS
var express = require('express');
var fortune = require('./lib/fortune.js');
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
  res.render('home', {book: book.getAll()});
});

app.get('/detail/:title', function(req, res){
  res.type('text/html');
  res.render('detail', {book: book.get(req.params.title)})
});

app.get('/about', function(req, res){
  res.render('about', {fortune: fortune.getFortune()});
});

app.post('/search', function(req, res){
  res.type('text/html');
  var header = 'Searching for: ' + req.body.title;
  var result = book.get(req.body.title);
  if(result) {
    res.render('detail', {book: "Here is the book you requested: " + result.title + " by " + result.author + ". There are " + result.length + " items in our collection."});
   } else {
    // res.status(404).render('404');
    res.send(header + "\tSorry, Title Not Found");
  }
});

app.post('/add', function(req, res){
  res.type('text/html');
  var result = book.add(req.body.title);
  // console.log(result);
  if(result.updated) {
    res.render('detail', {book: req.body.title + " is already in the system. There are " + result.length + " items in our collection."});
  } else {
    res.render('detail', {book: "Thanks for adding " + req.body.title + " to the system. There are " + result.length + " items in our collection."});
  }
});

app.post('/delete', function(req, res){
  res.type('text/html');
  var result = book.delete(req.body.title);
  if(result.deleted) {
    res.render('detail', {book: req.body.title + " has been removed from the system. There are now " + result.length + " items in our collection."});
  } else {
    res.render('detail', {book: req.body.title + " was not found in our system. There are " + result.length + " items in our collection."});
  }
});

// app.put('/search/put', function(req, res){
//   res.type('text/html');
//   var result = book.getBook(req.body.search_title);
//   if(result) {
//     res.render('books-results', {"Thanks, " + book: result.title + " has been updated.");
//   }
// });

// app.post('/api/search/:id', function(req, res){
//   var result = books.forEach(function(item){
//     if(item.title === title){
//       return this.item;
//     }
// });
// });

// app.put('/api/search/:id', function(req, res){
//   var x = books.filter(function(x){
//     return x.id === req.params.id
//   })[0];
//   if(x){
//     if(req.query.name){
//       x.title = req.query.title;
//       res.json({success: true});
//     };
//   }
//   res.render('books');
// });

// app.delete('api/search/:id', function(req, res){
//   res.render('books');
// });

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
