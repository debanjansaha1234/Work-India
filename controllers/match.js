const express=require("express");
const conn =require('../auth/database-auth.js');
const app=express();

const createMatch=(req,res)=>{
    try {
        const {team_1,team_2,date,venue}=req.body;
        if(!team_1||!team_2||!date||!venue){
            return res.send({error:"Please fill all the details"});
        }
        else{
            conn.query("INSERT INTO matches SET ?",req.body,(err,result)=>{
                if(err) throw err;
                res.send({
                    "status":"match created successfully",
                    "match_id":result.insertId
                });
            });
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