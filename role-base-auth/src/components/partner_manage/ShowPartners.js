import React, { useRef, useState } from "react";
import { Button, Dropdown, Form, Modal, Table } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
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
        Service_Name: selectedCompanyType,
      },
    }));
  };

  const handledeleteClick = async ({ target }) => {
    if (target.textContent === "Yes") {
      const deleteResponse = await axios.post(
        DELETE_PARTNER,
        JSON.stringify({ selectedPartner })
      );
      handlePartnerWindow(
        deleteResponse.data.status,
        deleteResponse.data.msg,
        "dataDelete"
      );
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
    if (e.target.textContent === "Save Changes") {
      const updateResponse = await axios.post(
        UPDATE_PARTNER,
        JSON.stringify({ updatePartnerData: editableRows[id] })
      );
      handlePartnerWindow(
        updateResponse.data.status,
        updateResponse.data.msg,
        "dataUpdated"
      );
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
            <th>Company Topic</th>
            <th>Endpoint URL Inquiry</th>
            <th>Endpoint URL Paybill</th>
            <th>MI SVC</th>
            <th>Service Context Inquiry</th>
            <th>Service Context Paybill</th>
            <th>Service Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {partners?.map(
            (
              {
                id,
                Company_Code,
                Company_Name,
                Company_Topic,
                Endpoint_URL_Inquiry,
                Endpoint_URL_Paybill,
                MI_SVC,
                Service_Context_Inquiry,
                Service_Context_paybill,
                Service_Name,
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
                              editableRows[id]?.Company_Code || Company_Code
                            }
                            onChange={(e) =>
                              handleInputChange(e, "Company_Code", id)
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
                              editableRows[id]?.Company_Name || Company_Name
                            }
                            onChange={(e) =>
                              handleInputChange(e, "Company_Name", id)
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <label>
                          Company Topic
                          <input
                            type="text"
                            value={
                              editableRows[id]?.Company_Topic || Company_Topic
                            }
                            onChange={(e) =>
                              handleInputChange(e, "Company_Topic", id)
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <label>
                          Endpoint URL Inquiry
                          <input
                            type="text"
                            value={
                              editableRows[id]?.Endpoint_URL_Inquiry ||
                              Endpoint_URL_Inquiry
                            }
                            onChange={(e) =>
                              handleInputChange(e, "Endpoint_URL_Inquiry", id)
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <label>
                          Endpoint URL Paybill
                          <input
                            type="text"
                            value={
                              editableRows[id]?.Endpoint_URL_Paybill ||
                              Endpoint_URL_Paybill
                            }
                            onChange={(e) =>
                              handleInputChange(e, "Endpoint_URL_Paybill", id)
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <label>
                          MI SVC
                          <input
                            type="text"
                            value={editableRows[id]?.MI_SVC || MI_SVC}
                            onChange={(e) => handleInputChange(e, "MI_SVC", id)}
                          />
                        </label>
                      </td>
                      <td>
                        <label>
                          Service Context Inquiry
                          <input
                            type="text"
                            value={
                              editableRows[id]?.Service_Context_Inquiry ||
                              Service_Context_Inquiry
                            }
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "Service_Context_Inquiry",
                                id
                              )
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <label>
                          Service Context Paybill
                          <input
                            type="text"
                            value={
                              editableRows[id]?.Service_Context_paybill ||
                              Service_Context_paybill
                            }
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "Service_Context_paybill",
                                id
                              )
                            }
                          />
                        </label>
                      </td>
                      {/* <td>
                        <label>
                        Service Name
                          <input
                            type="text"
                            value={
                              editableRows[id]?.Service_Name ||
                              Service_Name
                            }
                            onChange={(e) =>
                              handleInputChange(e, "Service_Name", id)
                            }
                          />
                        </label>
                      </td> */}
                      <td>
                        <Form.Group
                          controlId="formCompanyType"
                          onChange={(e) =>
                            handleInputChange(e, "companyType", id)
                          }
                        >
                          <Form.Label>Service_Name</Form.Label>
                          <Dropdown
                            onSelect={(e) => handleCompanyTypeChange(e, id)}
                          >
                            <Dropdown.Toggle
                              variant="primary"
                              id="dropdown-company-type"
                            >
                              {editableRows[id]?.Service_Name || Service_Name}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item eventKey="Generic">
                                Generic
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="Non_Generic">
                                Non Generic
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
                          onClick={(e) => handleSaveChanges(e, id)}
                        >
                          Save Changes
                        </Button>
                        <br />
                        <br />
                        <Button
                          type="button"
                          variant="danger"
                          size="sm"
                          onClick={(e) => handleSaveChanges(e, id)}
                        >
                          Cancel Changes
                        </Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{Company_Code}</td>
                      <td>{Company_Name}</td>
                      <td>{Company_Topic}</td>
                      <td>{Endpoint_URL_Inquiry}</td>
                      <td>{Endpoint_URL_Paybill}</td>
                      <td>{MI_SVC}</td>
                      <td>{Service_Context_Inquiry}</td>
                      <td>{Service_Context_paybill}</td>
                      <td>{Service_Name}</td>
                      {/* <td>{company_type}</td> */}
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
                                Company_Code,
                                Company_Name,
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
            <strong>
              {selectedPartner?.Company_Code} - {selectedPartner?.Company_Name}
            </strong>
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
