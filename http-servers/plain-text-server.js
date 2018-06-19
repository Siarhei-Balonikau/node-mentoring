var http = require('http');

http.createServer()
.on('request', (req, res) => {
    res.setHeader('content-type', 'text/plain');
    res.end('Hello World');
})
.listen(3000);
