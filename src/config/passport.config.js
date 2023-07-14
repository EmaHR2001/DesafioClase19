import passport from "passport";
import GithubStrategy from 'passport-github2'
import local from "passport-local"
import { createUser, getAll, getByEmail, getById } from '../DAO/sessionDAO.js';
import { createHash, isValidPassword } from "../utils/index.js"

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            try {
                let user = req.body;
                let userFound = await getByEmail(user.email);
                if (userFound) {
                    return done(null, false)
                }
                user.password = createHash(user.password)
                let result = await createUser(user)
                console.log(result)
                return done(null, result)
            } catch (error) {
                return done('Error al registrar: ' + error)
            }
        }
    ));

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        let result = await getByEmail(username)
        console.log(result)
        if (!username || !isValidPassword(result, password)) {
            return done(null, false)
        }
        delete result.password;
        return done(null, result)
    }))

    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.5a597d7f2ad5851a',
        callbackURL: 'https://localhost:8080/api/session/githubcallback',
        clientSecret: 'a3d7b685cae33ecd592ddef645500c832826cbee',
        scope: 'user:email'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
            let userEmail = profileEmails[0].value
            let user = await getByEmail(userEmail)
            if (!user) {
                let newUser = {
                    first_name: profile._json.login,
                    last_name: "",
                    email: userEmail,
                    password: "",
                    age: 20,
                    role: "usuario"
                }
                let result = await createUser(newUser);
                done(null, result)
            } else {
                done(null, user)
            }
        } catch {
            done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done) => {
        let user = await getById(id);
        done(null, user);
    })
}

export default initializePassport;