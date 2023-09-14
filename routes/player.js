const express=require("express");
const { getPlayer } = require("../controllers/player");

const router=express.Router();
router.get("/:id/stats",getPlayer);


module.exports=router;