const ProductServices = require("../dao/mongo/services/products.services");
const Service = new ProductServices();

const getAdminView = async (req, res) => {
    const data = await Service.getAllProducts();

    const products = data.map((item) => {
        return {
            title: item.title,
            description: item.description,
            price: item.price,
            thumbnail: item.thumbnail,
            code: item.code,
            stock: item.stock,
            category: item.category,
            status: true,
            _id: item._id,
        };
    });

    // Envía 'products' como contexto a la plantilla
    res.render("adminView", { products });
}

const getAdminViewError = (req, res) => {
    res.render("error404", {
        style: "error404.css",
        title: "Error 404",
    });
}

module.exports = {
    getAdminView,
    getAdminViewError
}