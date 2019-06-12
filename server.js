var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var friends = require("./app/data/friends.js");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.text());
app.use(
  bodyParser.json({
    type: "application/vnd.api+json"
  })
);

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "./app/public")));

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
