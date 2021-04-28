import ListGroup from "react-bootstrap/ListGroup";
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";
import { Thread } from '../models/thread.model';

import "../styles/ChatRoomList.css";

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
    const myAbortController = new AbortController();
    const fetchThreadsHandler = () => {
      setIsLoading(true);
      fetch("https://cs490.lucasantarella.com/api/v1/threads", {
        method: 'GET',
        credentials: 'include',
        signal: myAbortController.signal
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setIsLoading(false);
          // setThreads(data);
        }).catch((err) => {
          console.log(err);
          setIsLoading(false);
      });
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
      <Button variant="info mt-3">
        <NavLink to="/create-chat" id="create-chatroom">
          Create Chatroom
        </NavLink>
      </Button>
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
