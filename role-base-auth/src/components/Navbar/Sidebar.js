import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Accordion, Nav } from "react-bootstrap";
import jazzcashlogo from "../../assets/JazzCash_logo.png";
import sidebarImage from "../../assets/img/sidebar-3.jpg";
import useAuth from "../../hooks/useAuth";
import { v4 as uuidv4 } from "uuid";
import "./sidebarStyling.css";

function Sidebar() {
  const { auth } = useAuth();
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const navbarIcons = {
    PROFILE: "nc-icon nc-single-02",
    HOME: "nc-icon nc-bank",
    ROLE_ASSIGNMENT: "nc-icon nc-circle-09",
    PARTNER_MANAGE: "nc-icon nc-planet",
    PERMISSION_MANAGE: "nc-icon nc-key-25",
    USER_MANAGEMENT: "nc-icon nc-notes",
    AUDIT_LOGS: "nc-icon nc-credit-card",
  };

  const billProcessingAccordionItems = auth?.permissions
    .filter((permission) => permission === "BILL_PROCESSING")
    .map((permission) => (
      <React.Fragment key={uuidv4()}>
        <li className={activeRoute(`/${permission.toLowerCase()}1`)}>
          <NavLink
            className="nav-link"
            activeclassname="active"
            to={`/${permission.toLowerCase()}1`}
          >
            <i className="nc-icon nc-single-copy-04" />{" "}
            {permission.replace("_", " ")} 1
          </NavLink>
        </li>
        <li className={activeRoute(`/${permission.toLowerCase()}2`)}>
          <NavLink
            className="nav-link"
            activeclassname="active"
            to={`/${permission.toLowerCase()}2`}
          >
            <i className="nc-icon nc-single-copy-04" /> File Upload (csv)
          </NavLink>
        </li>
      </React.Fragment>
    ));

  const managementAccordionItems = auth?.permissions
    .filter(
      (permission) =>
        permission === "PARTNER_MANAGE" ||
        permission === "PERMISSION_MANAGE" ||
        permission === "USER_MANAGEMENT"
    )
    .map((permission) => (
      <React.Fragment key={uuidv4()}>
        <li className={activeRoute(`/${permission.toLowerCase()}`)}>
          <NavLink
            className="nav-link"
            activeclassname="active"
            to={`/${permission.toLowerCase()}`}
          >
            <i className={navbarIcons[permission]} />{" "}
            {permission.replace("_", " ")}
          </NavLink>
        </li>
      </React.Fragment>
    ));

  return (
    <div className="sidebar" data-image={sidebarImage} data-color="black">
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + sidebarImage + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="https://www.jazzcash.com.pk/"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img src={jazzcashlogo} alt="..." />
            </div>
          </a>
          <a className="simple-text" href="https://www.jazzcash.com.pk/">
            Jazzcash Portal
          </a>
        </div>
        <Nav>
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item style={{ background: "transparent" }} eventKey="0">
              <Accordion.Header>Bill Processing Menu</Accordion.Header>
              <Accordion.Body>{billProcessingAccordionItems}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion defaultActiveKey="1" flush>
            <Accordion.Item style={{ background: "transparent" }} eventKey="1">
              <Accordion.Header>Management Menu</Accordion.Header>
              <Accordion.Body>{managementAccordionItems}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {auth?.permissions?.map((permission) => {
            if (permission === "BILL_PROCESSING") {
              return <React.Fragment key={uuidv4()}></React.Fragment>;
            } else if (
              permission === "PARTNER_MANAGE" ||
              permission === "PERMISSION_MANAGE" ||
              permission === "USER_MANAGEMENT"
            ) {
              return <React.Fragment key={uuidv4()}></React.Fragment>;
            } else {
              return (
                <li
                  className={activeRoute(permission.toLowerCase())}
                  key={uuidv4()}
                >
                  <NavLink
                    className="nav-link"
                    activeclassname="active"
                    to={`/${permission.toLowerCase()}`}
                  >
                    <i className={navbarIcons[permission]} />
                    {permission.replace("_", " ")}
                  </NavLink>
                </li>
              );
            }
          })}
          <li>
            <NavLink className="nav-link" activeclassname="active" to="/login">
              <i className="nc-icon nc-button-power" />
              Log Out
            </NavLink>
          </li>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
