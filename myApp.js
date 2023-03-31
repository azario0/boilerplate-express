let express = require("express");
let app = express();

// Adding the public css for the whole page
app.use("/public", express.static(__dirname + "/public"));

let respponse = "";
console.log("Hello World!");

// responding with File
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Responding with json
app.get("/json", (req, res) => {
  //This is to work with the .env file .
  require("dotenv").config();

  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = "Hello json".toUpperCase();
  } else {
    response = "Hello json";
  }
  res.json({ message: response });
});

module.exports = app;
