import express from "express";

const router = express.Router();

router.get("/api/users/signout", (reg, res) => {
  res.send("hi there ");
});

export { router as signoutRouter };
