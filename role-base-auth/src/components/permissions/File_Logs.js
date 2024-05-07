import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import axios from "../../api/axios";

const FILE_LOGS = "/api/filelogs";

// Convert to a readable date string in a specific timezone
const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "Etc/GMT-5", // Specify the timezone you want, e.g., 'America/New_York'
};

const File_Logs = () => {
  const [auditlogs, setAuditLogs] = useState([]);
  const [searchType, setSearchType] = useState("ALL");
  const [searchValue, setSearchValue] = useState("");
  const [searchEnable, setSearchEnable] = useState(true);

  const getAllLogs = async () => {
    await axios
      .get(FILE_LOGS, {
        params: {
          sort: "timestamp",
          order: "desc",
        },
      })
      .then((response) => {
        const filelogsResponse = response.data.filelogs;
        const descResponse = filelogsResponse.sort((a, b) => a - b).reverse();
        setAuditLogs(descResponse);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getAllLogs();
  }, []);

  const handleClearClick = async () => {
    await getAllLogs();
    setSearchEnable(true);
  };

  const handleSearchClick = async () => {
    setSearchEnable(false);
    switch (searchType) {
      case "ALL":
        const filteredPartnersALL = auditlogs.filter((log) => {
          return Object.values(log).some((value) =>
            String(value).toLowerCase().includes(searchValue.toLowerCase())
          );
        });
        setAuditLogs(filteredPartnersALL);
        break;
      case "name":
        const filteredPartnersPP = auditlogs.filter((partner) =>
          partner.name.includes(searchValue)
        );
        setAuditLogs(filteredPartnersPP);
        break;

      case "type":
        const filteredlogsType = auditlogs.filter((partner) =>
          partner.type.includes(searchValue)
        );
        setAuditLogs(filteredlogsType);
        break;
      case "size_bytes":
        const sizeValue = parseInt(searchValue, 10); // Convert searchValue to integer
        const filteredlogsSize = auditlogs.filter(
          (partner) => partner.size_bytes === sizeValue
        );
        setAuditLogs(filteredlogsSize);
        break;
      case "user":
        const filteredlogsUser = auditlogs.filter((partner) =>
          partner.user.includes(searchValue)
        );
        setAuditLogs(filteredlogsUser);
        break;
      default:
        break;
    }
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleDownload = async (path) => {
    try {
      const response = await axios.get(`/api/download/${path}`);
      toast(response.data.msg);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <Container fluid>
      <ToastContainer />
      <Col md="10">
        <Card className="card-tasks">
          <Card.Header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Card.Title as="h4">File Logs</Card.Title>
              <p className="card-category">File Logs Presented</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <select
                value={searchType}
                onChange={handleSearchTypeChange}
                style={{
                  padding: "8px",
                  marginRight: "10px",
                  borderRadius: "4px",
                }}
              >
                <option value="ALL">ALL</option>
                <option value="name">File Name</option>
                <option value="type">File Type</option>
                <option value="size_bytes">File Size</option>
                <option value="user">Uploaded By</option>
              </select>
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchInputChange}
                disabled={!searchEnable}
                style={{
                  padding: "8px",
                  marginRight: "10px",
                  borderRadius: "4px",
                  flex: "1",
                }}
              />
              {searchEnable ? (
                <Button onClick={handleSearchClick}>Search</Button>
              ) : (
                <Button onClick={handleClearClick}>Clear</Button>
              )}
            </div>
          </Card.Header>
          <Card.Body>
            <div className="table-full-width">
              <Table className="table-hover">
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>File Type</th>
                    <th>File Size</th>
                    <th>Uploaded By</th>
                    <th>Timestamp</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {auditlogs.length > 0 ? (
                    auditlogs.map(
                      ({
                        name,
                        type,
                        size_bytes,
                        user,
                        upload_dateTime,
                        path,
                      }) => {
                        const dateInUTC = new Date(upload_dateTime);
                        const readableDate = dateInUTC.toLocaleDateString(
                          "en-US",
                          dateOptions
                        );
                        return (
                          <tr key={uuidv4()}>
                            <td>{name}</td>
                            <td>{type}</td>
                            <td>{size_bytes}</td>
                            <td>{user}</td>
                            <td>{readableDate}</td>
                            <td>
                              {path !== undefined && path !== null ? (
                                <Button onClick={() => handleDownload(path)}>
                                  Open Folder
                                </Button>
                              ) : (
                                <span>Can't find file</span>
                              )}
                            </td>
                          </tr>
                        );
                      }
                    )
                  ) : (
                    <tr>
                      <td>No audit logs available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default File_Logs;
