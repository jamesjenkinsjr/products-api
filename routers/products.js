const express = require("express");
const router = express.Router();
const mockProducts = require("../mocks/products");

const Product = require("../models/product");

const productArrToObj = arrayOfProducts => {
  //create an accumulator object
  const accumulator = {};
  //for each product in arrayOfProducts
  arrayOfProducts.forEach(product => {
    //grab the id
    const id = product._id;
    //copy the products
    const copy = { ...product._doc };
    //delete _id from interal to product object
    delete copy._id;
    //set id value in accumulator object equal to product
    accumulator[id] = copy;
  });
  //return accumulator
  return accumulator;
};

router.get("/products", (req, res, next) => {
  Product.find()
    .exec()
    .then(allProducts => {
      //throw new Error('something gone bad'); //Force errors to test for issues
      res.status(200).json({
        products: productArrToObj(allProducts)
      });
    })
    .catch(next);
});

router.get("/products/:id", (req, res, next) => {
  const { id } = req.params;
  Product.findById(id)
    .exec()
    .then(selectedProduct => {
        const selectedID = selectedProduct._id;
        const copy = {...selectedProduct._doc};
        res.status(200)
        .json({
            products: {
            [selectedProduct._id]: selectedProduct
            }
        })
    })
      .catch(next);
});

router.post("/products", (req, res, next) => {
  if(!req.body.name){
    next({msg: "bad request"})
  }
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    imgSrc: req.body.imgSrc
  });
  const x = product
    .save()
    .then(response => {
      res.status(200).json({
        msg: "successfully created product"
      });
    })
    .catch(next);
});

//update (PUT)
router.put('/products/:id', (req, res, next) => {
    const { id } = req.params;
    const update = {
        name: "updated name"
    };
    Product.findByIdAndUpdate(id, update)
        .then(response => {
            res.status(200).json({
                msg: "Plopped the pieces of info into the part sought"
            });
        })
        .catch(next);
});
//delete (DELETE)
router.delete('/products/:id', (req, res, next) => {
    const { id } = req.params;
    Product.findByIdAndRemove(id)
        .then(response => {
            res.status(200).json({
                msg: "You have irreparably removed the record - righto!"
            })
        })
        .catch(next);
});

module.exports = router; //like export default
