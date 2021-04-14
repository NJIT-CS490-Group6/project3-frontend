import FriendsList from '../components/FriendsList';
import ChatRoom from '../components/ChatRoom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={6} md={5} lg={4} xl={3}>
          <FriendsList></FriendsList>
        </Col>
        <Col xs={6} md={7} lg={8} xl={9}>
          <ChatRoom></ChatRoom>
        </Col>
      </Row>
    </Container>

  );
}

export default Dashboard;