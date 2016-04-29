var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs = require('fs');

http.createServer(function(req, res) {
  if (req.url == '/view' && req.method == 'GET') {
    fs.readFile('./data/data.xlsx', function(err, file) {
      res.writeHead(200, {"Content-Type" : "application/wps-office.xlsx" });
      res.write(file, "binary");
      res.end();
    });
    return;
  }
  
  if (req.url == '/upload' && req.method == 'POST') {
    // parse a file upload
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      fs.rename(files.upload.path, './data/data.xlsx');
      res.writeHead(200, {'content-type': 'text/html'});
      res.write('Received upload: <a href="/view">View PDF</a>');
      res.end();
    });

    return;
  }

  // show a file upload form
  res.writeHead(9000, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(9000);
