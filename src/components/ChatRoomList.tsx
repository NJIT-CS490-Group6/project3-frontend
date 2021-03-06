import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect, useRef } from "react";
import { Thread } from "../models/thread.model";
import { Friend } from "../models/friend.model";
// import { User } from "../models/user.model";

import "../styles/ChatRoomList.css";

interface ChatRoomListProps {
  onSelectChatRoom: (thread: Thread) => void;
  friends: Friend[];
}

const ChatRoomList = (props: ChatRoomListProps) => {
  const hasFetchedData = useRef(false);
  const participantsInput = useRef<any>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { onSelectChatRoom } = props;
  const { friends } = props;

  const onClickThread = (thread: Thread) => {
    onSelectChatRoom(thread);
  };

  const mapUsernameToID = (usernames: string[]) => {
    const result = [];
    for (let i = 0; i < usernames.length; i += 1) {
      for (let j = 0; j < friends.length; j += 1) {
        if (friends[j].username === usernames[i]) {
          result.push(friends[j].id);
          break;
        }
      }
    }
    return result;
  };

  const onCreateChatroom = () => {
    const participantsString = participantsInput?.current.value;
    if (participantsString) {
      participantsInput.current.value = null;
      const participants = mapUsernameToID(participantsString.split(" "));
      setIsLoading(true);
      fetch("/api/v1/threads", {
        body: JSON.stringify({ participants }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          setThreads([...threads, json]);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    const myAbortController = new AbortController();
    const fetchThreadsHandler = () => {
      setIsLoading(true);
      fetch("/api/v1/threads", {
        method: 'GET',
        credentials: 'include',
        signal: myAbortController.signal
      })
        .then((response) => response.json())
        .then((json) => {
          setIsLoading(false);
          setThreads(json);
        })
        .catch((err) => {
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
      <hr />
      <InputGroup className="mb-3">
        <Form.Label>
          To create a chatroom, enter the names of the particpants seperated by
          a space
        </Form.Label>
        <br />
        <FormControl
          ref={participantsInput}
          placeholder="Participants"
          aria-label="Participants"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <Button onClick={onCreateChatroom} variant="info mt-1">
        Create Chatroom
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
                  {thread.participants.map((user) => `${user.username}, `)}
                </span>
                <br />
                <span className="last-message">
                  Last Message:&nbsp;{thread.lastMessage?.content}
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
