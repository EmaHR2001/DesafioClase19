import { Router } from "express";
import { createUser, getAll, getByEmail } from '../DAO/sessionDAO.js';
import { authMiddleware } from "../middlewares/auth.js";
const sessionRouter = Router();

sessionRouter.get('/register', (req, res) => {
    res.render('register',{})
})

sessionRouter.post('/register', async (req, res) => {
    let user = req.body;
    let userFound = await getByEmail(user.email);
    if(userFound){
        res.render('register-error', {})
    }
    let result = await createUser(user)
    console.log(result)
    res.render('login', {})
})

sessionRouter.get('/login', (req, res) => {
    res.render('login',{})
})

sessionRouter.post('/login', async (req, res) => {
    let user = req.body;
    let result = await getByEmail(user.email)
    if(result && user.password !== result.password){
        res.render('login-error',{})
    }
    console.log(result)
    req.session.user = user.email;
    res.redirect('/');
})

sessionRouter.get('/profile', authMiddleware, async (req, res) => {
    let user = await getByEmail(req.session.user);
    res.render('datos', { user })
})

sessionRouter.get('/logout', (req, res) => {
    req.session.destroy(error => {
        res.render('login')
    })
})

sessionRouter.get('/admin', authMiddleware, async (req, res) => {
    let user = await getByEmail(req.session.user);
    if (user.role === "admin") {
        res.render('admin-view', {});
    } else {
        res.redirect('/');
    }
})

export default sessionRouter;