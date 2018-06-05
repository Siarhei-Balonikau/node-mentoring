var http = require('http');

var product = {
   id: 1,
   name: 'Supreme T-Shirt',
   brand: 'Supreme',
   price: 99.99,
   options: [
       { color: 'blue' },
       { size: 'XL' }
   ]
};

http.createServer()
.on('request', (req, res) => {
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(product));
})
.listen(3000);
