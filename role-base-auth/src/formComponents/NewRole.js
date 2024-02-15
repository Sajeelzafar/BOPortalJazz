import React, { useState } from "react";
import axios from "../api/axios";
import {
  Button,
  Card,
  Col,
  Form,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";
const ROLE_URL = "./api/role";

const NewRole = ({
  handleChange,
  permissions,
  handleChangeRoleCreation,
  handleSubmit,
  rolename,
  updateUser,
  targetUser,
  roleAssign,
}) => {
  const [validateRole, setValidateRole] = useState(true);

  const handleBlur = async ({ target }) => {
    try {
      const role = target.value;
      const response = await axios.post(ROLE_URL, JSON.stringify({ role }), {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.status === 404) {
        setValidateRole(false);
      } else {
        setValidateRole(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Col md="6">
        <Card className="card-tasks">
          <Card.Header>
            <p
              className={validateRole ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              Role name is already taken
            </p>
          </Card.Header>
          <Card.Body>
            <Form.Group>
              <label>Rolename:</label>
              <Form.Control
                type="text"
                name="rolename"
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={rolename}
                placeholder="Role name"
              ></Form.Control>
            </Form.Group>
            <br />
            <div className="table-full-width">
              <Table>
                <tbody>
                  {Object.entries(permissions).map(
                    ([permission, isChecked]) => (
                      <tr key={permission}>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                name={permission}
                                checked={isChecked}
                                onChange={handleChange}
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>{permission}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
          <Card.Footer>
            <hr></hr>
            <span>
              <strong>
                Select if you want to make a new role only or also want to
                assign it to selected user:
              </strong>
              <br />
              <label style={{ fontSize: "16px" }}>
                <input
                  type="radio"
                  name="rolecreation"
                  value="roleOnly"
                  onChange={handleChangeRoleCreation}
                  defaultChecked
                />
                &nbsp;&nbsp;&nbsp;Create Role Only
              </label>
              <br />
              <label style={{ fontSize: "16px" }}>
                <input
                  type="radio"
                  name="rolecreation"
                  value="roleAndAssign"
                  onChange={handleChangeRoleCreation}
                />
                &nbsp;&nbsp;&nbsp;Create Role and Assign
                <br />
              </label>
              <br />
            </span>
          </Card.Footer>
        </Card>
        {updateUser ? (
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={validateRole || roleAssign}
          >
            Create Role and Assign {targetUser.username}
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={validateRole || roleAssign}
          >
            Create Role Only
          </Button>
        )}
        <br />
        <br />
      </Col>
    </>
  );
};

export default NewRole;

// <div>
//   <label>
//
//     <input

//     />
//   </label>
//   <br />

// </div>

//
//   <div key={permission}>
//     <label>
//       :
//       <input
//         type="checkbox"

//       />
//     </label>
//   </div>
// ))}
// <div>

// </div>
