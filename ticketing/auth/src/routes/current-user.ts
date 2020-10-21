import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (reg, res) => {
  res.send("hi there ");
});

export { router as currentUserRouter };
