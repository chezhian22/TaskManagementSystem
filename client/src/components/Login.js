import React, { useEffect, useState } from 'react';
import axios from "axios";

import {  useNavigate } from 'react-router-dom';
function Login() {
  const [mail,smail]=useState("");
  const [password,spassword]=useState("");
  const navigate=useNavigate();

  const login = () => {
    
    axios.post("http://localhost:5000/login",{
      mail: mail,
      password: password
    }
  ).then((response) => {
        console.log(response.data[0][0].role)
         
        if(response.data[0][0].role=="User"){
          localStorage.setItem("id",response.data[0][0].id)
        navigate("/user")
        }
        else{
          navigate("/admin")
        }
    }).catch((msg)=>{
      console.log(msg)
     
    })
  }

  function handlesubmit(e){
    e.preventDefault();
  }
  
  return (
        <div className="login">
      <h1>Task Management System</h1>
      <div className='login-cont'>
      <div className='login-img'>
        <img src='https://img.freepik.com/free-vector/discipline-abstract-concept_335657-3018.jpg'/>
      </div>
      <form className="login-box" onSubmit={handlesubmit}>
      <div>
        <h2>Login</h2>
        <div >
         
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e)=>smail(e.target.value)}
            value={mail}
          />
        </div>
        <div>
         
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e)=>spassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <button type="button" className="button1" onClick={login}>
            Login
          </button>
        </div>
       
 
        <div>
          <p>if you're not signup</p>
        <button type="submit" onClick={()=>{navigate("/")}} style={{marginBottom:"10%"}}className="button2">
            Signup
        </button> 
        </div>
      </div>
    </form>

      </div>
   
  </div>

  );
}

export default Login;