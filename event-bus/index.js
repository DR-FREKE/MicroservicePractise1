const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const all_events = [];

app.get("/events", (req, res) => {
  res.send(all_events);
});

app.post("/events", async (req, res) => {
  const data = req.body;

  try {
    all_events.push(data);
    console.log(data);
    await axios.post("http://posts-cluster-srv:3060/events", data); // for post service
    await axios.post("http://comments-srv:6000/events", data); // for comment service
    await axios.post("http://query-srv:8200/events", data); // for query service
    await axios.post("http://moderation-srv:7000/events", data); // for moderation service
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }

  //   await axios.post("http://localhost:4003", data)
});

app.listen(4005, () => {
  console.log("app started at 4005");
});
