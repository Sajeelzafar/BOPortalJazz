import React, { useEffect, useRef, useState } from "react";
import axios from "../../api/axios";
import Popup from "../Popup";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import EditPermissionPopUp from "./EditPermissionPopUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, Table } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

const GETALLROLES = "/api/roles";
const EDIT_ROLE_PERMISSIONS = "/api/editrolepermissions";
const DELETE_ROLE = "/api/deleterole";
const GET_DEPENDENCIES = "/api/getdependency";
const AUDIT_LOGS = "/api/auditlogs";

const EditRoles = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [roles, setRoles] = useState(null);
  const [permissionWindow, setPermissionWindow] = useState(false);
  const [roleSelected, setRoleSelected] = useState(null);
  const wrapperRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [editRole, setEditRole] = useState(false);
  const [editPermissions, setEditPermissions] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const editablecontentRef = useRef(null);
  const [isEditable, setIsEditable] = useState(false);
  // const [popupWindow, setPopupWindow] = useState(false);
  const [deleteWindow, setDeleteWindow] = useState(false);
  const [dependencyWindow, setDependencyWindow] = useState(false);
  const [dependentUsers, setDependentUsers] = useState([]);

  // Create refs for each td element
  const tdRefs = useRef([]);

  const getAllRoles = async () => {
    await axios
      .get(GETALLROLES)
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        // setPopupWindow(false);
        setPermissionWindow(false);
        setDependencyWindow(false);
        setEditRole(false);
        setIsEditable(false);
        setEditPermissions(false);
        setDeleteWindow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handlePermissionLogs = async (
    status = "",
    msg = "",
    msg_context = "",
    action = ""
  ) => {
    if (msg !== "") {
      let readsuccess = false;
      status === 200 ? (readsuccess = true) : (readsuccess = false);
      toast(msg);
      try {
        await axios.post(
          AUDIT_LOGS,
          JSON.stringify({
            username: auth?.user,
            action: action,
            success: readsuccess,
            message_context: msg_context,
          })
        );
      } catch (error) {
        console.log("Permission audit log error:", error);
      }
    }
    getAllRoles();
  };

  const showPermissionsHandler = (roleSelected) => {
    setRoleSelected(roleSelected);
    setPermissionWindow(true);
  };

  const showDependencies = async (roleSelected) => {
    await axios
      .post(GET_DEPENDENCIES, JSON.stringify({ id: roleSelected.id }))
      .then((response) => {
        setRoleSelected(roleSelected);
        setDependencyWindow(true);
        setDependentUsers(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDropdownChange = (event, roleId) => {
    const { value } = event.target;
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [roleId]: value,
    }));
  };

  const handleClickDropdownButton = async (roleSelected) => {
    const value = selectedOptions[roleSelected.id] || "option1";
    setRoleSelected(roleSelected);
    switch (value) {
      case "option1":
        navigate("/role_assignment");
        break;
      case "option2":
        setEditRole(true);
        break;
      case "option3":
        setRoleSelected(roleSelected);
        setEditPermissions(true);
        break;
      case "option4":
        setDeleteWindow(true);
        break;
      default:
        break;
    }
  };

  const handleSubmitPermissions = async (id, currentPermissions) => {
    setEditPermissions(false);
    try {
      const updatePermissions = await axios.post(
        EDIT_ROLE_PERMISSIONS,
        JSON.stringify({ id: id, permissions: currentPermissions, rolename: '' })
      );
      handlePermissionLogs(updatePermissions.status, updatePermissions.data.msg, "dataUpdated", "Permissions")
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitRolename = async ({ target }) => {
    const data = newRoleName;
    setIsEditable(false);
    if (data.trim() !== "") {
      const dataToSend = {
        id: roleSelected.id,
        rolename: data,
        permissions: null,
      };
      const response = await axios.post(
        EDIT_ROLE_PERMISSIONS,
        JSON.stringify(dataToSend)
      );
      handlePermissionLogs(response.data.status, response.data.msg, 'dataUpdated', 'Rolename');
      setRoleSelected((roleSelected) => ({ ...roleSelected, role: data }));
    } else {
      toast("No name entered");
    }
  };

  const handleRolenameChange = ({ target }) => {
    setNewRoleName(target.value);
  };

  const handledeleteClick = async ({ target }) => {
    if (target.textContent === "Yes") {
      const deleteResponse = await axios.post(
        DELETE_ROLE,
        JSON.stringify({ roleId: roleSelected.id })
      );
      handlePermissionLogs(deleteResponse.data.status, deleteResponse.data.msg, 'dataDelete', 'Rolename');
    }
    setDeleteWindow(false);
    // setPopupWindow(false);
  };

  useEffect(() => {
    if (isEditable) {
      editablecontentRef.current.focus();
    }
  }, [isEditable]);

  const handleEdit = () => {
    setIsEditable(true);
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return (
    <div className="maintablediv">
      <Table className="table-hover table-striped">
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Creation Date time</th>
            <th>Created By</th>
            <th>Permissions</th>
            <th>Dependencies</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles?.map(
            ({ id, role, role_datetime, createdby, permissions }, rowIndex) => {
              const date = new Date(role_datetime);
              tdRefs.current[rowIndex] = tdRefs.current[rowIndex] || [];
              return (
                <tr key={id}>
                  <td>{role}</td>
                  <td>{date.toLocaleDateString("en-US", options)}</td>
                  <td>{createdby}</td>
                  <td>
                    <Button
                      type="button"
                      onClick={() =>
                        showPermissionsHandler({ role, permissions })
                      }
                    >
                      View
                    </Button>
                  </td>
                  <td>
                    <Button
                      type="button"
                      onClick={() => showDependencies({ id, role, permissions })}
                    >
                      View
                    </Button>
                  </td>
                  <td>
                    <div>
                      <label htmlFor={id}>Select an option:&nbsp;&nbsp;</label>
                      <select
                        id={id}
                        value={selectedOptions[id] || "option1"}
                        onChange={(e) => handleDropdownChange(e, id)}
                        style={{ marginBottom: "10px", fontSize: "16px" }}
                      >
                        <option value="option1">Assign/Create</option>
                        <option value="option2">Update name</option>
                        <option value="option3">Update perms</option>
                        <option value="option4">Delete role</option>
                      </select>
                      <br />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() =>
                          handleClickDropdownButton({ id, role, permissions })
                        }
                      >
                        Execute
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </Table>
      <Popup show={permissionWindow} onHide={() => setPermissionWindow(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {roleSelected?.role}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {roleSelected?.permissions.map((permission) => (
            <p key={uuidv4()}>{permission}</p>
          ))}
          <span>
            Click outside the inner box to navigate back to the roles page
          </span>
        </Modal.Body>
      </Popup>

      <Popup show={dependencyWindow} onHide={() => setDependencyWindow(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {roleSelected?.role}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dependentUsers?.map((user) => (
            <p key={uuidv4()}>{user.username}</p>
          ))}
          <span>
            Click outside the inner box to navigate back to the roles page
          </span>
        </Modal.Body>
      </Popup>

      <Popup
        show={editRole}
        onHide={() => {
          setIsEditable(false);
          setEditRole(false);
        }}
      >
        <ToastContainer />
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Rolename</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEditable ? (
            <h4 className="d-flex align-items-center mb-4">
              <input
                ref={editablecontentRef}
                onChange={handleRolenameChange}
                type="text"
                value={newRoleName}
                className="form-control"
                style={{
                  border: "1px solid #ced4da",
                  borderRadius: "0.25rem",
                  padding: "0.375rem 0.75rem",
                  flex: "1",
                }}
                placeholder="New Role name"
              />
            </h4>
          ) : (
            <>
              <p>{roleSelected?.role}</p>
              <Button type="button" onClick={handleEdit}>
                Change name
              </Button>
            </>
          )}
          {isEditable && (
            <>
              <p>
                If you want to save the new name press inside inner box to
                validate. To cancel changes, press outside the inner box or
                select cancel button
              </p>
              <Button type="button" onClick={handleSubmitRolename}>
                Confirm Name
              </Button>
            </>
          )}
        </Modal.Body>
      </Popup>

      <Popup show={editPermissions} onHide={() => setEditPermissions(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Current Permissions
          </Modal.Title>
        </Modal.Header>
        <div className="test" ref={wrapperRef}>
          <EditPermissionPopUp roleSelected={roleSelected} handleSubmitPermissions={handleSubmitPermissions} />
        </div>
      </Popup>
      <Popup show={deleteWindow} onHide={() => setDeleteWindow(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Are you sure you want to delete{" "}
            <strong>{roleSelected?.role}</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <Button
              type="button"
              style={{ marginRight: "2rem" }}
              onClick={handledeleteClick}
            >
              Yes
            </Button>
            <Button
              variant="danger"
              type="button"
              onClick={handledeleteClick}
              className="ml-auto"
            >
              No
            </Button>
          </div>
        </Modal.Body>
      </Popup>
      <ToastContainer />
    </div>
  );
};

export default EditRoles;
