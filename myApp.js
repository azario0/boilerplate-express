let express = require("express");
let app = express();

// To get the post methodes requests
let bodyParser = require("body-parser");






app.use(function (req, res, next) {
  let string = `${req.method} ${req.path} - ${req.ip}`;
  console.log(string);

  next();
});

// To decode the POST method
// To not encode the data that we would treat on a post methode
app.use(bodyParser.urlencoded({extended: false}));


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

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time,
    });
  }
);

// http://localhost:3000/azar/echo
app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word,
  });
});

//   http://localhost:3000/name?first=hello&last=world
app.get("/name", function (req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  // OR you can destructure and rename the keys
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`,
  });
});


// To read the POST after not being encoded .
app.post("/name", function(req, res) {
    // Handle the data in the request
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
  });

module.exports = app;
