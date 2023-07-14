import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import passport from "passport";

const sessionRouter = Router();

sessionRouter.get('/register', (req, res) => {
    res.render('register',{})
})

sessionRouter.post('/register', passport.authenticate('register', {failureRedirect: '/api/session/failregister'}), async (req, res) => {
    res.render('login', {})
})

sessionRouter.get('/failregister', async (req, res) => {
    res.render('register-error',{})
})

sessionRouter.get('/login', (req, res) => {
    res.render('login',{})
})

sessionRouter.post('/login', passport.authenticate('login', {failureRedirect: '/api/session/faillogin'}), async (req, res) => {
    if(!req.user) return res.render('login-error', {})
    res.redirect('/');
})

sessionRouter.get('faillogin', (req, res) => {
    res.render('login-error', {})
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

sessionRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}), async (req, res) => {})

sessionRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }, async (req, res) => {
    req.sessions.user = req.user;
    res.redirect('/');
}))

export default sessionRouter;