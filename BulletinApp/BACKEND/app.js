const express = require("express");
const app = express();
const urlprefix = "/api";

const mongoose = require("mongoose");
const fs = require("fs");
const cert = fs.readFileSync("keys/certificate.pem");
const options = {
  server: { sslCA: cert },
};
const connstring =
  "mongodb+srv://ST10116273:test1234@cluster0.gqroxea.mongodb.net/?retryWrites=true&w=majority";

const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

mongoose
  .connect(connstring)
  .then(() => {
    console.log("Connected :-");
  })
  .catch(() => {
    console.log("NOT connected :-(");
  }, options);

app.use(express.json());

app.use((reg, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use(urlprefix + "/post", postRoutes);
app.use(urlprefix + "/users", userRoutes);

module.exports = app;
