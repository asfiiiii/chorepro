const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session"); // for cookies and FLash
const flash = require("connect-flash");
const passport = require("passport"); // for authentication
const localStrategy = require("passport-local");
const expressErrors = require("./utilties/ExpressErrors");
const user = require("./models/user");

// routes
const indexRoutes = require("./routes/tasks.js");
const userRoutes = require("./routes/user.js");
const revRoutes = require("./routes/reviews");

const { ConnectDB } = require("./connect_db"); //MongoDb connectivity
ConnectDB();

// App uses
const app = express();
const http = require('http').createServer(app)
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); //for receiving data from HTML fomrs
app.use(express.static("public"));
app.use(methodOverride("_method")); // overriding help us in deleting and patching requests

const config = {
  //session making stuff hehe:)

  secret: " secrethehe",
  resave: false,
  saveUninitialized: true,

  cookie: {
    expires: Date.now + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};

app.use(session(config));
app.use(flash());

app.use(passport.initialize()); // for auth
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(
  (
    req,
    res,
    next // these are the global variables
  ) => {
    res.locals.loggedUser = req.user; // this showss the current user
    res.locals.success = req.flash("success");
    res.locals.err = req.flash("err"); //Flash messages
    res.locals.del = req.flash("del");

    next();
  }
);



app.use("/", indexRoutes);
app.use("/", userRoutes);
app.use("/home/:id/reviews", revRoutes);


app.all("*", (req, res, next) => {
  next(new expressErrors(" Page Not Found ", 404));
});

//error handling middleware
app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) {
    err.message = "something went wrong";
  }
  res.status(status).
   render("errorTemplate.ejs", { err });
});

//Listning Port

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
