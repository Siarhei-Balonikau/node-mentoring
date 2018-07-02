var http = require('http');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongod');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const CitySchema = new Schema({
    id: ObjectId,
    name: String,
    country: String,
    capital: Boolean,
    location: {
        lat: Number,
        long: Number
    }
});

const CityModel = mongoose.model('City', CitySchema);

http.createServer()
.on('request', (req, res) => {
    res.setHeader('content-type', 'application/json');
    CityModel.find({}, function (err, docs) {
        const response = docs[Math.floor(Math.random() * 3)];
        res.end(JSON.stringify(response));
    });
})
.listen(3000);
