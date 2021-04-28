import React, { useState, useEffect, useRef } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import FriendsToolbar from "./FriendsToolbar";
import StatusSwitch from "./StatusSwitch";
import { Friend } from "../models/friend.model";

import "../styles/FriendsList.css";

const allFriends: Friend[] = [
  new Friend(
    "f48c1eca-295d-4603-8433-bbfa645ce92a",
    "jerry123",
    "Jerry Smith",
    {
    status: "available",
    timestamp: "2017-07-21T17:32:28Z"
    }
  ),
  new Friend(
    "f48c1eca-295d-4603-8433-bbfa645gf44a",
    "mike123",
    "Mike Low",
    {
    status: "available",
    timestamp: "2017-07-21T17:32:28Z"
    }
  ),
  new Friend(
    "f48c1eca-295d-4603-8433-bbfa64511111",
    "Alex65",
    "Alex Derry",
    {
    status: "busy",
    timestamp: "2017-07-21T17:32:28Z"
    }
  ),
  new Friend(
    "f48c1eca-295d-4603-8433-bbfa645fd135",
    "Darian123",
    "Darian Puccio",
    {
    status: "offline",
    timestamp: "2017-07-21T17:32:28Z"
    }
  ),
  new Friend(
    "f48c1eca-295d-4603-8433-bbfa645bvcd3",
    "Tyler999",
    "Tyler Smith",
    {
    status: "offline",
    timestamp: "2017-07-21T17:32:28Z"
    }
  )
];

interface FriendsListProps {
  socket: any;
}

const FriendsList = (props: FriendsListProps) => {
  const hasFetchedData = useRef(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { socket } = props;

  const onAddFriend = async (username: any) => {
    const response = await fetch(
      "https://cs490.lucasantarella.com/api/v1/friends",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username.current.value }),
      }
    );
    const data: Friend = await response.json();
    setFriends([...friends, data]);
  };

  const getVariant: any = (status: string) => {
    let result = "";
    if (status === "available") {
      result = "success";
    } else if (status === "busy") {
      result = "danger";
    } else if (status === "offline") {
      result = "dark";
    }
    return result;
  };

  useEffect(() => {
    // const myAbortController = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    const fetchFriendsHandler = () => {
      setIsLoading(true);
      timer = setTimeout(() => {
        setIsLoading(false);
        setFriends(allFriends);
      }, 1000);
    }
    // const fetchFriendsHandler = async () => {
    //   setIsLoading(true);
    //   const response = await fetch(
    //     "https://cloud.lucasantarella.com/api/v1/friends",
    //     {
    //       signal: myAbortController.signal,
    //     }
    //   );
    //   const data = await response.json();
    //   setFriends(data);
    //   setIsLoading(false);
    // };

    if (!hasFetchedData.current) {
      fetchFriendsHandler();
      hasFetchedData.current = true;
    }
    socket.on("/api/v1/status", () => {
      // Presumably get back id of updated friend and request that new friend and update in friends state
    });

    return () => {
      // myAbortController.abort();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <StatusSwitch socket={socket} />
      <FriendsToolbar clickHandler={onAddFriend} />
      <div className="heading my-3">Friends List:</div>
      {!isLoading && (
        <ListGroup defaultActiveKey="#link1" className="friends-list">
          {friends.map((friend) => (
            <ListGroup.Item
              variant={getVariant(friend.status.status)}
              key={friend.id}
            >
              {friend.username}
              <DropdownButton
                key="left"
                className="friend-options"
                drop="left"
                variant={getVariant(friend.status.status)}
                title=""
              >
                <Dropdown.Item eventKey="1">Profile</Dropdown.Item>
                <Dropdown.Item eventKey="2">Remove Friend</Dropdown.Item>
                <Dropdown.Item eventKey="3">Start Chat</Dropdown.Item>
              </DropdownButton>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {isLoading && <p>Loading Friends list...</p>}
      <div className="legend">
        <span>
          <div id="available-square" />
          Available
        </span>
        <span>
          <div id="busy-square" />
          Busy
        </span>
        <span>
          <div id="offline-square" />
          Offline
        </span>
      </div>
    </div>
  );
};

export default FriendsList;
