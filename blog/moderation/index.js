const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { eventType, data } = req.body;
  console.log({ eventType, data });
  if (eventType === "commentCreated") {
    const status = data.comment.includes("orange") ? "rejected" : "approve";

    await axios.post("http://event-bus-srv:4005/events", {
      eventType: "commentModerated",
      data: { ...data, status },
    });
  }

  res.send({});
});

app.listen(4006, () => {
  console.log("Moderation service is running on 4006");
});
