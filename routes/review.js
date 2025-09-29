const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utlis/asyncWrap.js");
const {
  validatereview,
  isLoggedIn,
  isreviewAuthor,
} = require("../middleware.js");
const reviewController = require("../controler/review.js");

//post route
router.post(
  "/",
  isLoggedIn,
  validatereview,
  asyncWrap(reviewController.createReview)
);

//reviews delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isreviewAuthor,
  asyncWrap(reviewController.destroyReview)
);
module.exports = router;
