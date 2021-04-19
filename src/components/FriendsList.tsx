import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect, useRef } from 'react';
import { Friend } from '../models/friend.model';
import FriendsToolbar from './FriendsToolbar';

import '../styles/FriendsList.css';

const FriendsList = () => {
  const hasFetchedData = useRef(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClickFriend = () => {
    alert("Pull up friend profile");
  }

  const onAddFriend = async (username: any) => {
    const response = await fetch('http://localhost:3000/api/v1/friends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({username})
    })
    const data = await response.json();
    console.log(data);
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

  const mapStatus = (statusCode: number) => {
    let status = '';
    switch(statusCode) {
      case 0:
        status = 'available';
        break;
      case 1:
        status = 'busy';
        break;
      case 2:
        status = 'offline'
        break;
      default:
        break;
    }
    return status;
  }
  
  useEffect(() => {
    const myAbortController = new AbortController();
    const fetchFriendsHandler = async () => {
      setIsLoading(true);
      const response = await fetch(
        'http://localhost:3000/api/v1/friends', 
        { signal: myAbortController.signal }
      );
      const data = await response.json();

      const allFriends = [];
      for (let i = 0; i < data.length; i += 1) {
        const status = mapStatus(data[i].status)
        const friend = new Friend(
          data[i].id,
          data[i].username,
          `${data[i].first_name} ${data[i].last_name}`,
          {status, timestamp: data[i].created_at},
        )
        allFriends.push(friend);
      }
      setFriends(allFriends)
      setIsLoading(false);
    }

    if (!hasFetchedData.current) {
      fetchFriendsHandler();
      hasFetchedData.current = true;
    }

    return () => {
      myAbortController.abort();
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