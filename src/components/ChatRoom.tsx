import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Message } from "../models/message.model";
import { Thread } from "../models/thread.model";
import { Friend } from "../models/friend.model";

import "../styles/ChatRoom.css";

interface ChatRoomProps {
  activeChatRoom: Thread | null;
  socket: any;
  currentUser: Friend;
}

const ChatRoom = (props: ChatRoomProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { activeChatRoom } = props;
  const { socket } = props;
  const { currentUser } = props;

  useEffect(() => {
    socket.on(
      `/api/v1/threads/${activeChatRoom?.id}/messages`,
      (updatedMessages: Message[]) => {
        setMessages(updatedMessages);
      }
    );
  }, []);

  useEffect(() => {
    const myAbortController = new AbortController();
    const fetchMessagesHandler = async () => {
      setIsLoading(true);
      if (activeChatRoom) {
        const response = await fetch(
          `https://cloud.lucasantarella.com/api/v1/threads/${activeChatRoom?.id}/messages`,
          {
            signal: myAbortController.signal,
          }
        );
        const data = await response.json();
        setMessages(data);
      }
      setIsLoading(false);
    };

    fetchMessagesHandler();
  }, [activeChatRoom]);

  return (
    <div className="text-center">
      {activeChatRoom && (
        <Card className="chat-room-container">
          <Card.Header>
            <h3 className="display-5 text-center">
              Chat with{" "}
              {activeChatRoom.participants.map((participant, index) => {
                let result: string = "";
                if (index !== activeChatRoom.participants.length - 1) {
                  result = `${participant.username}, `;
                } else {
                  result = `and ${participant.username}`;
                }
                return result;
              })}
            </h3>
          </Card.Header>
          <Card.Body>
            {!isLoading && (
              <div>
                {messages.map((message) => {
                  if (message.from !== currentUser.id) {
                    return (
                      <div
                        key={message.seq}
                        className="d-flex justify-content-start mb-4"
                      >
                        <div className="msg_container">
                          <p>{message.from}</p>
                          <p>{message.content}</p>
                          <span className="msg_time">{message.timestamp}</span>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={message.seq}
                      className="d-flex justify-content-end mb-4"
                    >
                      <div className="msg_container_send">
                        <p>{message.from}</p>
                        <p>{message.content}</p>
                        <span className="msg_time">{message.timestamp}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {isLoading && <p>Loading Messages...</p>}
          </Card.Body>
        </Card>
      )}
      {!activeChatRoom && (
        <h3 className="no-chat-selected">No Chat Room Selected</h3>
      )}
    </div>
  );
};

export default ChatRoom;
