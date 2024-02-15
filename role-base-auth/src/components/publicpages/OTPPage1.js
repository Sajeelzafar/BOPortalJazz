import React, { useState } from "react";
import axios from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

const OTPPage1 = ({ handleOTPSuccess, email, phoneNumber, user }) => {
  const [sendOTPs, setSendOTPs] = useState(false);
  const [emailOTP, setEmailOTP] = useState("");
  const [phoneNumberOTP, setphoneNumberOTP] = useState("");
  const [otpId, setOtpId] = useState(0);

  const GET_OTP = "/api/otpgenerate";
  const VERIFY_OTP = "/api/otpverify";
  const AUDIT_LOGS = "/api/auditlogs";

  const handlesendOTPs = async () => {
    setSendOTPs(true);
    try {
      const OTP_response = await axios.get(GET_OTP);
      setOtpId(OTP_response.data.otp_id);
      try {
        await axios.post(
          AUDIT_LOGS,
          JSON.stringify({
            username: user,
            action: "OTP",
            success: true,
            message_context: "OTPlogin",
          })
        );
      } catch (error) {
        console.log("OTP generate success audit log error:", error);
      }
    } catch (error) {
      try {
        await axios.post(
          AUDIT_LOGS,
          JSON.stringify({
            username: user,
            action: "OTP",
            success: false,
            message_context: "OTPlogin",
          })
        );
      } catch (error) {
        console.log("OTP generate fail audit log error:", error);
      }
    }
  };

  const handleEmailOTPChange = ({ target }) => {
    setEmailOTP(target.value);
  };

  const handleNumberOTPChange = ({ target }) => {
    setphoneNumberOTP(target.value);
  };

  const handleSubmitOTPs = async () => {
    setEmailOTP("");
    setphoneNumberOTP("");
    const otpToSend = {
      id: otpId,
      sms_otp: phoneNumberOTP,
      email_otp: emailOTP,
    };
    const OTP_send = await axios.post(VERIFY_OTP, JSON.stringify(otpToSend));
    toast(OTP_send.data.msg);
    if (
      OTP_send.data.msg === "Success" ||
      OTP_send.data.msg === "Time expired"
    ) {
      setSendOTPs(false);
      if (OTP_send.data.msg === "Success") {
        handleOTPSuccess();
        try {
          await axios.post(
            AUDIT_LOGS,
            JSON.stringify({
              username: user,
              action: "OTP",
              success: true,
              message_context: "OTPverified",
            })
          );
        } catch (error) {
          console.log("OTP verification success audit log error:", error);
        }
      }
    }
    else {
      try {
        await axios.post(
          AUDIT_LOGS,
          JSON.stringify({
            username: user,
            action: "OTP",
            success: false,
            message_context: "OTPverified",
          })
        );
      } catch (error) {
        console.log("OTP verification failure audit log error:", error);
      }
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">OTP Verification Page</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col className="pr-1" md="6">
                    <Form.Group>
                      <label>Username (disabled)</label>
                      <Form.Control
                        disabled
                        placeholder="Company"
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="pl-1" md="6">
                    <Form.Group>
                      <label>Current Status</label>
                      <Form.Control
                        defaultValue="Not Verified"
                        placeholder="Username"
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                {sendOTPs ? (
                  <>
                    <Row>
                      <Col md="12">
                        <strong>
                          Write down Email and SMS OTPs for verification
                        </strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>Email OTP</label>
                          <Form.Control
                            type="text"
                            name="emailOTP"
                            value={emailOTP}
                            onChange={handleEmailOTPChange}
                            placeholder="Email OTP"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="6">
                        <Form.Group>
                          <label>SMS OTP</label>
                          <Form.Control
                            type="text"
                            name="phoneNumberOTP"
                            value={phoneNumberOTP}
                            onChange={handleNumberOTPChange}
                            placeholder="SMS OTP"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row></Row>
                    <br />
                    <Button
                      className="btn-fill pull-right"
                      type="button"
                      onClick={handleSubmitOTPs}
                      variant="info"
                    >
                      Submit OTPs
                    </Button>
                    <div className="clearfix"></div>
                  </>
                ) : (
                  <>
                    <Row>
                      <Col md="12">
                        <strong>
                          OTP would be send to the following email address and
                          phone number for verification:
                        </strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>Email</label>
                          <Form.Control
                            type="text"
                            name="email"
                            value={email}
                            disabled
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="6">
                        <Form.Group>
                          <label>Phone Number</label>
                          <Form.Control
                            type="text"
                            name="phoneNumber"
                            value={phoneNumber}
                            disabled
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row></Row>
                    <br />
                    <Button
                      className="btn-fill pull-right"
                      type="button"
                      variant="info"
                      onClick={handlesendOTPs}
                    >
                      Send OTPs
                    </Button>
                    <div className="clearfix"></div>
                  </>
                )}
                <br />
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default OTPPage1;
