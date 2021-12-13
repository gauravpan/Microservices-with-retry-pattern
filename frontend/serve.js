var http = require('http'),
    fileSystem = require('fs'),
    path = require('path');

http.createServer(function (request, response) {
    var filePath = path.join(__dirname, 'index.html');
    var stat = fileSystem.statSync(filePath);

    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': stat.size
    });

    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(response);
})
    .listen(3000, () => {
        console.log('listening on port:', 3000)
    });