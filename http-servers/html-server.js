var http = require('http');
var fs = require("fs");
var filename = "./index.html";

http.createServer()
.on('request', (req, res) => {
    res.setHeader('content-type', 'text/html');
    fs.createReadStream(filename).pipe(res);
})
.listen(3000);
