import React from "react";
import Badge from 'react-bootstrap/Badge';
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/completed">Completed Tasks</Link>
        </li>
        <li>
          <Link to="/uncompleted">Uncompleted Tasks</Link>
        </li>
        <li>
          <Link to="/important">Important Tasks</Link>
        </li>
      </ul>
      <button className="dark">Darkmode</button>
    </nav>
    
  );
};

export default Navbar;
