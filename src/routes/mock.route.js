const express = require('express')
const { isAdmin } = require("../controller/middlewares/auth.middleware");
const { getMock, getMockByCant } = require ('../controller/mock.controller')
const { Router } = express
const router = new Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get('/', getMock)
router.get("/:cant", getMockByCant);

module.exports = router