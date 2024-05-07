import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  Row,
} from "react-bootstrap";
import "./billProcessing.css";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const Bill_Processing2 = () => {
  const { auth } = useAuth();
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("initial");
  const [response, setResponse] = useState({ msg: "" });
  const [disableUpload, setDisableUpload] = useState(false);
  const [offlineCompanies, setOfflineCompanies] = useState([]);
  const [companyid, setCompanyid] = useState(0);
  const [editableCompanySelection, setEditableSelection] = useState(true);

  const BILL_UPLOAD = "/api/billsUpload";
  const GET_OFFLINE_COMPANIES = "/api/offlinePartners";
  const FILE_DETAILS_ADD = "/api/fileDetailsAdd";
  const AUDIT_LOGS = "/api/auditlogs";

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(GET_OFFLINE_COMPANIES)
          .then((response) => {
            setOfflineCompanies(response.data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };

    fetchData();
  }, []);

  // Validate column names
  const expectedColumnNames = [
    "CONSUMER_NO",
    "NAME_OF_CONSUMER",
    "BILLING_MONTH",
    "AMOUNT_BEFORE_DUE_DATE",
    "AMOUNT_AFTER_DUE_DATE",
    "DUE_DATE",
  ];

  const handleFileChange = (e) => {
    if (e.target.files && e.target?.files[0]?.type === "text/csv") {
      setDisableUpload(false);
      setStatus("initial");
      setFile(e.target.files[0]);
    } else if (e.target.files) {
      setStatus("incorrectFile");
      setFile(null);
    }
  };

  const storingFileDetails = async (formData) => {
    const fileData = {
      name: file?.name,
      type: file?.type,
      size: file?.size,
      id: auth?.id,
      user: auth?.user,
    };
    formData.append('fileData', JSON.stringify(fileData));
    try {
      const response = await axios.post(FILE_DETAILS_ADD, formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setStatus("uploading");

      const formData = new FormData();
      formData.append("file", file);
      const reader = new FileReader();

      reader.onload = async (event) => {
        const content = event.target.result;
        const actualColumnNames = content
          .trim()
          .split("\n")[0] // Assuming the first line contains column headers
          .split(",")
          .map((columnName) => columnName.trim());

        const isValidColumns = expectedColumnNames.every((columnName) =>
          actualColumnNames.includes(columnName)
        );

        if (actualColumnNames.length === expectedColumnNames.length) {
          if (isValidColumns) {
            formData.append("companyId", offlineCompanies[companyid].id);
            try {
              const result = await axios.post(BILL_UPLOAD, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
              try {
                await axios.post(
                  AUDIT_LOGS,
                  JSON.stringify({
                    username: auth?.user,
                    action: "BillProcessing",
                    success: true,
                    message_context: "billUpload",
                  })
                );
              } catch (error) {
                console.log("Bill Upload success audit log error:", error);
              }
              await storingFileDetails(formData);
              setResponse(result.data);
              setDisableUpload(true);
              setStatus("success");
            } catch (error) {
              console.error(error);
              setStatus("fail");
              try {
                await axios.post(
                  AUDIT_LOGS,
                  JSON.stringify({
                    username: auth?.user,
                    action: "BillProcessing",
                    success: false,
                    message_context: "billUpload",
                  })
                );
              } catch (error) {
                console.log("Bill Upload failure audit log error:", error);
              }
            }
          } else {
            setStatus("incorrectCols");
            try {
              await axios.post(
                AUDIT_LOGS,
                JSON.stringify({
                  username: auth?.user,
                  action: "BillProcessing",
                  success: false,
                  message_context: "billUpload",
                })
              );
            } catch (error) {
              console.log("Bill Upload failure audit log error:", error);
            }
          }
        } else {
          setStatus("incorrectFile");
          try {
            await axios.post(
              AUDIT_LOGS,
              JSON.stringify({
                username: auth?.user,
                action: "BillProcessing",
                success: false,
                message_context: "billUpload",
              })
            );
          } catch (error) {
            console.log("Bill Upload failure audit log error:", error);
          }
        }
      };

      reader.readAsText(file);
    }
  };

  const handleDownload = async () => {
    // Path to the file in the 'public' folder
    const filePath = "/SampleBillerFile.csv";
    const downloadLink = document.createElement("a");
    downloadLink.href = process.env.PUBLIC_URL + filePath;
    downloadLink.download = "sampleFile.csv";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    try {
      await axios.post(
        AUDIT_LOGS,
        JSON.stringify({
          username: auth?.user,
          action: "BillProcessing",
          success: true,
          message_context: "billDownload",
        })
      );
    } catch (error) {
      console.log("Bill Download success audit log error:", error);
    }
  };

  const handleCompanyCodeChange = (selectedCompanyType) => {
    setCompanyid(selectedCompanyType);
  };

  const handleConfirmCompany = () => {
    setEditableSelection(false);
  };

  return (
    <Container fluid>
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Bill Processing</Card.Title>
              <p className="card-category">
                To download Sample CSV file{" "}
                <a href="#" onClick={handleDownload}>
                  click here
                </a>
              </p>
            </Card.Header>
            <hr />
            <Card.Body>
              <p>
                You will only be able to proceed if your company is listed in
                the dropdown menu
              </p>
              <Form.Group controlId="formCompanyType">
                <Form.Label>Company Code - Company Type</Form.Label>
                {editableCompanySelection ? (
                  <React.Fragment key={uuidv4()}>
                    <Dropdown onSelect={handleCompanyCodeChange}>
                      <Dropdown.Toggle
                        variant="primary"
                        id="dropdown-company-type"
                      >
                        {offlineCompanies[companyid]?.Company_Code} -{" "}
                        {offlineCompanies[companyid]?.Company_Name}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {offlineCompanies.length > 0 &&
                          offlineCompanies?.map((offlineCompany, index) => (
                            <Dropdown.Item
                              key={offlineCompany?.Company_Code}
                              eventKey={index}
                            >
                              {offlineCompany?.Company_Code} -{" "}
                              {offlineCompany?.Company_Name}
                            </Dropdown.Item>
                          ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <br />
                    <Button onClick={handleConfirmCompany}>
                      Click here to confirm
                    </Button>
                  </React.Fragment>
                ) : (
                  <>
                    <Form.Control
                      plaintext
                      readOnly
                      value={`${offlineCompanies[companyid]?.Company_Code} - ${offlineCompanies[companyid]?.Company_Name}`}
                    />
                    <hr />
                    <label htmlFor="file" className="sr-only">
                      Choose a file
                    </label>
                    <input id="file" type="file" onChange={handleFileChange} />
                    {file && (
                      <section>
                        File details:
                        <ul>
                          <li>Name: {file.name}</li>
                          <li>Type: {file.type}</li>
                          <li>Size: {file.size} bytes</li>
                        </ul>
                      </section>
                    )}

                    {file && (
                      <Button disabled={disableUpload} onClick={handleUpload}>
                        Upload a file
                      </Button>
                    )}
                    <br />
                    <Result status={status} response={response} />
                  </>
                )}
              </Form.Group>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="fas fa-check"></i>
                Data information certified
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const Result = ({ status, response }) => {
  if (status === "success") {
    return (
      <div>
        <p>✅ File uploaded successfully!</p>
        <p>{response.msg}</p>
      </div>
    );
  } else if (status === "uploading") {
    return <p>⏳ Uploading selected file...</p>;
  } else if (status === "fail") {
    return <p>❌ File upload failed!</p>;
  } else if (status === "incorrectFile") {
    return <p>❌ Incorrect format of file...</p>;
  } else if (status === "incorrectCols") {
    return <p>❌ Incorrect columns of file...</p>;
  } else {
    return null;
  }
};

export default Bill_Processing2;
