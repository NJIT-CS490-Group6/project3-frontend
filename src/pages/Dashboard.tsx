import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/Dashboard.css';
import FriendsList from '../components/FriendsList';
import ChatRoom2 from '../components/ChatRoom_2';

const Dashboard = () => (
    <Container fluid>
      <Row>
        <Col xs={6} md={5} lg={4} xl={3}>
          <FriendsList />
        </Col>
        <Col xs={6} md={7} lg={8} xl={9}>
          <ChatRoom2 />
        </Col>
      </Row>
    </Container>
);


export default Dashboard;