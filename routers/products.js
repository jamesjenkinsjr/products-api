const express = require('express');
const router = express.Router();
const mockProducts = require('../mocks/products');

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

module.exports = router; //like export default