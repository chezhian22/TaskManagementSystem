import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import Header from "../Header";



const Admin = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTasks();
  }, []);

  const enterIn = (id) => {
    localStorage.setItem("id", id);
    navigate("/home");
  };

  const deletUser =(id)=>{
     axios.post("http://localhost:5000/users",{
    id:id
   }).then((response)=>{
    console.log(response)
   })
   window.location.reload();
  }
 const filteredUsers = users.filter((user)=> user.role=="User");
  return (
    <div className="admin">
      <Header/>
      <h1>Admin page</h1>
      <div className="container">
        {filteredUsers.map((user) => (
          <div className="content" key={user.id}>
            <button onClick={()=> deletUser(user.id)}><RiDeleteBin5Line /></button>
            <h2>{user.name}</h2>
            
            <button  onClick={() => enterIn(user.id)}>view</button>
            <Form/>
          </div>
        ))}
      </div>
      <div className="admin-role">
        <h2>Role</h2>
        <h4>You can assign tasks to any user, monitor them, and delete them as needed.</h4>
      </div>

      <div>
      </div>
    </div>
  );
};

export default Admin;
