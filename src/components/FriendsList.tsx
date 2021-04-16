import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect, useRef } from 'react';
import { Friend } from '../models/friend.model';
import FriendsToolbar from './FriendsToolbar';

import '../styles/FriendsList.css';

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
  ),
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
  ),
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
  ),
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
  ),
];

const FriendsList = () => {
  const hasFetchedData = useRef(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);



  const onClickFriend = () => {
    alert("Pull up friend profile");
  }

  const onAddFriend = (username: any) => {
    alert(`Send Friend Request to , ${username.current.value}`);
  }

  const getVariant: any = (status: string) => {
    let result = '';
    if (status === 'available') {
      result = 'success';
    } else if (status === 'busy') {
      result = 'danger';
    } else if (status === 'offline') {
      result = 'dark';
    }
    return result;
  } 
  
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const fetchFriendsHandler = () => {
      setIsLoading(true);
      timer = setTimeout(() => {
        setIsLoading(false);
        setFriends(allFriends);
      }, 1000);
    }
    if (!hasFetchedData.current) {
      fetchFriendsHandler();
      hasFetchedData.current = true;
    }
    return () => {
      clearTimeout(timer)
    }
  }, []);

  return (
    <div>
      <FriendsToolbar clickHandler={onAddFriend} />
      <div className="legend">
        <span><div id="available-square" />Available</span>
        <span><div id="busy-square" />Busy</span>
        <span><div id="offline-square" />Offline</span>
      </div>
      {!isLoading && <ListGroup defaultActiveKey="#link1" className="friends-list">
        {friends.map(friend => (
          <ListGroup.Item 
            action 
            variant={getVariant(friend.status.status)}
            onClick={onClickFriend}
            key={friend.id}>
              {friend.username}
          </ListGroup.Item>
        ))}
      </ListGroup>}
      {isLoading && <p>Loading Friends list...</p>}
    </div>
  );
}

export default FriendsList;