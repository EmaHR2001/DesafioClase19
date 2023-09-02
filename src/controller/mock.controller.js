const { generateProducts } = require('../services/mocks/products.faker');

const getMock = async (req, res) => {
    const products = generateProducts(100)
    res.send(products)
}

const getMockByCant = async (req, res) => {
    const { cant } = req.params
    const products = generateProducts(cant)
    res.send(products)
}

module.exports = {
    getMock,
    getMockByCant
}