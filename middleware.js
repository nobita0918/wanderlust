const listing = require("./models/listing.js");
const review = require("./models/reviews.js");
const { listingschema, reviewschema } = require("./schema.js");
const ExpressError = require("./utlis/expressError.js");

// listing server side validation
module.exports.validatelisting = (req, res, next) => {
  let result = listingschema.validate(req.body);
  if (result.error) {
    throw new ExpressError(404, result.error);
  } else {
    next();
  }
};

// review server side validation
module.exports.validatereview = (req, res, next) => {
  let result = reviewschema.validate(req.body);
  if (result.error) {
    throw new ExpressError(404, result.error);
  } else {
    next();
  }
};

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to create lisitngs");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let checklisting = await listing.findById(id);
  if (!checklisting.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "you are not the owner of listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.isreviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let checkReview = await review.findById(reviewId);
  if (!checkReview.author.equals(res.locals.currUser._id)) {
    req.flash("error", "you are not the author of review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
