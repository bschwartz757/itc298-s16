//EXPRESS
var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').urlencoded({extended: true}));
app.use('/api', require('cors')());

//set up handlebars view engine
var handlebars = require('express-handlebars')
  .create({defaultLayout:'main', extname: '.hbs'});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

var routes = require('./lib/routes.js')(app);

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
