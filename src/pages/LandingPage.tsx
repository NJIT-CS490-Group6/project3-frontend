import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import logo from '../assets/logo.png';
import '../styles/LandingPage.css';

const LandingPage = () => {

  const goToLogin = () => {
    window.open('https://cloud.lucasantarella.com/login');
  }

  const goToRegistration = () => {
    window.open('https://cloud.lucasantarella.com/register');
  }

  return (
    <Container fluid>
      <Row className="pb-5">
        <Col xs={{offset: 2}}>
          <Image fluid src={logo} className="mt-5" />
        </Col>
        <Col className="text-center mt-5">
          <h1 className="mt-5 display-1 text-center">Hangout</h1>
          <h1 className="display-4 text-center">By Group 6</h1>
          <Button
            variant="warning"
            size="lg"
            onClick={goToLogin}
            className="mt-5 mr-5">
              Login
          </Button>
          <Button
            variant="info"
            size="lg"
            onClick={goToRegistration}
            className="mt-5">
              Register
          </Button>
        </Col>
        <Col xs={2} />
      </Row>
      <Row className="pb-5 black-container">
        <Col xs={{offset: 2}}>
          <h1 className="mt-5 display-1 text-center">What is Hangout?</h1>
        </Col>
        <Col className="text-center mt-5 about-app">
          <p>Hangout is a way for you to know when your friends are available to do something. When you&apos;re ready to hangout, the application will allow you to join a chatroom with others who are also available to hangout.</p>
        </Col>
        <Col xs={2} />
      </Row>
      <Row className="">
        <Col xs={{offset: 2}} className="text-center mt-5">
          <h4 className="mt-5 display-4">
            John Salerno
          </h4>
          <h4 className="display-4">
            Michael Barilla
          </h4>
          <h4 className="display-4">
            Shantan Reddy
          </h4>
          <h4 className="mb-5 display-4">
            Luca Santarella
          </h4>
        </Col>
        <Col className="mt-5 text-center">
          <h1 className="mt-5 display-1">
            Creators
          </h1>
        </Col>
        <Col xs={2} />
      </Row>
    </Container>
  );
}

export default LandingPage;