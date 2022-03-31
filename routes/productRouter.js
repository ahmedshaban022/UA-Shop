const productCtr = require("../controllers/productCtr");

const router = require("express").Router();

router
  .route("/products")
  .get(productCtr.getProducts)
  .post(productCtr.createProduct);

router
  .route("/products/:id")
  .delete(productCtr.deleteProduct)
  .put(productCtr.updateProduct);

module.exports = router;
