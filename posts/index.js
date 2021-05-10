const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const all_post = {};

app.get("/post", (req, res) => {
  //return all blog post
  res.status(200).send(all_post);
});

app.post("/post", async (req, res) => {
  // make a post to blog
  const id = randomBytes(8).toString("hex");
  const { title } = req.body;

  all_post[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:4005/events", {
    type: "postCreated",
    data: { id, title },
  });

  res.status(201).send(all_post[id]);
});

app.post("/events", async (req, res) => {
  const event_data = req.body;
  console.log(event_data);
});

app.listen(4000, () => console.log("app is listening on port 4000"));
