import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import ExistingRole from "../formComponents/ExistingRole";
import NewRole from "../formComponents/NewRole";
import Username from "../formComponents/Username";
import RoleChoice from "../formComponents/RoleChoice";
import Popup from "./Popup";
import { Button } from "react-bootstrap";

const AUDIT_LOGS = "/api/auditlogs";
const UPDATE_URL = "/api/update";
const NEWROLE_URL = "./api/newrole";

const Role_Assignment = ({ allPermissions }) => {
  const { auth } = useAuth();
  const [rolename, setRolename] = useState("");
  const [validateUser, setValidateUser] = useState(false);
  const [targetUser, setTargetUser] = useState({});
  const [updateUser, setUpdateUser] = useState(false);
  const [permissions, setPermissions] = useState(allPermissions);
  const [rolecheck, setRolecheck] = useState("Existing");
  const [roleAssign, setRoleAssign] = useState(false);

  async function updateUserDatabase(userData) {
    try {
      const user_updateresponse = await axios.post(
        UPDATE_URL,
        JSON.stringify(userData)
      );
      setTargetUser(user_updateresponse.data);
      try {
        await axios.post(
          AUDIT_LOGS,
          JSON.stringify({
            username: auth?.user,
            action: "Rolename",
            success: true,
            message_context: "dataAssign",
          })
        );
      } catch (error) {
        console.log("Update role audit log error:", error);
      }
    } catch (error) {
      await axios.post(
        AUDIT_LOGS,
        JSON.stringify({
          username: auth?.user,
          action: "Rolename",
          success: false,
          message_context: "dataAssign",
        })
      );
    }
  }

  async function updateRoleDatabase() {
    const truePermissions = Object.keys(permissions).filter(
      (key) => permissions[key]
    );
    const roleData = {
      rolename,
      createdBy: auth.user,
      permissions: truePermissions,
    };
    try {
      const response = await axios.post(NEWROLE_URL, JSON.stringify(roleData));
      if (response && updateUser) {
        try {
          const userData = {
            role_id: response.data.id,
            username: targetUser.username,
          };
          updateUserDatabase(userData);
        } catch (e) {
          console.log(e);
        }
      }
      try {
        await axios.post(
          AUDIT_LOGS,
          JSON.stringify({
            username: auth?.user,
            action: "Rolename",
            success: true,
            message_context: "roleCreated",
          })
        );
      } catch (error) {
        console.log("New role audit log error:", error);
      }
    } catch (err) {
      console.log(err);
      try {
        await axios.post(
          AUDIT_LOGS,
          JSON.stringify({
            username: auth?.user,
            action: "Rolename",
            success: false,
            message_context: "roleCreated",
          })
        );
      } catch (error) {
        console.log("New role audit log error:", error);
      }
    }
  }

  useEffect(() => {
    const user_permissions = targetUser?.permissions || {};
    if (JSON.stringify(user_permissions) !== JSON.stringify({})) {
      setRolename(targetUser.role);
      const user_permissionsObject = Object.fromEntries(
        user_permissions?.map((key) => [key, true])
      );
      setPermissions({ ...allPermissions, ...user_permissionsObject });
      setValidateUser(true);
    }
  }, [targetUser, allPermissions]);

  const handleChange = ({ target }) => {
    setRoleAssign(false);
    setUpdateUser(false);
    if (target.type === "checkbox") {
      const name = target.name;
      const checked = target.checked;
      setPermissions({
        ...permissions,
        [name]: checked,
      });
    } else if (target.value === "Existing") {
      setRolecheck(target.value);
    } else if (target.value === "New") {
      setRolecheck(target.value);
    } else {
      setRolename(target.value);
    }
  };

  const handleSubmit = async (e) => {
    setRoleAssign(true);
    e.preventDefault();
    updateRoleDatabase();
  };

  const handleSubmitUser = async (data) => {
    setRolecheck("Existing");
    setTargetUser(data);
  };

  const anotherUser = (e) => {
    e.preventDefault();
    setTargetUser({});
    setValidateUser(false);
    setUpdateUser(false);
  };

  const handleChangeRoleCreation = ({ target }) => {
    if (target.value === "roleOnly") {
      setUpdateUser(false);
    } else if (target.value === "roleAndAssign") {
      setUpdateUser(true);
    }
  };

  return (
    <div>
      <h4>Assigning Roles</h4>
      {!validateUser ? (
        <Username handleSubmitUser={handleSubmitUser} />
      ) : (
        <>
        <h1>Selected user is {targetUser.username}</h1>
          <RoleChoice handleChange={handleChange} />
          {rolecheck === "New" ? (
            <NewRole
              handleChange={handleChange}
              permissions={permissions}
              handleChangeRoleCreation={handleChangeRoleCreation}
              handleSubmit={handleSubmit}
              rolename={rolename}
              updateUser={updateUser}
              targetUser={targetUser}
              roleAssign={roleAssign}
            />
          ) : (
            <ExistingRole
              updateUserDatabase={updateUserDatabase}
              user={targetUser.username}
            />
          )}
          <Button type="button" variant="warning" onClick={anotherUser}>
            Search another User
          </Button>
        </>
      )}
    </div>
  );
};

export default Role_Assignment;
