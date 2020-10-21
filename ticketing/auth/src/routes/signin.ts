import express from "express";

const router = express.Router();

router.get("/api/users/signin", (reg, res) => {
  res.send("hi there ");
});

export { router as signinRouter };
