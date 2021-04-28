import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import FriendsList from "../components/FriendsList";
import ChatRoom from "../components/ChatRoom";
import ChatRoomList from "../components/ChatRoomList";
import MessageSender from "../components/MessageSender";
import { Thread } from '../models/thread.model';
import { Friend } from '../models/friend.model';
import "../styles/Dashboard.css";

interface DashboardProps {
  socket: any;
  currentUser: Friend;
}

const Dashboard = (props: DashboardProps) => {
  const { socket } = props;
  const { currentUser } = props;
  const [activeChatRoom, setActiveChatRoom] = useState<Thread | null>(null);

  const onSelectChatRoom = (thread: Thread) => {
    setActiveChatRoom(thread);
  }


  return (
    <Container fluid>
      <Row>
        <Col xs={6} md={5} lg={4} xl={3}>
          <FriendsList socket={socket}/>
          <ChatRoomList onSelectChatRoom={onSelectChatRoom} />
        </Col>
        <Col xs={6} md={7} lg={8} xl={9}>
          <ChatRoom socket={socket} activeChatRoom={activeChatRoom} currentUser={currentUser} />
          {activeChatRoom && <MessageSender />}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
