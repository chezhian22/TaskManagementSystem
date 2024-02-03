import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header";
import Navbar from "../Navbar";
import 'react-datepicker/dist/react-datepicker.css';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Important = ({ tasks }) => {
  const [search, setSearch] = useState("");
  const [searchtasks, setSearchtasks] = useState(tasks);

  const [date, setDate] = useState(null)

  const handleSearch = () => {
    const filtered = tasks.filter(
      (task) =>
        task.taskname.toLowerCase().includes(search.toLowerCase()) ||
        task.taskdesc.toLowerCase().includes(search.toLowerCase())
    );
    setSearchtasks(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [search, tasks]);

  const handleStatus = (id, status) => {
    if (status === 0) {
      status = 1;
    } else if (status === 1) {
      status = 0;
    }
    axios.post("http://localhost:5000/update", {
      id: id,
      status: status,
    });
    window.location.reload();
  };

  const asce =()=>{
    const sortedTasksDescending = tasks.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
    handleSearch()
  }

  const desce =()=>{
    const sortedTasksDescending = tasks.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    handleSearch()
  }

  const filteredTasks = searchtasks.filter((task) => task.important == 1);

  console.log(date)
  const now = 60;
  return (
    <div>
      <Header />
      <div className="mid-page">
        <div>
          <Navbar />
        </div>
        <div className="task-con">
          <h1>Important tasks</h1>
          <ButtonGroup className="sort">
            <DropdownButton
              as={ButtonGroup}
              title="Sort by"
              id="bg-nested-dropdown"
              variant="secondary"
            >
              <Dropdown.Item eventKey="1" onClick={asce} >ascending</Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={desce}>descending</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
          <div className="search">
            <input
              placeholder="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="container">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div key={task.id} className="content">
                  <h2>{task.taskname}</h2>
                  <h4>{task.taskdesc}</h4>
                  <button
                    onClick={() => handleStatus(task.id, task.status)}
                    style={{
                      background: task.status === 1 ? "green" : "red",
                      color: "white",
                    }}
                  >
                    {task.status === 1 ? "Completed" : "Uncompleted"}
                  </button>
                </div>
              ))
            ) : (
              <p style={{ marginLeft:"500px",marginTop:"50px"}}>No results found</p>

            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Important;
