const jwt = require('jsonwebtoken');
const Product = require('../models/Product');



const isProd = async (req, res, next) => {
    const token = req.headers.authorization
    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        const product = await Product.findById(decoded.productID)
        if (!product) {
            res.status(401).json([{ msg: 'unauthorized' }])
        } else {
            req.product = product
            next()
        }
    } catch (error) {
        res.status(401).json([{ msg: 'unauthorized' }])
    }
}

module.exports = isProd