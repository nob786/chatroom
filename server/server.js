const mongoose = require("mongoose");
const { Chatroom } = require("./models/dbMessages");
const Pusher = require("pusher");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//App config
const app = express();
const port = process.env.PORT || 3001;

const pusher = new Pusher({
  appId: "1280798",
  key: "3d4f5ae8e4a5fcec9f3b",
  secret: "aa7f0324c4635a85b402",
  cluster: "mt1",
  useTLS: true,
});

// middleware
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

//db connection
mongoose
  .connect(
    "mongodb+srv://Noor:pakistan123@cluster0.mj1ib.mongodb.net/MagicMeal?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to mongo"))
  .catch((e) => console.log("Catched Error", e));

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB Connected");

  const msgCollection = db.collection("chatrooms");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("A change occured", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      // console.log("Full document message details", messageDetails);
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering pusher");
    }
  });
});

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "All is good",
  });
});
app.get("/message/sync", (req, res) => {
  Chatroom.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.post("/message/new", (req, res) => {
  const dbMessage = req.body;

  Chatroom.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
