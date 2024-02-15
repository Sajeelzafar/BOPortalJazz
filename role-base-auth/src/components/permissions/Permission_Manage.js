import { Link } from "react-router-dom";
import Popup from "../Popup";
import { useState } from "react";
import EditRoles from "../editorComponents/EditRoles";
import EditUser from "../editorComponents/EditUser";
import "../editorComponents/EditStylings.css";
import React from "react";

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

const Permission_Manage = () => {
  const [select, setSelect] = useState(false);
  const [roles, setRoles] = useState(false);
  const handleClick = ({ target }) => {
    setSelect(true);
    if (target.className === "editRoles") {
      setRoles(true);
    }
  };
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Permission Management</Card.Title>
              <p className="card-category">You can edit roles and view details</p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <EditRoles />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Permission_Manage;
