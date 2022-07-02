import express from "express";
import mongoose from "mongoose";
import { MONGO_URI, PORT } from "./utils/secrets";
import authRoutes from "./routes/authRoutes";
import "./config/passport";



const app = express();

app.set("view engine", "ejs");

mongoose.connect(MONGO_URI, () => {
  console.log("connected to mongodb");
});

app.listen(PORT, () => {
  console.log("App listening on port: " + PORT);
});

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/auth", authRoutes);
