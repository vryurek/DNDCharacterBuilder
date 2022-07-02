import express from "express";
import mongoose from "mongoose";
import { COOKIE_KEY, MONGO_URI,PORT } from "./utils/secrets";
import authRoutes from "./routes/authRoutes";
import "./config/passport";
import cookieSession from "express-session";
import passport from "passport";

const app = express();

app.set("view engine", "ejs");

app.use(
  cookieSession({
    secret: [COOKIE_KEY],
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(MONGO_URI, () => {
  console.log("connected to mongodb");
});

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => {
  console.log("App listening on port: " + PORT);
});
