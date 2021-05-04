import ListGroup from "react-bootstrap/ListGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';

import { Friend } from "../models/friend.model";
import FriendsToolbar from "./FriendsToolbar";
import StatusSwitch from "./StatusSwitch";

import "../styles/FriendsList.css";

interface FriendsListProps {
  socket: any;
  getFriends: (friendsList: Friend[]) => void;
}

const FriendsList = (props: FriendsListProps) => {
  const hasFetchedData = useRef(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { socket } = props;
  const { getFriends } = props;

  const onAddFriend = (username: any) => {
    fetch("https://cs490.lucasantarella.com/api/v1/friends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username.current.value }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        setFriends([...friends, json]);
      })
      .catch((err) => {
      });
  };

  const getVariant: any = (status: number) => {
    let result = "";
    if (status === 2) {
      result = "success";
    } else if (status === 1) {
      result = "danger";
    } else if (status === 0) {
      result = "dark";
    }
    return result;
  };

  useEffect(() => {
    const myAbortController = new AbortController();
    const fetchFriendsHandler = () => {
      setIsLoading(true);
      fetch("https://cs490.lucasantarella.com/api/v1/friends", {
        method: "GET",
        credentials: "include",
        signal: myAbortController.signal,
      })
        .then((response) => response.json())
        .then((json) => {
          setIsLoading(false);
          setFriends(json);
          getFriends(json);
        })
        .catch((err) => {
          setIsLoading(false);
        });
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
                <Dropdown.Item eventKey="1"><Link to={`/profile/${friend.id}`}>Profile</Link></Dropdown.Item>
                <Dropdown.Item eventKey="2">Remove Friend</Dropdown.Item>
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
