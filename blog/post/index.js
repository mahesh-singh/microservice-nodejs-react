const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.urlencoded());
app.use(cors());

app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };

  await axios.post("http://event-bus-srv:4005/events", {
    eventType: "postCreated",
    data: {
      id,
      title,
    },
  });
  res.send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("events received", req.body);
  res.send({ status: "Ok" });
});

app.listen("4002", () => {
  console.log("v55");
  console.log("blog post server listening on 4002");
});
