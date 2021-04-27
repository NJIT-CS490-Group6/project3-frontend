import ListGroup from "react-bootstrap/ListGroup";
import React, { useState, useEffect, useRef } from "react";
import { Friend } from "../models/friend.model";
import FriendsToolbar from "./FriendsToolbar";
import StatusSwitch from "./StatusSwitch";

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

const FriendsList = () => {
  const hasFetchedData = useRef(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClickFriend = () => {
    alert("Pull up friend profile");
  };

  const onAddFriend = async (username: any) => {
    const response = await fetch(
      "https://cloud.lucasantarella.com/api/v1/friends",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
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

  const mapStatus = (statusCode: number) => {
    let status = "";
    switch (statusCode) {
      case 0:
        status = "available";
        break;
      case 1:
        status = "busy";
        break;
      case 2:
        status = "offline";
        break;
      default:
        break;
    }
    return status;
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

    //   const allFriends = [];
    //   for (let i = 0; i < data.length; i += 1) {
    //     const status = mapStatus(data[i].status);
    //     const friend = new Friend(
    //       data[i].id,
    //       data[i].username,
    //       `${data[i].first_name} ${data[i].last_name}`,
    //       { status, timestamp: data[i].created_at }
    //     );
    //     allFriends.push(friend);
    //   }
    //   setFriends(allFriends);
    //   setIsLoading(false);
    // };

    if (!hasFetchedData.current) {
      fetchFriendsHandler();
      hasFetchedData.current = true;
    }

    return () => {
      // myAbortController.abort();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <StatusSwitch />
      <FriendsToolbar clickHandler={onAddFriend} />
      <div className="heading my-3">Friends List:</div>
      {!isLoading && (
        <ListGroup defaultActiveKey="#link1" className="friends-list">
          {friends.map((friend) => (
            <ListGroup.Item
              action
              variant={getVariant(friend.status.status)}
              onClick={onClickFriend}
              key={friend.id}
            >
              {friend.username}
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
