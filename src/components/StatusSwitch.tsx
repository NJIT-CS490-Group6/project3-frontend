import { Socket } from "dgram";
import React, { useRef } from "react";
import Form from "react-bootstrap/Form";

interface StatusSwitchProps {
  socket: any;
}

const StatusSwitch = (props: StatusSwitchProps) => {
  const availabilityInput = useRef<any>(null);
  const { socket } = props;

  const updateAvailability = () => {
    // emit update status event that passes user id and updated status
    // socket.emit('update status', )
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
};

export default StatusSwitch;
