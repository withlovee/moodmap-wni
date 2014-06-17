var http = require("http");
var url = require("url");

function start(port, route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    var postData = "";

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
    });

    request.addListener("end", function(){
      route(handle, pathname, response, postData);
    });

  }
  http.createServer(onRequest).listen(port);
  console.log("Server has started on port " + port);
}

exports.start = start