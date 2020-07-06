var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var fetch = require("node-fetch");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/calendar", {
  useUnifiedTopology: true,
})
  .then((client) => {
    const db = client.db("calendar");
    const calCollection = db.collection("calendar");

    app.get("/", (req, res) => {
      calCollection.find().toArray((err, result) => {
        if (err) throw err;

        // console.log(result)
        res.send(result);
      });
    });

    app.get("/:id", (req, res) => {
      let id = req.params.id;
      calCollection.find({ api_id: id }).toArray(function (err, result) {
        if (err) throw err;

        // console.log(result)
        res.send(result);
      });
    });



  })
  .catch(console.error);

// CRUDL for Event

app.post("/eventCreate", (req, res) => {
  res.send("Post working");
});

app.get("/eventRead", (req, res) => {
  res.send("Get working");
});

app.put("/eventUpdate", (req, res) => {
  res.send("Put working");
});

app.delete("/eventDelete", (req, res) => {
  res.send("Delete working");
});

app.get("/eventList", (req, res) => {
  res.send("List working");
});

// CRUDL for Person

app.post("/personCreate", (req, res) => {
  res.send("Post working");
});

app.get("/personRead", (req, res) => {
  res.send("Get working");
});

app.put("/personUpdate", (req, res) => {
  res.send("Put working");
});

app.delete("/personDelete", (req, res) => {
  res.send("Delete working");
});

app.get("/personList", (req, res) => {
  res.send("List working");
});

// CRUDL for Beach

app.post("/beachCreate", (req, res) => {
  res.send("Post working");
});

app.get("/beachRead", (req, res) => {
  res.send("Get working");
});

app.put("/beachUpdate", (req, res) => {
  res.send("Put working");
});

app.delete("/beachDelete", (req, res) => {
  res.send("Delete working");
});

app.get("/beachList", (req, res) => {
  res.send("List working");
});

module.exports = app;
