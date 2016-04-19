
var books = [
  {id: 0, title: 'Moby Dick', author: 'Herman Melville'},
  {id: 1, title: 'The Scarlet Letter', author: 'Nathaniel Hawthorne'},
  {id: 2, title: 'Great Expectations', author: 'Charles Dickens'},
  {id: 3, title: 'Don Quixote', author: 'Miguel de Cervantez'}
];

exports.getBooks = function(title){
  forEach(author in books){
    return (title + author);
  }
};
