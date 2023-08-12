const express = require("express");
const router = express.Router();
const { db } = require("../database/mongo");
const {Room} = require('../models/schema');

router.get("/", (req, response) => {
    Room.find({}).then((res) =>{
        if(res) response.send(res);
        else{
            console.log("error")
        }
    }
    )
    }
    
);

module.exports = router;
