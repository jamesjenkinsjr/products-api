const express = require('express');
const router = express.Router();
const mockProducts = require('../mocks/products');

const Product = require('../models/product');

const productArrToObj = (arrayOfProducts) => {
    //create an accumulator object
    const accumulator = {};
    //for each product in arrayOfProducts
    arrayOfProducts.forEach(product => {
        //grab the id
        const id = product._id;
        //copy the products
        const copy = {...product};
        //delete _id from interal to product object
        delete copy._id;
        //set id value in accumulator object equal to product
        accumulator[id] = copy;
    });       
    //return accumulator
    return accumulator;
}

router.get('/products', (req, res) => {
    res.status(200).json({
        products: productArrToObj(mockProducts)
    })
});

router.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const productsObject = productArrToObj(mockProducts); //this will get deleted
    const selectedProduct = productsObject[id];
    res.status(200).json({
        products: {
            [id]: selectedProduct
        }
    })
}); 

router.post('/products', (req, res) => {
    const productObject = productArrToObj(mockProducts);
    const id = 100000000 * Math.random();
    const newProduct = {
        _id: id,
        name: 'something new',
        price: 1000,
        created: new Date(),
        imgSrc: 'https://via.placeholder.com/250x250'
    };
    mockProducts.push(newProduct);
    res.status(200).json({
        msg: 'successfully created product'
    });
});

module.exports = router; //like export default