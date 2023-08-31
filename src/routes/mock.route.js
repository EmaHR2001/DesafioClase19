const express = require('express')
const { isAdmin } = require("../controller/middlewares/auth.middleware");
const { getMock } = require ('../controller/mock.controller')
const { Router } = express
const router = new Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get('/', getMock)

module.exports = router