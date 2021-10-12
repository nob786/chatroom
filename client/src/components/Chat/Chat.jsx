import React from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import MoreVert from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFile from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
const Chat = ({ messages }) => {
  messages.map((msg) => {
    console.log(msg.message);
    console.log(msg.name);
    console.log(msg.timestamp);
  });
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__haederInfo">
          <h3>Room Name</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <AttachFile />
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => {
          <p
            className={`chat__message && ${
              message.received && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>;
        })}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            // value={input}
            // onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type your message ..."
          />
          <button type="submit">Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
