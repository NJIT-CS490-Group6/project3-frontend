import ListGroup from "react-bootstrap/ListGroup";
import React, { useState, useEffect, useRef } from "react";
import { Thread } from '../models/thread.model';
import { Friend } from '../models/friend.model';

import "../styles/ChatRoomList.css";

const thread1Friends: Friend[] = [
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
  )
];

const thread2Friends: Friend[] = [
  new Friend(
    "f48c1eca-295d-4603-8433-bbfa64511111",
    "Alex65",
    "Alex Derry",
    {
    status: "available",
    timestamp: "2017-07-21T17:32:28Z"
    }
  ),
  new Friend(
    "f48c1eca-295d-4603-8433-bbfa645fd135",
    "Darian123",
    "Darian Puccio",
    {
    status: "available",
    timestamp: "2017-07-21T17:32:28Z"
    }
  ),
  new Friend(
    "f48c1eca-295d-4603-8433-bbfa645bvcd3",
    "Tyler999",
    "Tyler Smith",
    {
    status: "available",
    timestamp: "2017-07-21T17:32:28Z"
    }
  )
];

const allThreads: Thread[] = [
  new Thread(
    "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "f48c1eca-295d-4603-8433-bbfa645ce92a",
    "2021-04-25T19:09:35.752Z",
    "Jerry Smith",
    thread1Friends,
    {
      id: "h62c1eca-295d-4603-8433-bbfa645ca28b",
      seq: 0,
      timestamp: "2021-04-25T19:10:26.093Z",
      from: "f48c1eca-295d-4603-8433-bbfa645ce92a",
      content: "testing message"
    }
  ),
  new Thread(
    "3fa85f64-5717-4562-b3fc-2c963f66cde3",
    "f48c1eca-295d-4603-8433-bbfa64511111",
    "2021-04-25T20:32:58.415Z",
    "Alex Derry",
    thread2Friends,
    {
      id: "h62c1eca-295d-4603-8433-bbfa645fd45",
      seq: 0,
      timestamp: "2021-04-25T20:33:46.415Z",
      from: "f48c1eca-295d-4603-8433-bbfa64511111",
      content: "another test"
    }
  )
];

interface ChatRoomListProps {
  onSelectChatRoom: (thread: Thread) => void;
}

const ChatRoomList = (props: ChatRoomListProps) => {
  const hasFetchedData = useRef(false);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { onSelectChatRoom } = props;

  const onClickThread = (thread: Thread) => {
    onSelectChatRoom(thread);
  };

  useEffect(() => {
    const fetchThreadsHandler = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setThreads(allThreads);
      }, 1000);
    }
    if (!hasFetchedData.current) {
      fetchThreadsHandler();
      hasFetchedData.current = true;
    }
  }, [isLoading]);


/*
  useEffect(() => {
    const myAbortController = new AbortController();
    const fetchThreadsHandler = async () => {
      setIsLoading(true);
      const response = await fetch("https://cloud.lucasantarella.com/api/v1/threads", {
        signal: myAbortController.signal,
      });
      const data = await response.json();

      const allThreads: Thread[] = [];
      for (let i = 0; i < data.length; i += 1) {
        const thread = new Thread(
          //need work in here ****************************
          data[i].id,
          data[i].createdBy,
          data[i].created,
          data[i].name,
          data[i].participants,
          data[i].lastMessage
        );
        allThreads.push(thread);
      }
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
*/

  return (
    <div>
      {!isLoading && (
        <div className="chat-room-list-container my-3">
          <div className="heading mb-3">Open chatrooms:</div>
          <ListGroup defaultActiveKey="#link1" className="threads-list">
            {threads.map((thread) => (
              <ListGroup.Item
                action
                onClick={() => onClickThread(thread)}
                key={thread.id}
                variant="info"
              >
                <span className="particpants">
                    {thread.participants.map((user) => (
                        `${user.username}, `
                    ))}
                </span>
                <br />
                <span className="last-message">
                  Last Message:&nbsp;{thread.lastMessage.content}
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
      {isLoading && <p>Loading Chat Room list...</p>}
    </div>
  );
};

export default ChatRoomList;
