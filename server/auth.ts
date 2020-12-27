import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {User} from "./schemas";
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
