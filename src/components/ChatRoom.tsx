import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Message } from '../models/message.model';
import { Thread } from '../models/thread.model';
import { User } from '../models/user.model';

import "../styles/ChatRoom.css";

interface ChatRoomProps {
  activeChatRoom: Thread | null;
  socket: any;
  currentUser: User;
  myMessage: Message | null;
}

const ChatRoom = (props: ChatRoomProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { activeChatRoom } = props;
  const { socket } = props;
  const { currentUser } = props;
  const { myMessage } = props;

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
    socket.on(`/api/v1/threads/${activeChatRoom?.id}/messages`, (updatedMessages: Message[]) => {
      setMessages(updatedMessages);
    });
  }, [])

  useEffect(() => {
    if (myMessage) {
      setMessages([...messages, myMessage]);
    }
  }, [myMessage])

  useEffect(() => {
    const myAbortController = new AbortController();
    const fetchMessagesHandler = () => {
      if (activeChatRoom) {
        setIsLoading(true);
        fetch(`https://cs490.lucasantarella.com/api/v1/threads/${activeChatRoom?.id}/messages`, {
          method: 'GET',
          credentials: 'include',
          signal: myAbortController.signal
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            setIsLoading(false);
            setMessages(json);
          }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        });
      }
      setIsLoading(false);
    };

    fetchMessagesHandler();
  }, [activeChatRoom]);
    
  return (
    <div className="text-center">
      {activeChatRoom && 
        <Card className="chat-room-container">
          <Card.Header>
            <h3 className="display-5 text-center">
              Chat with {activeChatRoom.participants.map((participant, index) => {
                let result: string = '';
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
            {!isLoading && 
              <div>
                {messages.map(message => {
                  if (message.from !== currentUser.uid) {
                    return (
                      <div key={message.seq} className="d-flex justify-content-start mb-4">
                        <div className="msg_container">
                          <p>{messageSenderName(message.from)}</p>
                          <p>{message.content}</p>
                          <span className="msg_time">{message.timestamp}</span>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={message.seq} className="d-flex justify-content-end mb-4">
                      <div className="msg_container_send">
                        <p>{messageSenderName(message.from)}</p>
                        <p>{message.content}</p>
                        <span className="msg_time">{message.timestamp}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            }
            {isLoading && <p>Loading Messages...</p>}
          </Card.Body>
        </Card>
      }
      {!activeChatRoom && 
        <h3 className="no-chat-selected">No Chat Room Selected</h3>
      }
      
    </div>
  );
};

export default ChatRoom;
