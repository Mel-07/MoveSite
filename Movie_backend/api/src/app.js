const express = require('express')
const passport = require("passport");
const app = express();
const cors = require('cors')
const { v4: uuidv4 } = require("uuid");
const session = require("express-session")
const {
  getProfile,
  updateProfile,
  createUser,
  addOrRemoveBookmark,
  deleteBookmark,
  // loginUser,
  getLoginFrom,
  staticServer,
  getBookmark
} = require("./controller");
const { Strategy } = require("passport-local");
const {Users} = require('./model/users.model')
const path = require('path');
require('dotenv').config()
const {scryptSync}= require('crypto')
app.use(express.json())
const allowedOrigins = [
  "https://move-site-mel.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.options("*", cors());
app.use(
  session({
    secret: process.env.COOKIES_KEY_TWO,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
      path: "/",
      secure: false,
      sameSite:'lax'
    },
    genid: function () {
      return uuidv4();
    },
  })
);
/**
 * initialize passport
 * initialize session**/
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Strategy(
    {
      usernameField: "userName",
      passwordField:"password"
    },
    async (username, password, done) => {

      try {
        const user = await Users.findOne({
          where: { username, },
        });

        if (!user) {
          return done(null, false, {
            message: "Incorrect username.",
          });
        }

        
        const salt = user.password.split(":")?.[0];
        const hash = user.password.split(":")?.[1];
        const derivedKey = scryptSync(password,salt,64).toString('hex')
        const passWord = derivedKey === hash;

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


passport.serializeUser(function (user, done) {
  process.nextTick(function () {
    return done(null, {
      id: user.id,
      userName:user.userName
    });
  });
});

passport.deserializeUser(function (user, done) {
  process.nextTick(function () {
    return done(null, user);
  });
});

/**
 * LOGIN
 */
app.post("/", (req, res, next) => {
  passport.authenticate("local",{session:true,}, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ redirect: "/app" });
    });
  })(req, res, next);
});
app.post("/sign-in", createUser);
app.get("/", getLoginFrom);
function isAuthenticated(req, res, next) {
  console.log(req.isAuthenticated(), "check");
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({
    message: "Unauthorized",
    success: false,
  });
}
/**
 * get the folder PATH were the build front end files are **/
app.use(express.static(path.join(__dirname, "..", "Public", "dist")));
app.post("/bookmark",isAuthenticated,addOrRemoveBookmark);
app.get("/bookmarks",isAuthenticated,getBookmark);
app.get("/profile", isAuthenticated, getProfile);
app.post("/profile", isAuthenticated, updateProfile);
app.delete('/delete',isAuthenticated,deleteBookmark)
/* served files should be the last  */
app.get("/*", isAuthenticated);


module.exports =app