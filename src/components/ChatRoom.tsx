import React from "react";
import Card from "react-bootstrap/Card";
import { Thread } from '../models/thread.model';

import "../styles/ChatRoom.css";

interface ChatRoomProps {
  activeChatRoom: Thread | null;
}

const ChatRoom = (props: ChatRoomProps) => {
  const { activeChatRoom } = props;
  
  console.log(activeChatRoom);

  /*
  
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
    
    */
  return (
    <div className="text-center">
      {activeChatRoom && 
        <Card className="chat-room-container">
          <Card.Header>
            <h3 className="display-5 text-center">
              Chat with {activeChatRoom.participants.map((participant, index) => {
                let result: string = '';
                if (index !== activeChatRoom.participants.length - 1) {
                  result = `${participant.name}, `;
                } else {
                  result = `and ${participant.name}`;
                }
                return result;
              })}
            </h3>
          </Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-start mb-4">
              <div className="msg_container">
                Hi, how are you Mike?
                <span className="msg_time">8:40 AM, Today</span>
              </div>
            </div>
            <div className="d-flex justify-content-end mb-4">
              <div className="msg_container_send">
                Hi Jerry I am good thanks. how about you?
                <span className="msg_time_send">8:55 AM, Today</span>
              </div>
            </div>
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
