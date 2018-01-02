import mongoose from "mongoose";

export const Tracker = mongoose.model("tracker", {
  trackers: Array,
  title: String,
  description: String,
  date: Date
});

mongoose.connect("mongodb://localhost/tracker");
