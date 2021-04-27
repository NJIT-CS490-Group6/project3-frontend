import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import React, { useRef } from "react";

interface FriendsToolbarProps {
  clickHandler: (username: any) => void;
}

const FriendsToolbar = (props: FriendsToolbarProps) => {
  const usernameInput = useRef<any>(null);

  return (
    <InputGroup className="my-3">
      <FormControl
        ref={usernameInput}
        placeholder="Enter Friend's Username"
        aria-label="Enter Friend's Username"
        aria-describedby="basic-addon2"
      />
      <InputGroup.Append>
        <Button
          variant="outline-secondary"
          onClick={() => props.clickHandler(usernameInput)}
        >
          Add
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default FriendsToolbar;
