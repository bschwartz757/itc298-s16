/**
 * Created by blakers757 on 5/17/2016.
 */
var Book = require('./models/book.js');

new Book({title: 'hamlet', author: 'william shakespeare', price: 24.50}).save();
new Book({title: 'moby dick', author: 'herman melville', price: 22.00}).save();
new Book({title: 'the scarlet letter', author: 'nathaniel hawthorne', price: 21.25}).save();
new Book({title: 'great expectations', author: 'charles dickens', price: 37.85}).save();
new Book({title: 'don quixote', author: 'miguel de cervantez', price: 35.00}).save();
new Book({title: 'the merchant of venice', author: 'william shakespeare', price: 45.00}).save();

Book.find(function(err, books){
  console.log(books);
});
