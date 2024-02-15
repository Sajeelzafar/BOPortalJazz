import React from 'react'
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import EditUser from '../editorComponents/EditUser';

const User_Management = () => {
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">User Management</Card.Title>
              <p className="card-category">You can edit users and view details</p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <EditUser />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default User_Management