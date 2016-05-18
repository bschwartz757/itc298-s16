/**
 * Created by blakers757 on 5/17/2016.
 */
var Book = require('./models/book.js');

new Book({title: 'Hamlet', author: 'William Shakespeare'}).save();

Book.find(function(err, books){
  console.log(books);
});