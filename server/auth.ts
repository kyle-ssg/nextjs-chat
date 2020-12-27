import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {User} from "./schemas";
console.log("CREATING MIDDLEWARE")
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
