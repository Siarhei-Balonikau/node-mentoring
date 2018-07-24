import express from 'express';
import parseCookies from './middlewares/parse-cookies.js';
import parseQuery from './middlewares/parse-query.js';
import authCheck from './middlewares/auth-check.js';
import router from './routes/index.js';
import routerAuth from './routes/auth.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productModel from './models/product.js';
import userModel from './models/user.js';

mongoose.connect('mongodb://localhost/mongod');

const app = express();

app.use(parseCookies);
app.use(parseQuery);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mockUsers = [
    { 'login' : 'test1', 'password' : 'zxc1' },
    { 'login' : 'test2', 'password' : 'zxc2' }
];

const mockProducts = [
    { 'name' : 'monitor', 'price' : 1000 },
    { 'name' : 'mouse', 'price' : 10 }
];

userModel.insertMany(mockUsers, function(err,r) {

})

productModel.insertMany(mockProducts, function(err,r) {

})

app.use(authCheck);
app.use('/api', router);
app.use('/auth', routerAuth);

app.get('*', (req, res) => res.send('Other pages'));

export default app;
