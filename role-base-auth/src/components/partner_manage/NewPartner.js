import React, { useState } from "react";
import "./newPartner.css";
import axios from "../../api/axios";
import { Dropdown, Form } from "react-bootstrap";

const NewPartner = ({ handlePartnerWindow }) => {
  const [companyCode, setCompanyCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyTopic, setCompanyTopic] = useState("");
  const [endpointURLInquiry, setEndpointURLInquiry] = useState("");
  const [endpointURLPaybill, setEndpointURLPaybill] = useState("");
  const [serviceContextInquiry, setServiceContextInquiry] = useState("");
  const [serviceContextpaybill, setServiceContextpaybill] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [MI_SVC, setMI_SVC] = useState("");
  const [serviceName, setServiceName] = useState("Generic");

  const PARTNER_ADD = "/api/partneradd";

  const submitPartnerForm = async (e) => {
    e.preventDefault();
    const formData = {
      Company_Code: companyCode,
      Company_Name: companyName,
      Company_Topic: companyTopic,
      Endpoint_URL_Inquiry: endpointURLInquiry,
      Endpoint_URL_Paybill: endpointURLPaybill,
      Service_Context_Inquiry: serviceContextInquiry,
      Service_Context_paybill: serviceContextpaybill,
      Username: username,
      Password: password,
      MI_SVC,
      Service_Name: serviceName,
    };
    try {
      const addPartner = await axios.post(PARTNER_ADD, formData);
      handlePartnerWindow(addPartner.data.status, addPartner.data.msg, "dataAdd");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompanyTypeChange = (selectedCompanyType) => {
    setServiceName(selectedCompanyType);
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
        label="Company Topic"
        id="companyTopic"
        name="companyTopic"
        value={companyTopic}
        onChange={(e) => setCompanyTopic(e.target.value)}
        placeholder="Company Topic"
        required
      />
      <Field
        label="Endpoint URL Inquiry"
        id="endpointURLInquiry"
        name="endpointURLInquiry"
        value={endpointURLInquiry}
        onChange={(e) => setEndpointURLInquiry(e.target.value)}
        placeholder="Endpoint URL Inquiry"
        required
      />
      <Field
        label="Endpoint URL Paybill"
        id="endpointURLPaybill"
        name="endpointURLPaybill"
        value={endpointURLPaybill}
        onChange={(e) => setEndpointURLPaybill(e.target.value)}
        placeholder="Endpoint URL Paybill"
        required
      />
      <Field
        label="Service Context Inquiry"
        id="serviceContextInquiry"
        name="serviceContextInquiry"
        value={serviceContextInquiry}
        onChange={(e) => setServiceContextInquiry(e.target.value)}
        placeholder="Service Context Inquiry"
        required
      />
      <Field
        label="Service Context Paybill"
        id="serviceContextpaybill"
        name="serviceContextpaybill"
        value={serviceContextpaybill}
        onChange={(e) => setServiceContextpaybill(e.target.value)}
        placeholder="Service Context Paybill"
        required
      />
      <Field
        label="Username"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <Field
        label="Password"
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <Field
        label="MI_SVC"
        id="MI_SVC"
        name="MI_SVC"
        value={MI_SVC}
        onChange={(e) => setMI_SVC(e.target.value)}
        placeholder="MI_SVC"
        required
      />

      <Form.Group controlId="formCompanyType">
        <Form.Label>Service Name</Form.Label>
        <Dropdown onSelect={handleCompanyTypeChange}>
          <Dropdown.Toggle variant="primary" id="dropdown-company-type">
            {serviceName}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="Generic">Generic</Dropdown.Item>
            <Dropdown.Item eventKey="Offline">Offline</Dropdown.Item>
            <Dropdown.Item eventKey="Non_Generic">Non Generic</Dropdown.Item>
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
