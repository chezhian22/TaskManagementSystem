import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Nav from "./pages/Nav";
import Badge from "react-bootstrap/Badge";

const Header = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let id = localStorage.getItem("id");

    const fetchAllTasks = async () => {
      try {
        const res = await axios.post("http://localhost:5000/user", {
          id: id,
        });
        setUsers(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTasks();
  }, []);
  console.log(users.map((user) => user.name));

  return (
    <div className="header">
      <div className="head-left">
        <h1>DirectTask</h1>
      </div>
      <div className="head-right">
        <Link to="/login">
          <Badge bg="warning" text="dark">
            Signout
          </Badge>
        </Link>
        <h4>Hello {users.map((user) => user.name)} !</h4>
        <Nav user={users} />
      </div>
    </div>
  );
};

export default Header;
