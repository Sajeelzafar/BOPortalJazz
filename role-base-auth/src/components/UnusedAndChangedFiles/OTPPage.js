import React, { useState } from "react";
import { Link } from "react-router-dom";
import Username from "../../formComponents/Username";
import Popup from "../Popup";
import axios from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const OTPPage = () => {
  const [validateUser, setValidateUser] = useState(false);
  const [userSelected, setUserSelected] = useState({});
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sendOTPs, setSendOTPs] = useState(false);
  const [emailOTP, setEmailOTP] = useState("");
  const [phoneNumberOTP, setphoneNumberOTP] = useState("");
  const [otpId, setOtpId] = useState(0);

  const GET_OTP = "/api/otpgenerate";
  const VERIFY_OTP = "/api/otpverify";

  const handleSubmitUser = (data) => {
    if (data.successfully_verified) {
      toast(`${data.username} is already verified`);
    } else {
      setValidateUser(true);
      setUserSelected(data);
    }
  };

  const handleAnotherUser = () => {
    setValidateUser(false);
  };

  const handleEmailChange = ({ target }) => {
    setEmail(target.value);
  };

  const handleNumberChange = ({ target }) => {
    setPhoneNumber(target.value);
  };

  const handlesendOTPs = async () => {
    if (email.trim() === "" || phoneNumber.trim() === "") {
      toast("Either email or phone number is not entered");
    } else if (/\S+@\S+\.\S+/.test(email) && /^[0-9]{11}$/.test(phoneNumber)) {
      setEmail("");
      setPhoneNumber("");
      setSendOTPs(true);
      const OTP_response = await axios.post(
        GET_OTP,
        JSON.stringify({ user_id: userSelected.id })
      );
      setOtpId(OTP_response.data.otp_id);
    } else {
      toast("Either email or phone number is not in correct format");
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
    console.log(OTP_send.data.msg);
    if (
      OTP_send.data.msg === "Success" ||
      OTP_send.data.msg === "Time expired"
    ) {
      setValidateUser(false);
      setSendOTPs(false);
      console.log("Hello");
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
              {validateUser ? (
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Username (disabled)</label>
                        <Form.Control
                          defaultValue={userSelected.username}
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
                            To validate the user enter the email address and
                            phone number to which OTP should be sent for
                            verification:
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
                              onChange={handleEmailChange}
                              placeholder="Email"
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
                              onChange={handleNumberChange}
                              placeholder="Phone Number"
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
                  <Button type="button" onClick={handleAnotherUser}>
                    Select another User
                  </Button>
                </Form>
              ) : (
                <Username
                  validateUser={validateUser}
                  handleSubmitUser={handleSubmitUser}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default OTPPage;
