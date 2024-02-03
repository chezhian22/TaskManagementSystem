import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";


function Timelines({ date }) {
  const [show, setShow] = useState(false);

  const today = new Date();
  const formatedDate = moment(date).toDate();
  const formatedTodayDate = moment(today).toDate();
  const timeDiff = formatedDate - formatedTodayDate;
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  const renderPath = () => {
    const totalSegments = 10; 
    const pathSegments = Array.from({ length: totalSegments }, (_, index) => (
      <div
        key={index}
        className={`path-segment ${
          index < totalSegments - daysRemaining ? "completed" : ""
        }`}
      />
    ));
    return pathSegments;
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Timeline
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Timeline
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="timeline">
            <h2>
              Remaining days: {daysRemaining > 0 ? daysRemaining : "finished"}
            </h2>
            <div className="timeline-ele">
              <div className="path">{renderPath()}</div>
              <p>{formatedDate.toDateString()}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Timelines;
