const express=require("express");
const conn =require('../auth/database-auth.js');
const app=express();
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();
const createMatch=(req,res)=>{
    try {
        const {team_1,team_2,date,venue}=req.body;
        if(!team_1||!team_2||!date||!venue){
            return res.send({error:"Please fill all the details"});
        }
        else{
            const token = req.headers.authorization.split(" ")[1];
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if(decoded){
                    conn.query("INSERT INTO matches SET ?",req.body,(err,result)=>{
                        if(err) throw err;
                        res.send({
                            "status":"match created successfully",
                            "match_id":result.insertId
                        });
                    });    
                }
            }
            else res.send({"status":"Please Log in first to use this api"});
        }
    } catch (error) {
        res.send(error);
    }
};
const getMatch=(req,res)=>{
    try {
        conn.query("SELECT * from matches",(err,result)=>{
            if(err) throw err;
            res.send(result);
        })
    } catch (error) {
        res.send(error);
    }
};

const getParticularMatch=(req,res)=>{
    try {
        conn.query("SELECT * FROM matches where id=?",[req.params.id],(err,result)=>{
            if(err||result.length==0){
                res.send({"status":"No such matches found"});
            }
            else{
                res.send(result);
            }
        });
    } catch (error) {
        res.send(error);
    }
}
module.exports={createMatch,getMatch,getParticularMatch};