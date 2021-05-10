const express = require("express");
const axios = require("axios");

const app = express();

//setup app middleware
app.use(express.json());

app.post("/events", async (req, res) => {
  // get the data sent
  let { type, data } = req.body;

  //one way of doing it
  // const checker = data.content.split(" ");
  // if (checker.includes("orange")) {
  //   data = { ...data, status: "rejected" };
  // } else {
  //   data = { ...data, status: "approved" };
  // }
  console.log({ type, data });

  // a better way
  if (type === "commentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    data = { ...data, status };

    //send the update to the event bus
    await axios.post("http://localhost:4005/events", {
      type: "commentModerated",
      data,
    });

    // console.log({ type, data });
  }
  res.send({});
});

app.listen(4003, () => console.log("app listening on port 4003"));
