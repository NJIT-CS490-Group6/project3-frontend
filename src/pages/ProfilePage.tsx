import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

import { Friend } from "../models/friend.model";

import "../styles/ProfilePage.css";

interface ProfileRouteParams {
  id: string;
}

const emptyFriendObject = new Friend("", "", "", {
  status: 0,
  timestamp: "",
});

const ProfilePage = () => {
  const { id } = useParams<ProfileRouteParams>();
  // under the assumption that our own id is known, for now ill write this as...
  // ...a get friend request to the api

  const hasFetchedData = useRef(false);
  const [profileInfo, setProfileInfo] = useState<Friend>(emptyFriendObject);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getVariant: any = (status: number) => {
    let result = "";
    if (status === 2) {
      result = "success";
    } else if (status === 1) {
      result = "danger";
    } else if (status === 0) {
      result = "dark";
    }
    return result;
  };

  useEffect(() => {
    const myAbortController = new AbortController();
    const fetchInfoHandler = () => {
      setIsLoading(true);
      fetch(`https://cs490.lucasantarella.com/api/v1/friends/${id}`, {
        method: "GET",
        credentials: "include",
        signal: myAbortController.signal,
      })
        .then((response) => response.json())
        .then((json) => {
          setIsLoading(false);
          setProfileInfo(json);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    };

    if (!hasFetchedData.current) {
      fetchInfoHandler();
      hasFetchedData.current = true;
    }

    return () => {
      myAbortController.abort();
    };
  }, []);

  return (
    <Container fluid>
      {!isLoading && (
        <div>
          <Row>
            <Col>
              <InputGroup className="my-3">
                <Form.Label>Username</Form.Label>
                <FormControl value={profileInfo.username} />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup className="my-3">
                <Form.Label>Name</Form.Label>
                <FormControl value={profileInfo.name} />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup className="my-3">
                <Form.Label>ID</Form.Label>
                <FormControl value={profileInfo.id} />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup className="my-3">
                <Form.Label>Current Status</Form.Label>
                <FormControl
                  className={`profile-${getVariant(profileInfo.status.status)}`}
                  value={profileInfo.status.status}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup className="my-3">
                <Form.Label>Last time status changed</Form.Label>
                <FormControl value={profileInfo.status.timestamp} />
              </InputGroup>
            </Col>
          </Row>
        </div>
      )}
      {isLoading && (
        <Row>
          <Col>
            <p>Loading Profile...</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProfilePage;
