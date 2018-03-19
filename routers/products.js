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

router.get("/products", (req, res) => {
  Product.find()
    .exec()
    .then(allProducts => {
      res.status(200).json({
        products: productArrToObj(allProducts)
      });
    })
    .catch(err => {
      res.status(500).json({
        msg: "Woes bro -- shiz iz broke"
      });
    });
});

router.get("/products/:id", (req, res) => {
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
      .catch(err => {
        res.status(500).json({
          msg: "Woes bro -- shiz iz broke -- getByID"
        });
      });
});

router.post("/products", (req, res) => {
  const product = new Product({
    name: "something new",
    price: 1000,
    imgSrc: "https://via.placeholder.com/250x250"
  });
  const x = product
    .save()
    .then(response => {
      res.status(200).json({
        msg: "successfully created product"
      });
    })
    .catch(err => {
      res.status(500).json({
        msg: "Your stuff done broek."
      });
    });
});

//update (PUT)
router.put('/products/:id', (req, res) => {
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
        .catch(err => {
            res.status(500).json({
                msg: "Please put proper care into parts of your code"
            });
        });
});
//delete (DELETE)
router.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    Product.findByIdAndRemove(id)
        .then(response => {
            res.status(200).json({
                msg: "You have irreparably removed the record - righto!"
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: "You have failed in your attempt to remove the record - R.I.P."
            })
        });
});

module.exports = router; //like export default
