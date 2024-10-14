const express = require('express')
const passport = require("passport");
const app = express();
const cors = require('cors')
const cookieSession = require("cookie-session")
const {
  getProfile,
  updateProfile,
  createUser,
  addOrRemoveBookmark,
  loginUser,
  getLoginFrom,
  staticServer
} = require("./controller");
const LocalStrategy = require("passport-local").Strategy;
const {Users} = require('./model/users.model')
const path = require('path');
require('dotenv').config()


app.use(express.json())
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIES_KEY_ONE, process.env.COOKIES_KEY_ONE],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
/**
 * initialize passport
 * initialize session**/
app.use(passport.initialize());
app.use(passport.session())

passport.use(
  new LocalStrategy(
    {
      usernameField: "userName",
      passwordField: "password",
    },
    async (userName, password, done) => {
      try {
        const user = await Users.findOne({
          where: { userName, },
        });

        if (!user) {
          return done(null, false, {
            message: "Incorrect username.",
          });
        }
        const passWord = user.password === password
        if(!passWord){
            return done(null,false,{
                message:"Incorrect password."
            })
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

app.use(function (req,_, next) {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (done) => {
      done();
    };
  }
  if (req.session && !req.session.save) {
    req.session.save = (done) => {
      done();
    };
  }
  next();
});
passport.serializeUser(function (user, done) {
  process.nextTick(function () {
    return done(null, {
      id: user.id,
      username: user.userName,
    });
  });
});

passport.deserializeUser(function (user, done) {
  process.nextTick(function () {
    return done(null, user);
  });
});
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
 res.redirect('/');
}
/**
 * get the folder PATH were the build front end files are **/
app.use(express.static(path.join(__dirname, "..", "Public", "dist")));

app.get("/app/*", isAuthenticated, staticServer);
app.post("app/bookmark", isAuthenticated, addOrRemoveBookmark);
app.get("/title", isAuthenticated, staticServer);
app.get("/top-rated", isAuthenticated, staticServer);
app.get("/", getLoginFrom);
app.post("/",passport.authenticate("local", { failureRedirect: "/",
  successRedirect:"/app"
 }),
);
app.post("/sign-in", createUser);
app.get('/profile',isAuthenticated,getProfile)
app.post("/profile",isAuthenticated, updateProfile);


module.exports =app