import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import Header from "../Header";
import Navbar from "../Navbar";
import moment from "moment";
import Timelines from "./Timeline";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Home = ({ tasks }) => {

  const [search, setSearch] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    console.log("clicked");
  };

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

  const handleSearch = () => {
    const filtered = tasks.filter(
      (task) =>
        task.taskname.toLowerCase().includes(search.toLowerCase()) ||
        task.taskdesc.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [tasks, search]);

  const completedTask = tasks.filter((task) => task.status === 1).length;
  const totalTask = tasks.length;
  const percentage = ((completedTask / totalTask) * 100).toFixed(2);

  const asce = () => {
    const sortedTasksDescending = tasks.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
    handleSearch();
  };

  const desce = () => {
    const sortedTasksDescending = tasks.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    handleSearch();
  };

  return (
    <div>
      <Header />
      <div className="mid-page">
        <div>
          <Navbar />
        </div>
        <div className="task-con">
          <h1>All tasks</h1>
          <ButtonGroup className="sort">
            <DropdownButton
              as={ButtonGroup}
              title="Sort by"
              id="bg-nested-dropdown"
              variant="secondary"
            >
              <Dropdown.Item eventKey="1" onClick={asce}>
                ascending
              </Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={desce}>
                descending
              </Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>

          <div className="top">
            <div className="search">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>

            <div className="progressbar">
              <h5>Tasks completed percentage:</h5>
              <ProgressBar now={percentage} label={`${percentage}%`} />
            </div>
          </div>

          <div className="container">
            {filteredTasks.map((task) => (
              <div key={task.id} className="content">
                <h3>{task.taskname}</h3>
                <h5>{task.taskdesc}</h5>
                <p>Due date:{moment(task.date).format("YYYY-MM-DD")}</p>
                <button
                  onClick={() => handleStatus(task.id, task.status)}
                  style={{
                    background: task.status === 1 ? "green" : "red",
                    color: "white",
                  }}
                >
                  {task.status === 1 ? "Completed" : "Uncompleted"}
                </button>
                <Timelines date={task.date} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
