import React, { Fragment, useState } from "react";
import axios from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const Username = ({ validateUser, handleSubmitUser }) => {
  const [username, setUsername] = useState("");
  const USER_URL = "/api/user";

  const handleChange = ({ target }) => {
    setUsername(target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(USER_URL, JSON.stringify({ username }));
      if (response) {
        setUsername("");
        handleSubmitUser(response.data);
      }
    } catch (err) {
      toast("User not found");
      console.log(err);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4"></Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="8">
                      <Form.Group>
                        <label>
                          Enter username
                        </label>
                        <Form.Control
                          type="text"
                          name="username"
                          value={username}
                          onChange={handleChange}
                          disabled={validateUser}
                          placeholder="Username"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <br />
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={handleSubmit}
                  >
                    Verify if user exists
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Username;
