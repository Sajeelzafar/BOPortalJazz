import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "../../api/axios";
import { failureMessages, successMessages } from "../../messages/messages";
import { Button, Card, Col, Container, Table } from "react-bootstrap";

const AUDIT_LOGS = "/api/auditlogs";

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

const Audit_Logs = () => {
  const [auditlogs, setAuditLogs] = useState([]);
  const [originalAuditLogs, setOriginalAuditLogs] = useState([]);
  const [searchType, setSearchType] = useState("ALL");
  const [searchValue, setSearchValue] = useState("");
  const [searchEnable, setSearchEnable] = useState(true);

  const getAllLogs = async () => {
    await axios
      .get(AUDIT_LOGS, {
        params: {
          sort: "timestamp",
          order: "desc",
        },
      })
      .then((response) => {
        const auditlogsResponse = response.data.auditlogs;
        const descResponse = auditlogsResponse.sort((a, b) => a - b).reverse();

        const translatedAuditLogs = descResponse.map((auditLog) => {
          let successResponse = auditLog.success ? "Yes" : "No";
          let messageResponse = auditLog.success
            ? successMessages[auditLog.message_context]
            : failureMessages[auditLog.message_context];
          const dateInUTC = new Date(auditLog.timestamp);
          const readableDate = dateInUTC.toLocaleDateString(
            "en-US",
            dateOptions
          );
          return {
            ...auditLog,
            success: successResponse,
            message_context: messageResponse,
            timestamp: readableDate,
          };
        });
        setAuditLogs(translatedAuditLogs);
        setOriginalAuditLogs(translatedAuditLogs);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getAllLogs();
  }, []);

  const handleClearClick = async () => {
    setAuditLogs(originalAuditLogs);
    setSearchEnable(true);
  };

  const handleSearchClick = async () => {
    setSearchEnable(false);
    switch (searchType) {
      case "ALL":
        const filteredLogsALL = auditlogs.filter((log) => {
          return Object.values(log).some((value) =>
            String(value).toLowerCase().includes(searchValue.toLowerCase())
          );
        });
        setAuditLogs(filteredLogsALL);
        break;

      case "username":
        const filteredLogsPP = auditlogs.filter((auditLog) =>
          auditLog.username.toLowerCase().includes(searchValue.toLowerCase())
        );
        setAuditLogs(filteredLogsPP);
        break;

      case "action":
        const filteredLogsAction = auditlogs.filter((auditLog) =>
          auditLog.action.toLowerCase().includes(searchValue.toLowerCase())
        );
        setAuditLogs(filteredLogsAction);
        break;

      case "timestamp":
        const filteredLogsTS = auditlogs.filter((auditLog) =>
          auditLog.timestamp.toLowerCase().includes(searchValue.toLowerCase())
        );
        setAuditLogs(filteredLogsTS);
        break;

      case "success":
        const filteredLogsSuccess = auditlogs.filter((auditLog) =>
          auditLog.success.toLowerCase().includes(searchValue.toLowerCase())
        );
        setAuditLogs(filteredLogsSuccess);
        break;

      case "message_context":
        const filteredLogsMC = auditlogs.filter((auditLog) =>
          auditLog.message_context.toLowerCase().includes(searchValue.toLowerCase())
        );
        setAuditLogs(filteredLogsMC);
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

  return (
    <Container fluid>
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
              <Card.Title as="h4">Audit Logs</Card.Title>
              <p className="card-category">Details Logs Presented</p>
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
                <option value="username">Attempt By</option>
                <option value="action">Action</option>
                <option value="timestamp">Timestamp</option>
                <option value="success">Successful</option>
                <option value="message_context">Message Context</option>
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
                    <th>Attempt By</th>
                    <th>Action</th>
                    <th>Timestamp</th>
                    <th>Successful</th>
                    <th>Message Context</th>
                  </tr>
                </thead>
                <tbody>
                  {auditlogs.length > 0 ? (
                    auditlogs.map(
                      ({
                        username,
                        action,
                        timestamp,
                        success,
                        message_context,
                      }) => (
                        <tr key={uuidv4()}>
                          <td>{username}</td>
                          <td>{action}</td>
                          <td>{timestamp}</td>
                          <td>{success}</td>
                          <td> {message_context}</td>
                        </tr>
                      )
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

export default Audit_Logs;
