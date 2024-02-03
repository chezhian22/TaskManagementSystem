import React,{useEffect,useState} from "react";
import { Route, Routes } from "react-router-dom";
import Completed from "./pages/Completed";
import Uncompleted from "./pages/Uncompleted";
import Important from "./pages/Important";
import Home from "./pages/Home";
import Register from "./Register";
import Login from "./Login";
import Admin from "./pages/Admin";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function App() {

  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    let id = localStorage.getItem("id");
    axios.post("http://localhost:5000/alltasks",{
      id:id
      }
    ).then((response) => {
          // console.log(response.data[0][0].taskname)
          setTasks(response.data[0])
          console.log(response.data[0])
          
      }).catch((msg)=>{
        console.log(msg)
      })
  }, []);
  return (
    <div>
      
      <div >
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home tasks={tasks}/>} />
          <Route path="/completed" element={<Completed tasks={tasks} />} />
          <Route path="/uncompleted" element={<Uncompleted tasks={tasks}/>} />
          <Route path="/important" element={<Important tasks={tasks}/>} />
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
