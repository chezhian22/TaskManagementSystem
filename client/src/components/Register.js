import React, {  useState } from 'react';
import axios from "axios";
import {Route, Routes, useNavigate} from "react-router-dom"

function Register() {
  const navigate = useNavigate();
  const [mail,smail]=useState("");
  const [role,srole]=useState("");
  const [name,sname]=useState("");
  const [password,spassword]=useState("");
  function handlesubmit(e){
    e.preventDefault();
  }
 function submitdata(){
    
  axios.post("http://localhost:5000/signup",{
    name:name,
    mail:mail,
    role:role,
    password:password
  }
).then((response) => {
    navigate("/login")
    console.log(response.data)

    
}).catch((msg)=>{
     navigate("/login")
    console.log(msg);
});
 }
  return (
    <div className="login">
      <h1>Task Management System</h1>
      <div className='login-cont'>
      <div className='login-img'>
        <img src='https://img.freepik.com/premium-vector/task-management-abstract-concept-vector-illustration_107173-25705.jpg'/>
      </div>
      <form  className="login-box" onSubmit={handlesubmit}>
      <div>
        <h2 >Signup</h2>
        <div >
         
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e)=>smail(e.target.value)}
            value={mail}
          />
        </div>
        <div >
        
          <input
            type="text"
            placeholder="Enter Name"
            onChange={(e)=>sname(e.target.value)}
            value={name}
          />
        </div>
        <div class="select-container">
         
         <select onChange={(e)=>srole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
         </select>
        </div>
        
        <div >
          
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e)=>spassword(e.target.value)}
            value={password}
          />
        </div>
        
    
        <div>
          <button className="button1" type="submit" onClick={submitdata} >
            Signup
          </button>
        </div>
      </div>
    </form>
      </div>
    
  </div> 
    
  );
}

export default Register;