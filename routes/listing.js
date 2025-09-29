const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utlis/asyncWrap.js");
const { isLoggedIn, isOwner, validatelisting } = require("../middleware.js");
const listingController = require("../controler/listing.js");
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

//index route and create route
router
  .route("/")
  .get(asyncWrap(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validatelisting,
    asyncWrap(listingController.createListing)
  );
//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//show,update,delete
router
  .route("/:id")
  .get(asyncWrap(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validatelisting,
    asyncWrap(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, asyncWrap(listingController.destroyListing));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  asyncWrap(listingController.renderEditForm)
);

module.exports = router;
