import React, { useRef } from "react";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

interface MessageSenderProps {
  socket: any;
}

const MessageSender = (props: MessageSenderProps) => {
  const messageInput = useRef<any>(null);
  const { socket } = props;

  const onSendMessage = () => {
    const messageContent = messageInput.current.value;
    if (messageContent) {
      messageInput.current.value = null;
      // What is the expected object for a sent message?
      // socket.emit("message" )
    }
  }

  return (
    <InputGroup className="my-2">
      <FormControl
        ref={messageInput}
        placeholder="Enter message here..."
        aria-label="Enter message here"
        aria-describedby="basic-addon2"
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={onSendMessage}>Send</Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default MessageSender;
