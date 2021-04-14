import FriendsToolbar from './FriendsToolbar';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useEffect, useRef } from 'react';
import { Friend } from '../models/friend.model';

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
];

const FriendsList = () => {
  const hasFetchedData = useRef(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);



  const onClickFriend = () => {
    alert("Pull up friend profile");
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
      <FriendsToolbar></FriendsToolbar>
      {!isLoading && <ListGroup defaultActiveKey="#link1">
        {friends.map(friend => (
          <ListGroup.Item 
            action 
            onClick={onClickFriend}
            key={friend.id}>
              {friend.name}
          </ListGroup.Item>
        ))}
      </ListGroup>}
      {isLoading && <p>Loading Friends list...</p>}
    </div>
  );
}

export default FriendsList;