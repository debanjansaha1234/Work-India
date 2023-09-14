const express=require("express");
const conn =require('./auth/database-auth.js');
const app=express();
const adminRouter=require("./routes/admin.js");
const matchRouter=require("./routes/match.js");
const playerRouter=require("./routes/player.js");


app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({extended:true}));
app.use("/api/admin",adminRouter);
app.use("/api/players",playerRouter);
app.use("/api/matches",matchRouter);


app.listen('8000',()=>{
    console.log("Port Running");
    conn.connect((err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Database Conn");
        }
    }); 
});