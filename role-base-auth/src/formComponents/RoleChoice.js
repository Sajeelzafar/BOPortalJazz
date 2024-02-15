import React from "react";
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
} from "react-bootstrap";

const RoleChoice = ({ handleChange }) => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">
                  Select if you want to make a new role or select from an
                  existing one:
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Existing Role &nbsp;&nbsp;</label>
                        <Form.Check
                          type="radio"
                          name="rolecheck"
                          value="Existing"
                          onChange={handleChange}
                          defaultChecked
                          inline
                        ></Form.Check>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>New Role &nbsp;&nbsp;</label>
                        <Form.Check
                          type="radio"
                          name="rolecheck"
                          value="New"
                          onChange={handleChange}
                          inline
                        ></Form.Check>
                      </Form.Group>
                    </Col>
                  </Row>
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

export default RoleChoice;

// <div>
//   <span>
//
//   </span>
//   <br />
//   <div className="roleselection">
//     <label>
//       <input
//
//       />
//       
//     </label>
//     <label>
//       <input
//         type="radio"
//         name="rolecheck"
//         value="New"
//         onChange={handleChange}
//       />
//       New Role
//       <br />
//     </label>
//   </div>
//   <br />
// </div>
