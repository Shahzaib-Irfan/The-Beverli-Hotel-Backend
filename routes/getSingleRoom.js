const express = require("express");
const router = express.Router();
const { db } = require("../database/mongo");
const {Room} = require('../models/schema');

router.get("/", (req, response) => {
    const id = req.query.id;
    console.log(id);
    Room.find({_id: id}).then((res) =>{
        if(res) response.send(res);
        else{
            console.log("error")
        }
    }
    )
    }
    
);

module.exports = router;
