
const UserServices = require("../dao/mongo/services/users.services");
const logger = require('../config/logger.config');
const Service = new UserServices();

const sessionGetRegister = (req, res) => {
  res.status(200).render("register", {
    style: "register.css",
    title: "Register",
  });
}
const sessionPostRegister = (req, res) => {
  if (!req.user) {
    return res.json({ error: "something went wrong" });
  }
  req.session.user = {
    _id: req.user._id,
    email: req.user.email,
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    rol: req.user.rol,
    cart: req.user.cart._id
  };
  logger.debug(req.session.user)
  return res.redirect("/products");
}
const sessionGetLogin = (req, res) => {
  res.status(200).render("login", {
    style: "login.css",
    title: "Login",
  });
}
const sessionPostLogin = (req, res) => {
  if (!req.user) {
    return res.json({ error: "invalid credentials" });
  }
  req.session.user = {
    _id: req.user._id,
    email: req.user.email,
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    rol: req.user.rol,
    cart: req.user.cart._id
  };
  return res.redirect("/session/profile");
}
const sessionGetProfile = (req, res) => {
  let session = req.session.user
  let rol = req.session.user.rol
  logger.debug(req.session.user)
  const data = {
    title: 'Profile',
    style: 'profile.css',
    data: session
  }
  data[rol] = session
  res.render('profile', data)
}
const sessionGetLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) res.send("Failed Logout");
    return res.redirect("/session/login");
  });
}
const sessionGetFailedRegister = (req, res) => {
  res.send("failed user registration");
}
const sessionGetError = (req, res) => {
  res.render('error404', {
    style: 'error404.css',
    title: 'Error 404'
  })
}


module.exports = {
  sessionGetRegister,
  sessionPostRegister,
  sessionGetLogin,
  sessionPostLogin,
  sessionGetProfile,
  sessionGetLogout,
  sessionGetFailedRegister,
  sessionGetError
};