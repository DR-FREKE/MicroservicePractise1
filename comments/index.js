const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/post/:id/comment", (req, res) => {
  // return all comments for a particular post
  res.status(200).send(commentsByPostId[req.params.id] || []);
});

app.post("/post/:id/comment", async (req, res) => {
  // add a comment to a post
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  /*look in the commentsByPostId to get all comment related to
  the postId from the endpoint req.params, if found return it else return empty arraay
  **/

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ commentId, content, status: "pending" });
  commentsByPostId[req.params.id] = comments;

  // send comment data to the event broker on port 4005
  await axios.post("http://localhost:4005/events", {
    type: "commentCreated",
    data: { commentId, content, post_id: req.params.id, status: "pending" },
  });

  res.status(201).send(comments[comments.length - 1]);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type == "commentModerated") {
    // get the data that matches with the id and change the status
    const { post_id, commentId, content, status } = data;
    const comments = commentsByPostId[post_id];
    const comment = comments.find((comment) => comment.commentId == commentId);
    comment.status = status;
    // send the moderated data back to event broker
    await axios.post("http://localhost:4005/events", {
      type: "commentUpdated",
      data: { post_id, content, commentId, status },
    });
  }

  res.send({});
});

app.listen(4001, () => console.log("app listening on port 4001"));
