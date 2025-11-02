import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Backend running" });
});

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});

export default app;
