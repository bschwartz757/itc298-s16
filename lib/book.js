
//SEARCH
var books = [
  {id: 0, title: 'moby dick', author: 'herman melville'},
  {id: 1, title: 'the scarlet letter', author: 'nathaniel hawthorne'},
  {id: 2, title: 'great expectations', author: 'charles dickens'},
  {id: 3, title: 'don quixote', author: 'miguel de cervantez'},
  {id: 4, title: 'the merchant of venice', author: 'william shakespeare'}
];

exports.get = function(title){
  var result = books.find(function(item){
    return item.title === title;
  });
  if(result){
    return result;
  } else {
    return {};
  }
};

exports.add = function(newBook){
  var found = false;
  books.forEach(function(item, index){
    if(item.title == newBook.title){
      books[index] = newBook;
      found = true;
    }
  });
  if(!found) {
   books.push(newBook);
  };
  return {'added': !found, 'length': books.length};
};

exports.delete = function(dropBook){
  var deleted = false;
  books.forEach(function(item, index){
    if(item.title == dropBook){
      books.splice(index, 1);
      deleted = true;
    };
  });
  return {'deleted': deleted, 'length': books.length};
};

exports.getAll = function(){
  return books;
};

exports.find = function(title){
  return books.filter(function(item){
    return item.title === title;
  });
};
