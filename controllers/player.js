const express=require("express");
const conn =require('../auth/database-auth.js');
const app=express();

const getPlayer=(req,res)=>{
    try {
        conn.query("SELECT * from player WHERE id=?",[req.params.id],(err,result)=>{
            if(err||result.length==0){
                res.send({"status":"No such player found"});
            }
            else{
                res.send(result);
            }
        });
    } catch (error) {
        res.send(error);
    }
}

module.exports={getPlayer};