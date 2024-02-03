import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";

function Nav({ user }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      
      <FaCircleUser style={{marginTop:"6px",marginLeft:"5px",height:"25px",width:"25px", cursor: "pointer"}} onClick={handleShow}/>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="detail-head">
            <h2>User details</h2>
            <FaCircleUser style={{height:"80px",width:"80px", marginLeft:"100px"}}/>
          </div>
          <div class="user-details">
            <div>
              <label for="userName">Name:</label>
              <span id="userName">{user.map((user) => user.name)}</span>
            </div>
            <div>
              <label for="userRole">Role:</label>
              <span id="userRole">{user.map((user) => user.role)}</span>
            </div>
            <div>
              <label for="userEmail">Email:</label>
              <span id="userEmail">{user.map((user) => user.mail)}</span>
            </div>
            <div>
              <label for="userPassword">Password:</label>
              <span id="userPassword">********</span>
            </div>
            <button>Change password</button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Nav;
