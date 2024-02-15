import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "react-bootstrap";

const EditPermissionPopUp = ({ roleSelected, handleSubmitPermissions }) => {
  const [otherPermissions, setOtherPermissions] = useState([]);
  const [currentPermissions, setCurrentPermissions] = useState(roleSelected?.permissions);

  useEffect(() => {
    // Function to fetch the list of files
    const fetchFileList = async () => {
      try {
        const context = require.context("../permissions", false, /\.js$/);
        const fileNames = context
          .keys()
          .map((key) => key.slice(2).replace(".js", "").toUpperCase());
        const remainingPermissions = fileNames.filter(
          (element) => !roleSelected?.permissions.includes(element)
        );
        setOtherPermissions(remainingPermissions);
      } catch (error) {
        console.error("Error fetching file list:", error);
      }
    };
    fetchFileList();
  }, []);

  const permissionHandler = (event, editedPermission) => {
    if (event.target.className === "removePermission") {
      const roletobeEdited = roleSelected.permissions[editedPermission];
      roleSelected.permissions = roleSelected?.permissions.filter(
        (element, index) => editedPermission !== index
      );
      setOtherPermissions((otherPermissions) => [...otherPermissions, roletobeEdited]);
      setCurrentPermissions(roleSelected?.permissions);
    }
    if (event.target.className === "addPermission") {
      const roletobeEdited = otherPermissions[editedPermission];
      setOtherPermissions((otherPermissions) => otherPermissions.filter(
        (element, index) => editedPermission !== index
      ))
      roleSelected.permissions = [...roleSelected.permissions, roletobeEdited];
    }
    setCurrentPermissions(roleSelected?.permissions);
  };

  const handleSubmit = async () => {
    handleSubmitPermissions(roleSelected?.id, currentPermissions)
    console.log(currentPermissions, roleSelected.id);
  }

  return (
    <>
      Current permissions for {roleSelected?.role} are:
      {roleSelected?.permissions.map((permission, index) => (
        <div key={uuidv4()} className="editPermissionsdiv">
          <span className="permissionSpan">{permission}</span>
          <span
            type="button"
            onMouseUp={(event) => permissionHandler(event, index)}
            className="removePermission"
          >
            <strong className="removePermission">-</strong>
          </span>
        </div>
      ))}
      <br />
      <Button type="button" onClick={handleSubmit}>Confirm permissions</Button>
      <br />
      {otherPermissions.map((permission, index) => (
        <div key={uuidv4()} className="editPermissionsdiv">
          <span className="permissionSpan">{permission}</span>
          <span
            type="button"
            className="addPermission"
            onMouseUp={(event) => permissionHandler(event, index)}
          >
            <strong className="addPermission">+</strong>
          </span>
        </div>
      ))}
    </>
  );
};

export default EditPermissionPopUp;

      // console.log(fileList);
      // otherPermissions.push(roletobeDeleted);
      // console.log(removedPermission);
      // setOtherPermissions(remainingPermissions);
      // console.log("Roleselected permissions are:", roleSelected?.permissions);
      // console.log("Removed Permission is:", roletobeDeleted);
      // console.log("Target is:", event.target.className);