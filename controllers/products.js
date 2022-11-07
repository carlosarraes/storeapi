const Product = require('../models/products')

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({})
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  const { featured, name, company } = req.query
  const queryObject = {}
  if (featured) queryObject.featured = featured === 'true'
  if (company) queryObject.company = company
  if (name) queryObject.name = { $regex: name, $options: 'i' }
  console.log(queryObject)
  const products = await Product.find(queryObject)
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
  getAllProductsStatic,
  getAllProducts
}
