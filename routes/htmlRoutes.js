var auth = require("../controllers/auth.js");

module.exports = function (app, passport) {
  app.get("/signup", auth.signup);

  app.get("/signin", auth.signin);

  app.post(
    "/signup.html",
    passport.authenticate("local-signup", {
      successRedirect: "/",
      failureRedirect: "/signup"
    })
  );
  
  app.post(
    "/signin.html",
    passport.authenticate("local-signin", {
      successRedirect: "/",
      failureRedirect: "/signin"
    })
  );
}