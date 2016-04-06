var http = require("http"), fs = require('fs');

http.createServer(function(req, res){
  console.log("test 1");
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Aloha world");

}).listen(3000);
console.log("test 2");
