import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Message } from "../models/message.model";
import { Thread } from "../models/thread.model";
import { Friend } from "../models/friend.model";

import "../styles/ChatRoom.css";


const allMessages: Message[] = [
  new Message(
    "f48c1eca-295d-4603-8433-bbfa647653",
    0,
    "2017-07-21T17:32:28Z",
    "f48c1eca-295d-4603-8433-bbfa641234",
    "Hey Jerry, how are you doing?"
  ),
  new Message(
    "f48c1eca-295d-4603-8433-bbfa641245",
    1,
    "2017-07-22T17:32:28Z",
    "f48c1eca-295d-4603-8433-bbfa645ce92a",
    "Hey Mike! I'm good, how are you doing?"
  ),
  new Message(
    "f48c1eca-295d-4603-8433-bbfa649876",
    2,
    "2017-07-23T17:32:28Z",
    "f48c1eca-295d-4603-8433-bbfa641234",
    "Great, wanna hangout?"
  ),
  new Message(
    "f48c1eca-295d-4603-8433-bbfa641111",
    3,
    "2017-07-24T17:32:28Z",
    "f48c1eca-295d-4603-8433-bbfa645ce92a",
    "Yup"
  )
];

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

  const messageSenderName: any = (userID: string) => {
    let result = "test";
    if( activeChatRoom != null){
      for (let i=0; i < activeChatRoom.participants.length; i+=1){
        if (activeChatRoom.participants[i].id === userID){
          result = activeChatRoom.participants[i].username;
        }
      }
    }
    return result;
  };

  useEffect(() => {
    socket.on(
      `/api/v1/threads/${activeChatRoom?.id}/messages`,
      (updatedMessages: Message[]) => {
        setMessages(updatedMessages);
      }
    );
  }, []);

  useEffect(() => {
    // const myAbortController = new AbortController();
    const fetchMessagesHandler = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setMessages(allMessages);
      }, 1000);
    }
    // const fetchMessagesHandler = async () => {
    //   setIsLoading(true);
    //   const response = await fetch(
    //     `https://cloud.lucasantarella.com/api/v1/threads/${activeChatRoom.id}/messages`,
    //     {
    //       signal: myAbortController.signal,
    //     }
    //   );
    //   const data = await response.json();
    //   setMessages(data);
    //   setIsLoading(false);
    // };

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
                          <p>{messageSenderName(message.from)}</p>
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
                        <p>{messageSenderName(message.from)}</p>
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
