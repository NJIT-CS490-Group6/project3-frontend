import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/Dashboard.css";
import FriendsList from "../components/FriendsList";
import ChatRoom from "../components/ChatRoom";
import ChatRoomList from "../components/ChatRoomList";
import MessageSender from "../components/MessageSender";

const Dashboard = () => (
  <Container fluid>
    <Row>
      <Col xs={6} md={5} lg={4} xl={3}>
        <FriendsList />
        <ChatRoomList />
      </Col>
      <Col xs={6} md={7} lg={8} xl={9}>
        <ChatRoom />
        <MessageSender />
      </Col>
    </Row>
  </Container>
);

export default Dashboard;
