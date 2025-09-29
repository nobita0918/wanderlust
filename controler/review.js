const listing = require("../models/listing.js");
const review = require("../models/reviews.js");

module.exports.createReview = async (req, res) => {
  let { id } = req.params;
  const rewlisting = await listing.findById(id);
  const newReview = new review(req.body.review);
  newReview.author = req.user._id;
  rewlisting.reviews.push(newReview);
  await newReview.save();
  await rewlisting.save();
  req.flash("success", "New review created");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await review.findByIdAndDelete(reviewId);
  req.flash("success", "review Deleted");
  res.redirect(`/listings/${id}`);
};
