import React from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const MessageSender = () => {
  console.log();
  return (
    <InputGroup className="my-2">
      <FormControl
        placeholder="Enter message here..."
        aria-label="Enter message here"
        aria-describedby="basic-addon2"
      />
      <InputGroup.Append>
        <Button variant="outline-secondary">Send</Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default MessageSender;
