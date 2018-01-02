import express from "express";
import API from "../../utils/api";
import { Tracker } from "../../utils/mongo";

const routes = express.Router();

 routes.get("/all", async (req, res) => {
  const trackers = "https://gist.githubusercontent.com/tonis2/6f536df0612618d44bc18e97f358b227/raw/5ec4cd7ed9e24152ee88a17a74c3074fad248545/gistfile1.json";
  const data =  await API.get(trackers);
  res.send(data);
});

routes.get("/single", (req, res) => {
  res.send("GET handler for /dogs route.");
});

routes.post("/save", (req, res) => {
  const data = req.body;
  console.log(data);
  // let newTracker = new Tracker({})
  res.send({ msg: "tracker adada"});
});

export default routes;
