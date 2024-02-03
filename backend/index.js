import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "semmozhi9944191756",
  database: "todoist",
});
app.get("/tasks", (req,res)=>{
    const q = "SELECT * FROM tasks"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.post("/alltasks", async(req,res)=>{
  
    const { id } = req.body;
  
    
    try{
        const users = await db.promise().query("select * from tasks1 where userid=?",[id]);
        res.json(users)
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.post("/tasks1", (req, res) => {
    const q = "INSERT INTO tasks1 (`taskname`, `taskdesc`,`important`,`status`,`userid`,`date`) VALUES (?, ?, ?, ?,?,?)";
    const values = [
        req.body.taskname,
        req.body.desc,
        req.body.important,
        req.body.completed,
        req.body.userid,
        req.body.date,
    ];
    console.log(values)

    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("success fully created");
    });
});
app.get("/users" ,(req, res)=>{
    const q = "SELECT * FROM users"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.post("/date",async(req,res)=>{
    const {date} = req.body;
    console.log(date)
    try{
        await db.promise().query("insert into date2 (date) values(?)",[date])
        res.json("success") 
    }
    catch(err){
        res.status(500).send(err)
    }

})
app.post("/users", async(req, res)=>{
    const {id} = req.body;

    try{
        await db.promise().query("DELETE FROM tasks1 WHERE userid=?",[id]);
        await db.promise().query("DELETE FROM users WHERE id=?",[id]);
        
        res.json("success") 
    }
    catch(err){
        res.status(500).send(err)
    }
});

app.post("/update", async(req, res)=>{
    const {id,status} = req.body;
    console.log(status)
    console.log(id)
    try{
        await db.promise().query("UPDATE tasks1 SET status=? WHERE id=?",[status,id]);
        res.json("updated")
    }
    catch(err){
        res.status(500).send(err)
    }
    
});

app.post("/user" ,async(req, res)=>{  
    const {id} = req.body;
    try{
        const users = await db.promise().query("select * from users where id=?",[id]);
        res.json(users)
    }
    catch(err){
        res.status(500).send(err)
    }
})


app.post("/signup", async(req,res)=>{
  
    const { name, mail, password, role } = req.body;
    console.log(name,mail,password,role)
    try{
        const items = await db.promise().query("insert into users (name,role,password,mail,wallet) values(?,?,?,?,?)", [name,role,password,mail,0]);
        res.send("success") 
    }
    catch(err){
        res.status(500).send(err)   
        console.log(err)
    }
    
})
app.post("/login", async(req,res)=>{
  
    const { mail,password } = req.body;
   console.log(mail,password)
    
    try{
        const users = await db.promise().query("select * from users where mail=?  and password=?",[mail,password]);
        res.json(users) 
    }
    catch(err){
        res.status(500).send(err)
    }
    
})
