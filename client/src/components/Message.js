import React from "react";
import { useStateValue } from "../state/StateProvider";
import "./Message.css";

const Message = () => {
  const [{ message }, dispatch] = useStateValue();

  const messageColor = () => {
    switch (message.type) {
      case "success":
        return "green";
      case "warning":
        return "yellow";
      case "failure":
        return "red";
      default:
        return "black";
    }
  };

  const messageBox = message.text ? (
    <div className="message" style={{ borderColor: messageColor() }}>
      {message.text}
    </div>
  ) : (
    <></>
  );
  // if (message.text) {
  //   dispatch({ type: "updateMessage", message: {} });
  // }
  return messageBox;
};

export default Message;
