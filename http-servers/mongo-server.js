var http = require('http');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'mongod';

const findDocuments = function(db, callback) {
    const collection = db.collection('cities');

    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        const data = docs[Math.floor(Math.random() * 3)];
        callback(data);
    });
}

http.createServer()
.on('request', (req, res) => {
    res.setHeader('content-type', 'application/json');
    MongoClient.connect(url, function(err, client) {
      assert.equal(null, err);
      console.log("Connected correctly to server");

      const db = client.db(dbName);

      findDocuments(db, function(data) {
        client.close();
        res.end(JSON.stringify(data));
      });
    });
})
.listen(3000);
