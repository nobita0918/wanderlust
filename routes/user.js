const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utlis/asyncWrap.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controler/user.js");

router
  .route("/signup")
  .get(userController.signupForm)
  .post(asyncWrap(userController.signUp));

router
  .route("/login")
  .get(userController.loginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    asyncWrap(userController.login)
  );

router.get("/logout", userController.logout);

module.exports = router;
