const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;
  console.log(event);
  console.log("Posted event to post");
  await axios.post("http://posts-clusterip-srv:4002/events", event);

  console.log("Posted event to comment");
  await axios.post("http://comments-srv:4003/events", event);
  console.log("Posted event to query");
  await axios.post("http://query-srv:4004/events", event);
  console.log("Posted event to moderator");
  await axios.post("http://moderation-srv:4006/events", event);

  res.status({ status: "Ok" });
});

app.listen("4005", () => {
  console.log("event bus is running on localhost:4005");
});
