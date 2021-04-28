import ListGroup from "react-bootstrap/ListGroup";
import React, { useState, useEffect, useRef } from "react";
import { Friend } from "../models/friend.model";
import FriendsToolbar from "./FriendsToolbar";
import StatusSwitch from "./StatusSwitch";

import "../styles/FriendsList.css";

interface FriendsListProps {
  socket: any;
}

const FriendsList = (props: FriendsListProps) => {
  const hasFetchedData = useRef(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { socket } = props;

  const onClickFriend = () => {
    alert("Pull up friend profile");
  };

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
    const myAbortController = new AbortController();
    const fetchFriendsHandler = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://cs490.lucasantarella.com/api/v1/friends",
        {
          signal: myAbortController.signal,
        }
      );
      const data = await response.json();
      setFriends(data);
      setIsLoading(false);
    };

    if (!hasFetchedData.current) {
      fetchFriendsHandler();
      hasFetchedData.current = true;
    }
    socket.on("/api/v1/status", () => {
      // Presumably get back id of updated friend and request that new friend and update in friends state
    });

    return () => {
      myAbortController.abort();
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
