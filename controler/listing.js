const listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  let allListings = await listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let showlist = await listing
    .findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!showlist) {
    req.flash("error", "listing doesnot exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { showlist });
};

module.exports.createListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  req.flash("success", "New listing created");
  await newListing.save();
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let editlisting = await listing.findById(id);
  if (!editlisting) {
    req.flash("error", "listing doesnot exist");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { editlisting });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  const Listing = await listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    Listing.image = { url, filename };
    await Listing.save();
  }
  req.flash("success", "Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await listing.findByIdAndDelete(id);
  req.flash("success", "listing deleted");
  res.redirect("/listings");
};
