import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Form = ({ onClose }) => {
  const [show, setShow] = useState(false);
  const id = localStorage.getItem("id");
  const [newtask, setNewtask] = useState({
    userid: id,
    taskname: "",
    desc: "",
    important: false,
    completed: false,
    date: ""
  });
  

  const handleChange = (e) => {
    setNewtask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckbox1 = () => {
    setNewtask((prev) => ({ ...prev, important: !prev.important }));
  };

  const handleCheckbox2 = () => {
    setNewtask((prev) => ({ ...prev, completed: !prev.completed }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/tasks1", newtask);
      
      setShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        assign
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
          <h1>Add new Task</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="popup">
            <div className="popup-element">
              <label>TaskName:</label>
              <input
                type="text"
                placeholder="taskname"
                name="taskname"
                onChange={handleChange}
                required
              />
            </div>
            <div className="popup-element">
              <label>Description:</label>
              <input
                type="text"
                placeholder="description"
                name="desc"
                onChange={handleChange}
              />
            </div>
            <div className="popup-element">
              <label>Important</label>
              <input
                type="checkbox"
                name="important"
                onChange={handleCheckbox1}
              ></input>
              <br></br>
            </div>
            <div className="popup-element">
              <label>Completed</label>
              <input
                type="checkbox"
                name="completed"
                onChange={handleCheckbox2}
              ></input>
              <br></br>
            </div>
            <div className="popup-element">
              <input type="date" name="date" onChange={handleChange} />
            </div>
            <div className="popup-element">
              <button onClick={handleClick}>ADD</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Form;
