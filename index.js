const http = require('node:http');
const url = require('node:url');
const fs = require('node:fs');

http.createServer(function (req, res) {
    // server logic goes here
    const q = new URL(req.url, `http://${req.headers.host}`);
    let filename = "." + q.pathname;
    if (filename === "./"){
        filename = "./index.html";
    }
    
    fs.readFile(filename, function(err, data){
        if (err){
            fs.readFile('404.html', function (err, errorPage) {
                if (err) {
                  // If the custom 404.html is not found, send a plain 404 response
                  res.writeHead(404, {'Content-Type': 'text/plain'});
                  return res.end("404 Not found");
                }
        
                // Serve the custom 404.html
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write(errorPage);
                return res.end();
              });
        }else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();   
        }
    });

}).listen(8080);
