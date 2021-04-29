import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Friend } from '../models/friend.model';

interface StatusSwitchProps {
  socket: any;
}

const StatusSwitch = (props: StatusSwitchProps) => {
  const availabilityInput = useRef<any>(null);
  const [myself, setMyself] = useState<Friend | null>(null);
  const { socket } = props;

  const updateAvailability = () => {
    const checked = availabilityInput?.current.checked;
    const status = checked ? 2 : 1;
    fetch(`https://cs490.lucasantarella.com/api/v1/me/status`, {
      body: JSON.stringify({ status }),
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      }).catch((err) => {
        console.log(err);
    });
  };

  const getStatus = () => {
    fetch(`https://cs490.lucasantarella.com/api/v1/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((json: Friend) => {
        setMyself(json);
      }).catch((err) => {
        console.log(err);
    });
  }

  return (
    <Form>
      <Form.Check
        ref={availabilityInput}
        checked={myself?.status.status === 2}
        type="switch"
        id="custom-switch"
        label="Current Status"
        onClick={updateAvailability}
      />
    </Form>
  );
}

export default StatusSwitch;
