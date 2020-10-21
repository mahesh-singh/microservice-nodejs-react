const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { eventType, data } = req.body;

  if (eventType === "postCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (eventType === "commentCreated") {
    const { id, comment, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, comment, status });
  }
  if (eventType === "commentUpdated") {
    console.log("data  --- ", data);
    console.log("post  --- ", posts);
    const { id, comment, postId, status } = data;
    const post = posts[postId];
    const commentToBeUpdated = post.comments.find((comment) => {
      return comment.id === id;
    });
    commentToBeUpdated.status = status;
    commentToBeUpdated.comment = comment;
  }

  res.send({ status: "Ok" });
});

app.listen("4004", () => {
  console.log("Query service listening on 4004");
});
