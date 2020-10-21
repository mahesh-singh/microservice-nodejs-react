const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.urlencoded());
app.use(cors());

app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { comment } = req.body;
  const status = "pending";
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id, comment, status });
  commentsByPostId[req.params.id] = comments;

  await axios.post("http://event-bus-srv:4005/events", {
    eventType: "commentCreated",
    data: {
      id,
      comment,
      postId: req.params.id,
      status,
    },
  });

  res.send(commentsByPostId[req.params.id]);
});

app.post("/events", async (req, res) => {
  const { eventType, data } = req.body;
  if (eventType === "commentModerated") {
    const comments = commentsByPostId[data.postId];
    const comment = comments.find((comment) => {
      return comment.id === data.id;
    });

    comment.status = data.status;
    console.log("commentUpdated  generated from comment service");
    await axios.post("http://event-bus-srv:4005/events", {
      eventType: "commentUpdated",
      data: {
        id: data.id,
        comment: data.comment,
        postId: data.postId,
        status: data.status,
      },
    });
  }
  res.send({ status: "Ok" });
});

app.listen("4003", () => {
  console.log("Comments service listening to port 4003");
});
