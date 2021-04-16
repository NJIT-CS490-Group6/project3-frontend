import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../styles/ChatRoom.css';

const ChatRoom2 = () => {

  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState<{body: string, id: any}[]>([]);
  const [message, setMessage] = useState("");

  const socketRef = useRef(io());

  useEffect(() => {
  
    // socketRef.current = io.connect('/');

    socketRef.current.on("your id", id => {
      setYourID(id);
    })

    socketRef.current.on("message", (msg: any) => {
      console.log("here");
      receivedMessage(msg);
    })
  }, []);

    function receivedMessage(msg: any) {
      setMessages(oldMsgs => [...oldMsgs, msg]);
    }

    function sendMessage(e: any) {
      e.preventDefault();
      const messageObject = {
        body: message,
        id: yourID,
      };
      setMessage("");
      socketRef.current.emit("send message", messageObject);
      setMessages(oldMsgs => [...oldMsgs, messageObject]);
    }

    function handleChange(e: any) {
      setMessage(e.target.value);
    }

    /*
    return (
      <Page>
        <Container>
          {messages.map((msg, index) => {
            if (msg.id === yourID) {
              return (
                <div key={index} style={{ textAlign: "right" }}>
                  <div style={{ textAlign: "right" }}>
                    {msg.body}
                  </div>
                </div>
              )
            }
            return (
              <div key={index} style={{ textAlign: "left" }}>
                <div style={{ textAlign: "left" }}>
                  {msg.body}
                </div>
              </div>
            )
          })}
        </Container>
        <Form onSubmit={sendMessage}>
          <textarea value={message} onChange={handleChange} placeholder="Say something..." />
          <Button onClick={sendMessage}>Send</Button>
        </Form>
      </Page>
    );
    */

    return (
      <div>
        <Card>
          <Card.Header>
            <h3 className="display-5 text-center">
              Chat with Mike123 and Jerry123
            </h3>
          </Card.Header>
          <Card.Body>
            {messages.map((msg, index) => {
                if (msg.id === yourID) {
                  return (
                    <div className="d-flex justify-content-end mb-4">
                    <div className="msg_cotainer_send">
                      {msg.body}
                      <span className="msg_time_send">8:55 AM, Today</span>
                    </div>
                  </div>
                  );
                }
                return (
                  <div className="d-flex justify-content-start mb-4">
                  <div className="msg_cotainer">
                    {msg.body};
                    <span className="msg_time">8:40 AM, Today</span>
                  </div>
                </div>
                );
              })}
          </Card.Body>
        </Card>
        <Form onSubmit={sendMessage}>
          <textarea value={message} onChange={handleChange} placeholder="Say something..." />
          <Button onClick={sendMessage}>Send</Button>
        </Form>
      </div>
    );

}
export default ChatRoom2;