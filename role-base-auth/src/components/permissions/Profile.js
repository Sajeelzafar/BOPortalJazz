import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const USER_URL = "/api/user";
  const { auth } = useAuth();
  const location = useLocation();
  const lineHeight = 27; // Adjust this value based on your font size
  const minHeight = lineHeight * Math.max(2, currentUser?.permissions?.length);
  const personProfileData = location?.state?.username || {};

  function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  const fetchUserData = async () => {
    if (isEmptyObject(personProfileData)) {
      try {
        const response = await axios.post(
          USER_URL,
          JSON.stringify({ username: auth.user })
        );
        if (response) {
          setCurrentUser(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await axios.post(
          USER_URL,
          JSON.stringify({ username: personProfileData })
        );
        if (response) {
          setCurrentUser(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Profile Summary</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          defaultValue={currentUser.email}
                          disabled
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          defaultValue={currentUser.username}
                          placeholder="Username"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="5">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">Role Name</label>
                        <Form.Control
                          defaultValue={currentUser.role}
                          placeholder="Role name"
                          type="text"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Created By</label>
                        <Form.Control
                          defaultValue={currentUser.createdby}
                          type="text"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Phone Number</label>
                        <Form.Control
                          value={`0${currentUser.phoneNumber}`}
                          type="text"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Permissions</label>
                        <Form.Control
                          as="textarea"
                          style={{
                            resize: "vertical",
                            minHeight: minHeight,
                          }}
                          defaultValue={currentUser?.permissions?.join("\n")}
                          rows={Math.max(2, currentUser?.permissions?.length)}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button> */}
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
