import React from "react";
import { useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import axios from "../../api/axios";
import { useState } from "react";
import { useRef } from "react";
import Popup from "../Popup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const GETALLUSERS = "/api/users";
const EDIT_USERNAME = "/api/editusername";
const DELETE_USER = "/api/deleteuser";
const AUDIT_LOGS = "/api/auditlogs";

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

const EditUser = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [editUser, setEditUser] = useState(false);
  const [editUserName, setEditUserName] = useState(false);
  const wrapperRef = useRef(null);
  const editablecontentRef = useRef(null);
  const [newUserName, setNewUserName] = useState("");
  const [deleteWindow, setDeleteWindow] = useState(false);
  const navigate = useNavigate();

  // Create refs for each td element
  const tdRefs = useRef([]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setEditUser(false);
        setEditUserName(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const getAllUsers = async () => {
    await axios
      .get(GETALLUSERS)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const auditLogUsers = async(
    status = "",
    msg = "",
    msg_context = ""
  ) => {
    if(msg !== ""){
      let readsuccess = false;
      status === 201 ? (readsuccess = true) : (readsuccess = false);
      toast(msg);
      try {
        await axios.post(
          AUDIT_LOGS,
          JSON.stringify({
            username: auth?.user,
            action: "User",
            success: readsuccess,
            message_context: msg_context,
          })
        );
      } catch (error) {
        console.log("User audit log error:", error);
      }
    }
  }

  const handledeleteClick = async ({ target }) => {
    if (target.textContent === "Yes") {
      const deleteResponse = await axios.post(
        DELETE_USER,
        JSON.stringify({ userId: userSelected?.id })
      );
      auditLogUsers(deleteResponse.data.status, deleteResponse.data.msg, "dataDelete")
      getAllUsers();
    }
    setDeleteWindow(false);
  };

  const handleDropdownChange = (event, roleId) => {
    const { value } = event.target;
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [roleId]: value,
    }));
  };

  const handleClickDropdownButton = async (userSelected) => {
    const value = selectedOptions[userSelected.id] || "option1";
    setUserSelected(userSelected);
    switch (value) {
      case "option1":
        setNewUserName("");
        setEditUser(true);
        break;
      case "option2":
        navigate("/profile", { state: { username: userSelected.username } });
        break;
      case "option3":
        setDeleteWindow(true);
        break;
      default:
        break;
    }
  };
  const updateUserName = async () => {
    const dataToSend = {
      prevName: userSelected?.username,
      newName: newUserName,
    };
    try {
      const response = await axios.post(
        EDIT_USERNAME,
        JSON.stringify(dataToSend)
      );
      auditLogUsers(response.data.status, response.data.msg, "dataUpdated");
      if (response.status === 201) {
        setUserSelected((userSelected) => ({
          ...userSelected,
          username: newUserName,
        }));
        getAllUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setEditUserName(true);
  };

  const handleBlurUsername = async ({ target }) => {
    setEditUserName(false);
    const data = target.value;
    if (data.trim() !== "") {
      await updateUserName();
    }
    setNewUserName("");
  };

  const handleUsernameChange = ({ target }) => {
    setNewUserName(target.value);
  };

  const handleSubmitUsername = async () => {
    await updateUserName();
    setEditUserName(false);
    setNewUserName("");
  };

  return (
    <>
      <Table className="table-hover table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Creation Date time</th>
            <th>Successfully Verified</th>
            <th>Role Assigned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(
            (
              { id, username, user_datetime, successfully_verified, role },
              rowIndex
            ) => {
              const date = new Date(user_datetime);
              tdRefs.current[rowIndex] = tdRefs.current[rowIndex] || [];
              return (
                <tr key={id}>
                  <td>{username}</td>
                  <td>{date.toLocaleDateString("en-US", options)}</td>
                  <td>{successfully_verified === 1 ? "YES" : "NO"}</td>
                  <td>{role}</td>
                  <td>
                    <div>
                      <label htmlFor={id}>Select an option:&nbsp;&nbsp;</label>
                      <select
                        id={id}
                        value={selectedOptions[id] || "option1"}
                        onChange={(e) => handleDropdownChange(e, id)}
                      >
                        <option value="option1">Edit Name</option>
                        <option value="option2">View User</option>
                        <option value="option3">Delete User</option>
                      </select>
                      <br />
                      <Button
                        type="button"
                        onClick={() =>
                          handleClickDropdownButton({ id, username, role })
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
      <Popup
        show={editUser}
        onHide={() => {
          setEditUserName(false);
          setEditUser(false);
        }}
      >
        <ToastContainer />
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editUserName ? (
            <h4 className="d-flex align-items-center mb-4">
              <input
                ref={editablecontentRef}
                onBlur={handleBlurUsername}
                onChange={handleUsernameChange}
                type="text"
                value={newUserName}
                className="form-control"
                style={{
                  border: "1px solid #ced4da",
                  borderRadius: "0.25rem",
                  padding: "0.375rem 0.75rem",
                  flex: "1",
                }}
                placeholder="New User name"
              />
            </h4>
          ) : (
            <>
              <p>{userSelected?.username}</p>
              <Button type="button" onClick={handleEdit}>
                Change name
              </Button>
            </>
          )}
          {editUserName && (
            <>
              <p>
                If you want to save the new name press inside inner box to
                validate. To cancel changes, press outside the inner box or
                select cancel button
              </p>
              <Button type="button" onClick={handleSubmitUsername}>
                Confirm Name
              </Button>
            </>
          )}
        </Modal.Body>
      </Popup>

      <Popup show={deleteWindow} onHide={() => setDeleteWindow(false)}>
        <ToastContainer />
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Are you sure you want to delete{" "}
            <strong>{userSelected?.username}</strong>
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
    </>
  );
};

export default EditUser;
