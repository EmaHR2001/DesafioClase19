const express= require('express')
const CartView = express.Router()
const { isUser, isAdmin } = require("../controller/middlewares/auth.middleware");
const { getCartView } = require ('../controller/cart.views.controller')

CartView.use(express.json())
CartView.use(express.urlencoded({extended:true}))

CartView.get('/', isUser, getCartView)

module.exports= CartView