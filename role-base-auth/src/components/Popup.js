import React from "react";
import { Link } from "react-router-dom";
import "./Popup.css";
import { Button, Modal } from "react-bootstrap";

const Popup = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {props.children}
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Popup;

// return (props.trigger ? (
//   <div className="popup">
//     {/*Later add Parameter to classname to send to design different CSS styles for popup*/}
//     <div className="popup-inner">
//       <Link to="/">Back to homepage</Link>
//
//     </div>
//   </div>
// ) : (
//   ""
// );)
