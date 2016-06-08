//EXPRESS
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', require('cors')());

//set up handlebars view engine
var handlebars = require('express-handlebars').create({defaultLayout:'main', extname: '.hbs',                 helpers: {
    shortDate: function (date) {
      if (typeof date === 'String') {date = new Date(date);}
      var month = (date.getMonth() < 10) ? '0' + date.getMonth() : date.getMonth();
      var day  = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
      return date.getFullYear() + '-' + month + '-' + day;
    }
  }
});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

var routes = require('./lib/routes.js')(app);

//404 catch-all handler (middleware)
app.use(function(req, res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

//500 error handler (middleware)
app.use(function(err, req, res, next){
  // console.error(err.stack);
  res.status(500).render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
   app.get('port') + '; press Ctrl-C to terminate.');
});
