import FriendsList from '../components/FriendsList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <Container>
      <Row>
        <Col>
          <FriendsList></FriendsList>
        </Col>
      </Row>
    </Container>

  );
}

export default Dashboard;