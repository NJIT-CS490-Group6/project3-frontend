import React, { useRef } from "react";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import { Thread } from "../models/thread.model";
import { Message } from "../models/message.model";

interface MessageSenderProps {
  socket: any;
  activeChatRoom: Thread | null;
  newMessage: (myMessage: Message) => void;
}

const MessageSender = (props: MessageSenderProps) => {
  const messageInput = useRef<any>(null);
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { socket } = props;
  /* eslint-enable @typescript-eslint/no-unused-vars */
  const { newMessage } = props;
  const { activeChatRoom } = props;

  const onSendMessage = () => {
    const content = messageInput.current.value;
    if (content) {
      messageInput.current.value = null;
      fetch(`/api/v1/threads/${activeChatRoom?.id}/messages`, {
        body: JSON.stringify({ content }),
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((json) => {
          newMessage(json);
        })
        .catch((err) => {});
    }
  };

  return (
    <InputGroup className="my-2">
      <FormControl
        ref={messageInput}
        placeholder="Enter message here..."
        aria-label="Enter message here"
        aria-describedby="basic-addon2"
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={onSendMessage}>
          Send
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default MessageSender;
