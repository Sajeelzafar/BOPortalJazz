import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "../../api/axios";
import { failureMessages, successMessages } from "../../messages/messages";
import { Card, Col, Container, Table } from "react-bootstrap";

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
  useEffect(() => {
    axios
      .get(AUDIT_LOGS, {
        params: {
          sort: 'timestamp',
          order: 'desc'
        }
      })
      .then((response) => {
        const auditlogsResponse = response.data.auditlogs;
        const descResponse = auditlogsResponse.sort((a, b) => a - b).reverse();
        setAuditLogs(descResponse);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <Container fluid>
      <Col md="10">
        <Card className="card-tasks">
          <Card.Header>
            <Card.Title as="h4">Audit Logs</Card.Title>
            <p className="card-category">Detail Logs Presented</p>
          </Card.Header>
          <Card.Body>
            <div className="table-full-width">
              <Table>
                <tbody>
                  {auditlogs.length > 0 ? (
                    auditlogs.map(
                      ({
                        username,
                        action,
                        timestamp,
                        success,
                        message_context,
                      }) => {
                        const dateInUTC = new Date(timestamp);
                        const readableDate = dateInUTC.toLocaleDateString(
                          "en-US",
                          dateOptions
                        );
                        if (success === 1) {
                          if (action === "Partner" || action === "Rolename" || action === "Permissions") {
                            return (
                              <tr key={uuidv4()}>
                                <td>
                                  {action} {successMessages[message_context]}.
                                  Attempt was made by {username} at{" "}
                                  {readableDate}
                                </td>
                              </tr>
                            );
                          } else {
                            return (
                              <tr key={uuidv4()}>
                                <td>
                                  {successMessages[message_context]}. Attempt
                                  was made by {username} at {readableDate}
                                </td>
                              </tr>
                            );
                          }
                        } else if (success === 0) {
                          if (action === "Partner" || action === "Rolename") {
                            return (
                              <tr key={uuidv4()}>
                                <td>
                                  {action} {failureMessages[message_context]}.
                                  Attempt was made by {username} at{" "}
                                  {readableDate}
                                </td>
                              </tr>
                            );
                          } else {
                            return (
                              <tr key={uuidv4()}>
                                <td>
                                  {failureMessages[message_context]}. Attempt
                                  was made by {username} at {readableDate}
                                </td>
                              </tr>
                            );
                          }
                        }
                        return (
                          <tr key={uuidv4()}>
                            <td></td>
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

export default Audit_Logs;
