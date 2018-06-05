var http = require('http');
var fs = require("fs");
var filename = "./index.html";


http.createServer()
.on('request', (req, res) => {
    req.pipe(res);
})
.listen(3000);
