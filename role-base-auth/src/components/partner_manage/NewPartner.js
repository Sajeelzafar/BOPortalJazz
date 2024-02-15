import React, { useState } from "react";
import "./newPartner.css";
import axios from "../../api/axios";
import { Dropdown, Form } from "react-bootstrap";

const NewPartner = ({ handlePartnerWindow }) => {
  const [companyCode, setCompanyCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [partialPayment, setPartialPayment] = useState("");
  const [minimumAmount, setMinimumAmount] = useState("");
  const [maximumAmount, setMaximumAmount] = useState("");
  const [poolAccount, setPoolAccount] = useState("");
  const [notificationTemplate, setNotificationTemplate] = useState("");
  const [companyType, setCompanyType] = useState("Generic");

  const PARTNER_ADD = "/api/partneradd";

  const submitPartnerForm = async (e) => {
    e.preventDefault();
    const formData = {
      companyCode,
      companyName,
      partialPayment,
      minimumAmount,
      maximumAmount,
      poolAccount,
      notificationTemplate,
      companyType,
    };
    try {
      const addPartner = await axios.post(PARTNER_ADD, formData);
      handlePartnerWindow(addPartner.data.status, addPartner.data.msg, "dataAdd");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompanyTypeChange = (selectedCompanyType) => {
    setCompanyType(selectedCompanyType);
  };

  return (
    <form className="newPartnerForm" onSubmit={submitPartnerForm}>
      <Field
        label="Company Code"
        id="companyCode"
        name="companyCode"
        value={companyCode}
        onChange={(e) => setCompanyCode(e.target.value)}
        placeholder="Company Code"
        required
      />
      <Field
        label="Company Name"
        id="companyName"
        name="companyName"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Company Name"
        required
      />
      <Field
        label="Partial Payment"
        id="partialPayment"
        name="partialPayment"
        value={partialPayment}
        onChange={(e) => setPartialPayment(e.target.value)}
        placeholder="Partial Payment"
        required
      />
      <Field
        label="Minimum Amount"
        id="minimumAmount"
        name="minimumAmount"
        value={minimumAmount}
        onChange={(e) => setMinimumAmount(e.target.value)}
        placeholder="Minimum Amount"
        required
      />
      <Field
        label="Maximum Amount"
        id="maximumAmount"
        name="maximumAmount"
        value={maximumAmount}
        onChange={(e) => setMaximumAmount(e.target.value)}
        placeholder="Maximum Amount"
        required
      />
      <Field
        label="Pool Account"
        id="poolAccount"
        name="poolAccount"
        value={poolAccount}
        onChange={(e) => setPoolAccount(e.target.value)}
        placeholder="Pool Account"
        required
      />
      <Field
        label="Notification Template"
        id="notificationTemplate"
        name="notificationTemplate"
        value={notificationTemplate}
        onChange={(e) => setNotificationTemplate(e.target.value)}
        placeholder="Notification Template"
        required
      />

      <Form.Group controlId="formCompanyType">
        <Form.Label>Company Type</Form.Label>
        <Dropdown onSelect={handleCompanyTypeChange}>
          <Dropdown.Toggle variant="primary" id="dropdown-company-type">
            {companyType}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="Generic">Generic</Dropdown.Item>
            <Dropdown.Item eventKey="Offline">Offline</Dropdown.Item>
            <Dropdown.Item eventKey="Online">Online</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>

      <br />

      <input type="submit" />

    </form>
  );
};

export default NewPartner;

const Field = ({ label, id, ...rest }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input id={id} {...rest} />
  </div>
);
