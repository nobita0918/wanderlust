const mongoose = require("mongoose");
const initdata = require("./data.js");
const listing = require("../models/listing.js");
const review = require("../models/reviews.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main()
  .then((res) => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

const initdb = async () => {
  await listing.deleteMany({});
  await review.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "68d5faea5c5c417de37c0927",
  }));
  await listing.insertMany(initdata.data);
  console.log("saved");
};

initdb();
