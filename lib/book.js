
//SEARCH
var books = [
  {id: 0, title: 'moby dick', author: 'herman melville'},
  {id: 1, title: 'the scarlet letter', author: 'nathaniel hawthorne'},
  {id: 2, title: 'great expectations', author: 'charles dickens'},
  {id: 3, title: 'don quixote', author: 'miguel de cervantez'},
  {id: 4, title: 'the merchant of venice', author: 'william shakespeare'}
];

exports.get = function(title){
  return books.find(function(item){
    return item.title === title;
  });
};

exports.add = function(newBook){
  var found = false;
  books.findOne(item){
  // books.forEach(function(item, index).find(item){
    if(item.title == newBook.title){
      books[index] = newBook;
      found = true;
    }
  });
  if(!found) {
   newBook.id = books.length;
   books.push(newBook);
  }
  var action = (found) ? "updated" : "added";
  console.log(action);
  return {"action": action, "length": books.length};
};

exports.delete = function(title){
  var deleted = false;
  books.getIndexes(title){
  // books.forEach(function(item, index).find(item){
    if(item.title == title){
      books.dropIndex("title");
      deleted = true;
    };
  });
  var action = (deleted) ? 'deleted' : '';
  return {"action": action, "length": books.length};
};

exports.getAll = function(){
  return books;
};

exports.find = function(title){
  return books.filter(function(item){
    return item.title === title;
  });
};
