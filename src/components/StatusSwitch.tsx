import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Friend } from "../models/friend.model";

interface StatusSwitchProps {
  socket: any;
}

const StatusSwitch = (props: StatusSwitchProps) => {
  const availabilityInput = useRef<any>(null);
  const [myStatus, setMyStatus] = useState<number | null>(null);
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { socket } = props;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const updateAvailability = () => {
    const checked = availabilityInput?.current.checked;
    const status = checked ? 2 : 1;
    fetch(`/api/v1/me/status`, {
      body: JSON.stringify({ status }),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        setMyStatus(status);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    const getStatus = () => {
      fetch(`/api/v1/me`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json: Friend) => {
          setMyStatus(json.status.status);
        })
        .catch((err) => {});
    };
    getStatus();
  }, []);

  return (
    <Form>
      <Form.Check
        ref={availabilityInput}
        checked={myStatus === 2}
        type="switch"
        id="custom-switch"
        label="Current Status"
        onClick={updateAvailability}
      />
    </Form>
  );
};

export default StatusSwitch;
