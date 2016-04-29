
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
  return {'title': result.title, 'author': result.author, 'length': books.length};
};

// exports.add = function(newBook){
//     var found = books.findIndex(function(item){
//       return item.title === newBook.title;
//     });
//   var result;
//   if(found > -1){
//     books[found] = newBook;
//     result = 'Updated';
//   } else {
//     books.push(newBook);
//     result = 'Added';
//   }
//   return {'result': result, 'length': books.length};
// };

exports.add = function(newBook){
  var updated = false;
  books.forEach(function(item, index){
    if(item.title == newBook.title){
      books[index] = newBook;
      updated = true;
    }
  });
  if(!updated) {
   books.push(newBook);
  };
  return {'updated': updated, 'length': books.length};
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



// exports.delete = function(dropBook){
//   var found = books.findIndex(function(item){
//     return item['title'] === dropBook['title'];
//     // return item.title === books[item].title;
//   });
//   var result;
//   if(found){
//     result = books.slice(books[found]);
//     return books.found;
//   } else {
//     result = 'Not Found';
//   }
//   return result;
// };

// exports.getBook = function(title){
//   var result = books.forEach(function(item){
//     if(item.title === title){
//       return this.item;
//       // return item.title === title;
//     }
//   });
//   return result;
// };
//
// exports.addBook = function(title){
//   var result = books.forEach(function(item){
//     if(item.title === title){
//       return this.item.push(books);
//     }
//   });
//   return result;
// };
//
// exports.removeBook = function(title){
//   var result = books.forEach(function(item){
//     if(item.title === title){
//       return this.item.pop(books);
//     }
//   });
//   return result;
// };
//
// exports.updateBook = function(title){
//   var result = books.forEach(function(item){
//     if(item.title === title){
//       return this.item.splice(books);
//     }
//   });
//   return result;
// };
