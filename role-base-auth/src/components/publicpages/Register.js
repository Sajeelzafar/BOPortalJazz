import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
} from "mdb-react-ui-kit";
import "./Login.css";
import backgroundImg from "../../assets/registerbackground.jpg";
import OTPPage1 from "./OTPPage1";
import axios from "../../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^.{6,}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  const REGISTER_URL = "/api/register";
  const AUDIT_LOGS = "/api/auditlogs";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleOTPSuccess = async() => {
    try {
      const registersuccess = await axios.post(REGISTER_URL, JSON.stringify({ user, pwd, email, phoneNumber }), {
        headers: { "Content-Type": "application/json" },
      });

      if(registersuccess) {
        try {
          await axios.post(AUDIT_LOGS, JSON.stringify({ username: user, action: "REGISTER", success: true, message_context: "userCreated"}));
          
        } catch (error) {
          console.log('Register success audit log error:', error);
        }
      }
      else {
        try {
          await axios.post(AUDIT_LOGS, JSON.stringify({ username: user, action: "REGISTER", success: false, message_context: "userCreated"}));
        } catch (error) {
          console.log('Register failure audit log error:', error);
        }
      }
      navigate("/login", { state: { fromRegister: true, register: true }});
    } catch (error) {
      navigate("/login", { state: { fromRegister: true, register: false }});
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    } else {
        setSuccess(true);
        errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <OTPPage1 handleOTPSuccess={handleOTPSuccess} user={user} email={email} phoneNumber={phoneNumber} />
        </section>
      ) : (
        <MDBContainer fluid>
          <div
            className="p-5 bg-image"
            style={{
              backgroundImage: `url(${backgroundImg})`,
              height: "300px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>

          <MDBCard
            className="mx-5 mb-5 p-5 shadow-5"
            style={{
              marginTop: "-100px",
              background: "hsla(0, 0%, 100%, 0.8)",
              backdropFilter: "blur(30px)",
            }}
          >
            <MDBCardBody className="p-5 text-center">
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h2 className="fw-bold mb-5">Sign up now</h2>
              <form onSubmit={handleSubmit}>
                <MDBRow>
                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      ref={userRef}
                      placeholder="First name"
                      type="text"
                    />
                  </MDBCol>

                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      placeholder="Last name"
                      type="text"
                    />
                  </MDBCol>
                </MDBRow>

                <MDBInput
                  type="text"
                  id="username"
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  wrapperClass="mb-4"
                  placeholder="Username"
                />
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validName ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validName || !user ? "hide" : "invalid"}
                />

                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed. No spaces
                  allowed
                </p>

                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  required
                />

                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Phone Number"
                  type="number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  required
                />

                <MDBInput
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  wrapperClass="mb-4"
                  placeholder="Password"
                />

                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPwd || !pwd ? "hide" : "invalid"}
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Atleast 6 characters.
                  <br />
                </p>

                <MDBInput
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  wrapperClass="mb-4"
                  placeholder="Confirm Password"
                />

                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !matchPwd ? "hide" : "invalid"}
                />

                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must match the first password input field.
                </p>

                <MDBBtn
                  className="mb-4 gradient-custom-2 w-100 custom-button-height"
                  size="md"
                  disabled={
                    !validName || !validPwd || !validMatch ? true : false
                  }
                >
                  Sign up
                </MDBBtn>
              </form>
            </MDBCardBody>
            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Already registered?</p>
              <Link to="/login">
                <MDBBtn
                  outline
                  className="mx-2 custom-button-height"
                  color="danger"
                >
                  Login
                </MDBBtn>
              </Link>
            </div>
          </MDBCard>
        </MDBContainer>
      )}
    </>
  );
};
export default Register;
