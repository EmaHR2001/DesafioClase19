import { Router } from "express";
import ProductManager from "../DAO/productsDAO.js";
import { loginVerification } from '../DAO/sessionDAO.js';
const homeRouter = Router();
const manager = new ProductManager();

homeRouter.get("/", async (req, res) => {
    try {
        let limit = req.query.limit;
        let products = await manager.getProducts();
        let user = await loginVerification(req.user.email);
        if (limit) {
            let limitedProducts = products.slice(0, limit);
            res.render("index", { products: limitedProducts, firstName: user?.first_name });
        } else {
            res.render("index", { products: products, firstName: user?.first_name });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
});

export default homeRouter;