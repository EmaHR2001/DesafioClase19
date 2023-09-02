const express = require("express");
const { getAdminView, getAdminViewError } = require ('../controller/admins.view.controller')
const { isAdmin } = require("../controller/middlewares/auth.middleware");
const { Router } = express
const router = new Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get("/", isAdmin, getAdminView);
router.get("*", getAdminViewError);

module.exports = router;