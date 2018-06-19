import express from 'express';
import controllers from './../controllers/index.js';

const router = express.Router();

router.get('/products', controllers.getAllProducts)
    .get('/products/:id', controllers.getSingleProduct)
    .get('/products/:id/reviews', controllers.getReviewsForProduct)
    .post('/products', controllers.addNewProduct)
    .get('/users', controllers.getUsers)

module.exports = router;
