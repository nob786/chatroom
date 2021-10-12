const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});
const Chatroom = mongoose.model("Chatroom", chatroomSchema);

exports.Chatroom = Chatroom;
