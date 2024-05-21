var express = require('express');
var router = express.Router();

router.get('/', require('./../controllers/productController').getAllProduct);
router.get('/:id', require('./../controllers/productController').getOneProduct);
router.put('/', require('./../controllers/productController').updateProduct);
router.delete('/:id', require('./../controllers/productController').deleteProduct);
router.post('/', require('./../controllers/productController').createProduct);

module.exports = router;