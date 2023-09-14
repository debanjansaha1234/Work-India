const express=require("express");
const { getMatch,getParticularMatch,createMatch} = require("../controllers/match");

const router=express.Router();

router.get("/",getMatch);
router.post("/",createMatch);
router.get("/:id",getParticularMatch);

module.exports=router;