
//EXPRESS
var express = require('express');
var fortune = require('./lib/fortune.js');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// POST http://localhost:3000/api/users
// parameters sent with
app.post('/api/users', function(req, res){
  var user_id = req.body.id;
  var token = req.body.token;
  var geo = req.body.geo;

  res.send(user_id + ' ' + token + ' ' + geo);
});

//set up handlebars view engine
var handlebars = require('express-handlebars')
  .create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

//add 'static' middleware
app.use(express.static(__dirname + '/public'));

//home/about routes
app.get('/', function(req, res){
  res.render('home');
});
app.get('/about', function(req, res){
  res.render('about', {fortune: fortune.getFortune()});
});

//404 catch-all handler (middleware)
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});

//500 error handler (middleware)
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
   app.get('port') + '; press Ctrl-C to terminate.');
});
