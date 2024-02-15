import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
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
} from "react-bootstrap";
const GETALLROLES = "/api/roles";

const ExistingRole = ({ updateUserDatabase, user }) => {
  const [roles, setRoles] = useState([]);
  const [roleValue, setRoleValue] = useState(null);
  const [roleAssign, setRoleAssign] = useState(false);

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
                      <tr>
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
                          <Button type="button" variant="primary">
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
    </>
  );
};

export default ExistingRole;

// <div>
//

//
// </div>
