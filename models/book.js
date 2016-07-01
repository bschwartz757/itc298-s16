/**
 * Created by blakers757 on 5/17/2016.
 */
var credentials = require('../lib/credentials');
var mongoose = require('mongoose');

//remote db
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }  } };
mongoose.connect(credentials.mongo.connectionString, options)

//local db
// var ip = '127.0.0.1';
// mongoose.connect('mongodb://' + ip + '/projects');

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

var bookSchema = mongoose.Schema({
  title: String,
  author: String
});

module.exports = mongoose.model('Book', bookSchema);
