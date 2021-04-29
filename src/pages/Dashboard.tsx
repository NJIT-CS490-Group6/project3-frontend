import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import FriendsList from "../components/FriendsList";
import ChatRoom from "../components/ChatRoom";
import ChatRoomList from "../components/ChatRoomList";
import MessageSender from "../components/MessageSender";
import { Thread } from '../models/thread.model';
import { User } from '../models/user.model';
import { Friend } from '../models/friend.model';
import { Message } from '../models/message.model';
import "../styles/Dashboard.css";

interface DashboardProps {
  socket: any;
  currentUser: User;
}

const Dashboard = (props: DashboardProps) => {
  const { socket } = props;
  const { currentUser } = props;
  const [activeChatRoom, setActiveChatRoom] = useState<Thread | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [myMessage, setMyMessage] = useState<Message | null>(null);

  const onSelectChatRoom = (thread: Thread) => {
    setActiveChatRoom(thread);
  }

  const getFriends = (friendsList: Friend[]) => {
    setFriends(friendsList);
  }

  const newMessage = (myNewMessage: Message) => {
    console.log(myMessage);
    setMyMessage(myNewMessage);
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={6} md={5} lg={4} xl={3}>
          <FriendsList socket={socket} getFriends={getFriends}/>
          <ChatRoomList onSelectChatRoom={onSelectChatRoom} friends={friends} currentUser={currentUser}/>
        </Col>
        <Col xs={6} md={7} lg={8} xl={9}>
          <ChatRoom socket={socket} activeChatRoom={activeChatRoom} currentUser={currentUser} myMessage={myMessage}/>
          {activeChatRoom && <MessageSender activeChatRoom={activeChatRoom} socket={socket} newMessage={newMessage}/>}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
