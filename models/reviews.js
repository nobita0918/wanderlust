const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reveiwSchema = new Schema({
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const review = mongoose.model("review", reveiwSchema);

module.exports = review;
