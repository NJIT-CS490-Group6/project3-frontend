import ListGroup from "react-bootstrap/ListGroup";
import React, { useState, useEffect, useRef } from "react";
import { Thread } from '../models/thread.model';

const ChatRoomList = () => {
  const hasFetchedData = useRef(false);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClickThread = () => {
    alert("Pull up this Chat Room");
  };

  useEffect(() => {
    const myAbortController = new AbortController();
    const fetchThreadsHandler = async () => {
      setIsLoading(true);
      const response = await fetch("https://cloud.lucasantarella.com/api/v1/threads", {
        signal: myAbortController.signal,
      });
      const data = await response.json();

      const allThreads: Thread[] = [];
      // for (let i = 0; i < data.length; i += 1) {
      //   const status = mapStatus(data[i].status);
      //   const friend = new Friend(
      //     data[i].id,
      //     data[i].username,
      //     `${data[i].first_name} ${data[i].last_name}`,
      //     { status, timestamp: data[i].created_at }
      //   );
      //   allFriends.push(friend);
      // }
      setThreads(allThreads);
      setIsLoading(false);
    };

    if (!hasFetchedData.current) {
      fetchThreadsHandler();
      hasFetchedData.current = true;
    }

    return () => {
      myAbortController.abort();
    };
  }, []);

  return (
    <div>
      {!isLoading && (
        <ListGroup defaultActiveKey="#link1" className="threads-list">
          {threads.map((thread) => (
            <ListGroup.Item
              action
              onClick={onClickThread}
              key={thread.id}
            >
              {thread.participants[0].username}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {isLoading && <p>Loading Chat Room list...</p>}
    </div>
  );
};

export default ChatRoomList;
