/**
 * Created by blakers757 on 5/17/2016.
 */
var mongoose = require('mongoose');

var ip = '127.0.0.1';

mongoose.connect('mongodb://' + ip + '/projects');

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

var bookSchema = mongoose.Schema({
  title: String,
  author: String
});

module.exports = mongoose.model('Book', bookSchema);