import React, { useRef, useState } from "react";
import { Button, Dropdown, Form, Modal, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Popup from "../Popup";
import axios from "../../api/axios";

const ShowPartners = ({ handlePartnerWindow, partners }) => {
  const tdRefs = useRef([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedPartner, setSelectedPartner] = useState({});
  const [deleteWindow, setDeleteWindow] = useState(false);
  const [editableRows, setEditableRows] = useState({});

  const DELETE_PARTNER = "/api/partnerdelete";
  const UPDATE_PARTNER = "/api/partnerupdate";
  
  const handleDropdownChange = (event, roleId) => {
    const { value } = event.target;
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [roleId]: value,
    }));
  };

  const handleCompanyTypeChange = (selectedCompanyType, id) => {
    setEditableRows((prevEditableRows) => ({
      ...prevEditableRows,
      [id]: {
        ...prevEditableRows[id],
        "company_type": selectedCompanyType,
      },
    }));
  };

  const handledeleteClick = async ({ target }) => {
    if (target.textContent === "Yes") {
      const deleteResponse = await axios.post(
        DELETE_PARTNER,
        JSON.stringify({ selectedPartner })
      );
      handlePartnerWindow(deleteResponse.data.status, deleteResponse.data.msg, "dataDelete");
    }
    setDeleteWindow(false);
  };

  const handleInputChange = (e, columnName, id) => {
    const { value } = e.target;
    setEditableRows((prevEditableRows) => ({
      ...prevEditableRows,
      [id]: {
        ...prevEditableRows[id],
        [columnName]: value,
      },
    }));
  };

  const handleSaveChanges = async (e, id) => {
    if(e.target.textContent === "Save Changes"){
      const updateResponse = await axios.post(
        UPDATE_PARTNER,
        JSON.stringify({ updatePartnerData: editableRows[id] })
      );
      handlePartnerWindow(updateResponse.data.status, updateResponse.data.msg, "dataUpdated");
    }
    setEditableRows((prevEditableRows) => ({
      ...prevEditableRows,
      [id]: null, // Set the row as non-editable
    }));
  };

  const handleClickDropdownButton = async (roleSelected) => {
    const value = selectedOptions[roleSelected.id] || "option1";
    setSelectedPartner(roleSelected);
    switch (value) {
      case "option1":
        setEditableRows((prevEditableRows) => ({
          ...prevEditableRows,
          [roleSelected.id]: partners.find(
            (partner) => partner.id === roleSelected.id
          ),
        }));
        break;
      case "option2":
        setDeleteWindow(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Table className="table-hover table-striped">
        <thead>
          <tr>
            <th>Company Code</th>
            <th>Company Name</th>
            <th>Partial Payment</th>
            <th>Min Amount</th>
            <th>Max Amount</th>
            <th>Pool Account</th>
            <th>Notification Template</th>
            <th>Company Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {partners?.map(
            (
              {
                id,
                company_code,
                company_name,
                partial_payment,
                min_amount,
                max_amount,
                pool_account,
                notification_template,
                company_type,
              },
              rowIndex
            ) => {
              const isEditable = Boolean(editableRows[id]);
              tdRefs.current[rowIndex] = tdRefs.current[rowIndex] || [];
              return (
                <tr key={id}>
                  {isEditable ? (
                    <>
                      <td>
                        <label>
                          Company Code
                          <input
                            type="text"
                            value={
                              editableRows[id]?.company_code || company_code
                            }
                            onChange={(e) =>
                              handleInputChange(e, "company_code", id)
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <label>
                          Company Name
                          <input
                            type="text"
                            value={
                              editableRows[id]?.company_name || company_name
                            }
                            onChange={(e) =>
                              handleInputChange(e, "company_name", id)
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <label>
                          Partial Payment
                          <input
                            type="text"
                            value={
                              editableRows[id]?.partial_payment ||
                              partial_payment
                            }
                            onChange={(e) =>
                              handleInputChange(e, "partial_payment", id)
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <label>
                          Minimum Amount
                          <input
                            type="text"
                            value={editableRows[id]?.min_amount || min_amount}
                            onChange={(e) =>
                              handleInputChange(e, "min_amount", id)
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <label>
                          Maximum Amount
                          <input
                            type="text"
                            value={editableRows[id]?.max_amount || max_amount}
                            onChange={(e) =>
                              handleInputChange(e, "max_amount", id)
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <label>
                          Pool Account
                          <input
                            type="text"
                            value={
                              editableRows[id]?.pool_account || pool_account
                            }
                            onChange={(e) =>
                              handleInputChange(e, "pool_account", id)
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <label>
                          Notification Template
                          <input
                            type="text"
                            value={
                              editableRows[id]?.notification_template ||
                              notification_template
                            }
                            onChange={(e) =>
                              handleInputChange(e, "notification_template", id)
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <Form.Group controlId="formCompanyType" onChange={(e) =>
                              handleInputChange(e, "companyType", id)
                            }>
                          <Form.Label>Company Type</Form.Label>
                          <Dropdown onSelect={(e) => handleCompanyTypeChange(e, id)}>
                            <Dropdown.Toggle
                              variant="primary"
                              id="dropdown-company-type"
                            >
                              {editableRows[id]?.company_type || company_type}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item eventKey="Generic">
                                Generic
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="NonGeneric">
                                Non-Generic
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="Offline">
                                Offline
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Form.Group>
                      </td>
                      <td>
                        <Button
                          type="button"
                          size="sm"
                          onClick={(e) =>
                            handleSaveChanges(e, id)
                          }
                        >
                          Save Changes
                        </Button>
                        <br />
                        <br />
                        <Button
                          type="button"
                          variant="danger"
                          size="sm"
                          onClick={(e) =>
                            handleSaveChanges(e, id)
                          }
                        >
                          Cancel Changes
                        </Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{company_code}</td>
                      <td>{company_name}</td>
                      <td>{partial_payment}</td>
                      <td>{min_amount}</td>
                      <td>{max_amount}</td>
                      <td>{pool_account}</td>
                      <td>{notification_template}</td>
                      <td>{company_type}</td>
                      <td>
                        <div>
                          <label htmlFor={id}>
                            Select an option:&nbsp;&nbsp;
                          </label>
                          <select
                            id={id}
                            value={selectedOptions[id] || "option1"}
                            onChange={(e) => handleDropdownChange(e, id)}
                            style={{ marginBottom: "10px", fontSize: "16px" }}
                          >
                            <option value="option1">Update params</option>
                            <option value="option2">Delete Partner</option>
                          </select>
                          <br />
                          <Button
                            type="button"
                            size="sm"
                            onClick={() =>
                              handleClickDropdownButton({
                                id,
                                company_code,
                                company_name,
                              })
                            }
                          >
                            Execute
                          </Button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              );
            }
          )}
        </tbody>
      </Table>
      <Popup show={deleteWindow} onHide={() => setDeleteWindow(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Are you sure you want to delete{" "}
            <strong>{selectedPartner?.company_code} - {selectedPartner?.company_name}</strong>
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

export default ShowPartners;
