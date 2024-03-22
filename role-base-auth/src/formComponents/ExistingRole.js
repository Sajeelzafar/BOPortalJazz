import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
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
  Form,
  OverlayTrigger,
  Tooltip,
  Modal,
} from "react-bootstrap";
import Popup from "../components/Popup";
const GETALLROLES = "/api/roles";

const ExistingRole = ({ updateUserDatabase, user }) => {
  const [roles, setRoles] = useState([]);
  const [roleValue, setRoleValue] = useState(null);
  const [roleAssign, setRoleAssign] = useState(false);
  const [ permissionWindow, setPermissionWindow ] = useState(false);
  const [roleSelected, setRoleSelected] = useState({});

  const handleSubmitUser = (e) => {
    setRoleAssign(true);
    toast("Role Successfully Changed");
    e.preventDefault();
    const userData = {
      role_id: roleValue,
      username: user,
    };
    updateUserDatabase(userData);
  };

  const handleChange = ({ target }) => {
    setRoleAssign(false);
    setRoleValue(target.value);
  };
  useEffect(() => {
    axios
      .get(GETALLROLES)
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handlePermissionClick = (roleDetails) => {
    setRoleSelected(roleDetails);
    setPermissionWindow(true);
  }

  return (
    <>
      <p
        id="uidnote"
        className={
          roleValue !== null && roleAssign ? "instructions" : "offscreen"
        }
      ></p>
      <Col md="6">
        <Card className="card-tasks">
          <Card.Header>
            <Card.Title as="h4">Existing Rolenames</Card.Title>
            <p className="card-category">Select any 1</p>
          </Card.Header>
          <Card.Body>
            <div className="table-full-width">
              <Table>
                <tbody>
                  {roles?.map((role) => {
                    return (
                      <tr key={uuidv4()}>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                type="radio"
                                name="rolecheck"
                                value={role.id}
                                onChange={handleChange}
                                style={{
                                  border: "1px solid #ced4da",
                                  boxShadow: '0 0 0 2px #ced4da',
                                  borderRadius: "3px",
                                }}
                              ></Form.Check.Input>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>{role.role}</td>
                        <td>
                          <Button type="button" variant="primary" onClick={() => handlePermissionClick({ role: role.role, permissions: role.permissions })}>
                            View Permissions
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Card.Body>
          <Card.Footer>
            <hr></hr>
            <Button
              type="button"
              onClick={handleSubmitUser}
              disabled={roleValue === null || roleAssign}
            >
              Assign the role to {user}
            </Button>
            <hr />
            <div className="stats">
              <i className="now-ui-icons loader_refresh spin"></i>
              Updated 3 minutes ago
            </div>
          </Card.Footer>
        </Card>
      </Col>
      <ToastContainer />
      <Popup show={permissionWindow} onHide={() => setPermissionWindow(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {roleSelected?.role}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {roleSelected?.permissions?.map((permission) => (
            <p key={uuidv4()}>{permission}</p>
          ))}
          <span>
            Click outside the inner box to navigate back to the roles page
          </span>
        </Modal.Body>
      </Popup>
    </>
  );
};

export default ExistingRole;

// <div>
//

//
// </div>
