import React from 'react';
import Card from 'react-bootstrap/Card';

import '../styles/ChatRoom.css';

const ChatRoom = () => {
  console.log()
  return (
    <Card className="chat-room-container">
      <Card.Header>
        <h3 className="display-5 text-center">
          Chat with Mike123 and Jerry123
        </h3>
      </Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-start mb-4">
          <div className="msg_cotainer">
            Hi, how are you Mike?
            <span className="msg_time">8:40 AM, Today</span>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-4">
          <div className="msg_cotainer_send">
            Hi Jerry i am good thanks. how about you?
            <span className="msg_time_send">8:55 AM, Today</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ChatRoom;