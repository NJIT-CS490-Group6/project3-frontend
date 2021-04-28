import ListGroup from "react-bootstrap/ListGroup";
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
    const fetchThreadsHandler = async () => {
      setIsLoading(true);
      const response = await fetch("https://cloud.lucasantarella.com/api/v1/threads", {
        signal: myAbortController.signal,
      });
      const data = await response.json();

      setThreads(data);
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
