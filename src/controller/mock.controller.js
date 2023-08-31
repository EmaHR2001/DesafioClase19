const { generateProducts } = require('../services/mocks/products.faker');

const getMock = async (req, res) => {
    let products = generateProducts(100)
    res.send(products)
}

module.exports = {
    getMock
}