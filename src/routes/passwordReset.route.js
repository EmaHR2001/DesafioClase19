const express = require("express");
const { passResetView, passResetViewError, passResetEmail, tokenVerification, updatePassword } = require ('../controller/passwordReset.controller')

const { Router } = express;
const router = new Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", passResetView);
router.post("/", passResetEmail)
router.get("/:code", tokenVerification)
router.post("/update/:code", updatePassword)
router.get("*", passResetViewError);

module.exports = router;