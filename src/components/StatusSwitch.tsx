import React, { useRef } from "react";
import Form from "react-bootstrap/Form";


const StatusSwitch = () => {
  const availabilityInput = useRef<any>(null);

  const checkAvailability = () => {
    console.log(availabilityInput.current.checked);
  };

  return (
  <Form>
    <Form.Check
      ref={availabilityInput}
      type="switch"
      id="custom-switch"
      label="Current Status"
      onClick={checkAvailability}
    />
  </Form>
  );
}

export default StatusSwitch;
