const product = require('./../models').product;

const createProduct = async function (req, res) {
  let err, details;
  console.log("req.....................:", req);
  [err, details] = await to(product.create(req?.body));
  if (err) return ReE(res, { Error: err.message }, 422);
  return ReS(res, { productDetails: details }, 200);
}
module.exports.createProduct = createProduct;

const updateProduct = async function (req, res) {
  let err, updateProduct;
  [err, updateProduct] = await to(product.update(req.body, { where: { id: req?.query?.id } }));
  if (err) return ReE(res, { Error: err.message, updateStatus: false }, 422);
  return ReS(res, { updateStatus: true }, 200);
}
module.exports.updateProduct = updateProduct;

const deleteProduct = async function (req, res) {
  let err, deleteStatus;
  [err, deleteStatus] = await to(product.update({ isDeleted: true }, { where: { id: req?.params?.id } }));
  if (err) return ReE(res, { Error: err.message, deleteStatus: false }, 422);
  return ReS(res, { deleteStatus: true }, 200);
}
module.exports.deleteProduct = deleteProduct;

const getOneProduct = async function (req, res) {
  let err, productDetails;
  [err, productDetails] = await to(product.findOne({ where: { id: req?.params?.id } }));
  if (err) return ReE(res, { Error: err.message }, 422);
  return ReS(res, { productDetails: productDetails }, 200);
}
module.exports.getOneProduct = getOneProduct;

const getAllProduct = async function (req, res) {
  let err, success;
  [err, success] = await to(product.findAndCountAll({ where: { isDeleted: false } }));
  if (err) return ReE(res, { Error: err.message }, 422);
  return ReS(res, { productList: success }, 200);
}
module.exports.getAllProduct = getAllProduct;