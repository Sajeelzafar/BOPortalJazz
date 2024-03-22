import React from "react";
import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import "./Login.css";
import Jazzcashlogo from "../../assets/JazzCash_logo.png";
import OTPPage1 from "./OTPPage1";

const LOGIN_URL = "/api/auth";
const AUDIT_LOGS = "/api/auditlogs";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const fromRegister = location.state?.fromRegister;
  const register = location.state?.register;

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [responseData, setResponseData] = useState({});

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd })
      );
      try {
        await axios.post(
          AUDIT_LOGS,
          JSON.stringify({
            username: user,
            action: "LOGIN",
            success: true,
            message_context: "userSignIn",
          })
        );
      } catch (error) {
        console.log("Login success audit log error:", error);
      }
      console.log(response?.data);
      setResponseData(response?.data?.user);
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      try {
        await axios.post(
          AUDIT_LOGS,
          JSON.stringify({
            username: user,
            action: "LOGIN",
            success: false,
            message_context: "userSignIn",
          })
        );
      } catch (error) {
        console.log("Login failure audit log error:", error);
      }
      errRef.current.focus();
    }
  };

  const handleOTPSuccess = () => {
    const permissions = responseData?.permissions;
    setAuth({ id: responseData.id, user, pwd, permissions });
    setUser("");
    setPwd("");
    navigate(from, { replace: true });
  };

  return (
    <MDBContainer className="my-5 gradient-form">
      {fromRegister && (
        <section>
          {register ? (
            <>
              <h1>Success!</h1>
              <p>Please Log In to Continue</p>
            </>
          ) : (
            <>
              <h1>Unable to save user!</h1>
              <p>This maybe due to some format error</p>
            </>
          )}
        </section>
      )}
      {success ? (
        <section>
          <OTPPage1
            user={user}
            handleOTPSuccess={handleOTPSuccess}
            email={responseData?.email}
            phoneNumber={responseData?.phoneNumber}
          />
        </section>
      ) : (
        <MDBRow>
          <MDBCol col="6" className="mb-5">
            <div className="d-flex flex-column ms-5">
              <div className="text-center">
                <img src={Jazzcashlogo} style={{ width: "185px" }} alt="logo" />
                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <h4 className="mt-1 mb-5 pb-1">Welcome to Jazzcash Portal</h4>
              </div>

              <p>Please login to your account</p>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  wrapperClass="mb-4"
                  placeholder="Username"
                />
                <MDBInput
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  wrapperClass="mb-4"
                  placeholder="Password"
                />

                <div className="text-center pt-1 mb-5 pb-1">
                  <MDBBtn
                    className="mb-4 gradient-custom-2 custom-button-width custom-button-height"
                    noRipple
                  >
                    Sign in
                  </MDBBtn>

                  <br />
                  <a className="text-muted" href="#!">
                    Forgot password?
                  </a>
                </div>
              </form>
              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">Don't have an account?</p>
                <Link to="/register">
                  <MDBBtn
                    outline
                    className="mx-2 custom-button-height"
                    color="danger"
                  >
                    Create New Account
                  </MDBBtn>
                </Link>
              </div>
            </div>
          </MDBCol>

          <MDBCol col="6" className="mb-5">
            <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">We are more than just a company</h4>
                <p className="small mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      )}
    </MDBContainer>
  );
};

export default Login;
