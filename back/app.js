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
var mongo = require("mongodb");

MongoClient.connect("mongodb://127.0.0.1:27017/calendar", {
  useUnifiedTopology: true,
})
  .then((client) => {
    const db = client.db("calendar");
    const db_pers = client.db("person");
    const db_event = client.db("event");

    const calCollection = db.collection("calendar");
    const persCollection = db_pers.collection("person");
    const eventCollection = db_event.collection("event");

    // Beach Queries
    app.get("/ListBeaches/", (req, res) => {
      calCollection.find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);
      });
    });

    app.get("/ReadBeach/:id", (req, res) => {
      let id = req.params.id;
      calCollection.find({ api_id: id }).toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    });

    // CRUDL Event
    app.post("/eventCreate/", (req, res) => {
      let newEvent = req.body;
      console.log(newEvent);
      if (
        newEvent.title &&
        newEvent.date &&
        newEvent.people &&
        newEvent.beach
      ) {
        eventCollection.insertOne(newEvent, (err, result) => {
          if (err) throw err;
          res.send(result);
        });
      }
    });

    app.get("/eventRead/", (req, res) => {
      res.send("Get working");
    });

    app.put("/eventUpdate/", (req, res) => {
      res.send("Put working");
    });

    app.delete("/eventDelete/", (req, res) => {
      // console.log(req.body.id)
      eventCollection.deleteOne(
        { _id: new mongo.ObjectId(req.body.id) },
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    });

    app.get("/eventList/", (req, res) => {
      eventCollection.find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);
      });
    });

    // CRUDL Person
    app.post("/personCreate/", (req, res) => {
      let newPerson = req.body;
      console.log(newPerson);
      if (newPerson.first_name && newPerson.last_name && newPerson.email) {
        persCollection.insertOne(newPerson, (err, result) => {
          if (err) throw err;
          res.send(result);
        });
      }
    });

    app.put("/personUpdate/", (req, res) => {
      res.send("Put working");
    });

    app.delete("/personDelete/", (req, res) => {
      // console.log(req.body.id);
      persCollection.deleteOne(
        { _id: new mongo.ObjectId(req.body.id) },
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    });

    app.get("/personList/", (req, res) => {
      persCollection.find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);
      });
    });
  })
  .catch(console.error);

module.exports = app;
