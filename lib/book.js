
//SEARCH
var books = [
  {id: 0, title: 'Mody Dick', author: 'Herman Melville'},
  {id: 1, title: 'The Scarlet Letter', author: 'Nathaniel Hawthorne'},
  {id: 2, title: 'Great Expectations', author: 'Charles Dickens'},
  {id: 3, title: 'Don Quixote', author: 'Miguel de Cervantez'},
  {id: 4, title: 'The Merchant of Venice', author: 'William Shakespeare'}
];

exports.getBook = function(title){
  var result = books.find(function(item){
    return item.title === title;
  });
  return result;
};
