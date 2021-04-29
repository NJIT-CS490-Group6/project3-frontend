import { Socket } from 'dgram';
import React, { useRef } from "react";
import Form from "react-bootstrap/Form";

interface StatusSwitchProps {
  socket: any;
}

const StatusSwitch = (props: StatusSwitchProps) => {
  const availabilityInput = useRef<any>(null);
  const { socket } = props;

  const updateAvailability = () => {
    console.log(availabilityInput.current);
    let status = availabilityInput.current.value;
    status = status === 1 ? 2 : 1;
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

  return (
  <Form>
    <Form.Check
      ref={availabilityInput}
      type="switch"
      id="custom-switch"
      label="Current Status"
      onClick={updateAvailability}
    />
  </Form>
  );
}

export default StatusSwitch;
