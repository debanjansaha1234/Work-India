const express=require("express");
const conn =require('../auth/database-auth.js');
const app=express();
const jwt=require("jsonwebtoken");

const validator=require('validator');

const createAdmin=(req,res)=>{
    try {
        const {username,password,email}=req.body;
        const valSet=req.body;
        if(!username||!password||!email){
            return res.status(422).json({error:"Please fill all the details"});
        }
        else{
            if(!validator.isEmail(email)&&password.length <=5 && password.length >=15){
                return res.status(422).json({error:"Please enter valid email or password"});
            }
            else{
                conn.query("INSERT INTO admin SET ?",valSet,(err,result)=>{
                    if(err) throw err;
                    res.send({
                        "status":"Admin Account successfully created",
                        "status_code":200,
                        "user_id":result.insertId
                    });
                });
                   
            }
        }
    } catch (error) {
        res.send(error);
    }
}

const loginAdmin=(req,res)=>{
    try {
        const {username,password}=req.body;
        if(!username||!password){
            return res.status(422).json({error:"Please fill all the details"});
        }
        else{
            conn.query("SELECT * FROM admin WHERE username=? AND password=?",[username,password],(err,result)=>{
                if(result.length==0||err){
                    res.send({"status":"Incorrect Username/Password provided. Please retry"});
                }
                else{
                    const token = jwt.sign(
                        {
                          username:username,
                          password:password
                        },
                        process.env.JWT_SECRET,
                        {
                          expiresIn: "7d",
                        }
                    );
                    res.send({
                        "status":"Login successfull",
                        "status_code":"200",
                        "user_id":result[0].id,
                        "access-token":token
                    });
                }
            });
        }

    } catch (error) {
        res.send(error);
    }
}
module.exports={createAdmin,loginAdmin};