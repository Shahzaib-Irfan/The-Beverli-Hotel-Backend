const express = require("express");
const router = express.Router();
const { db } = require("../database/mongo");
const {Room} = require('../models/schema');

router.get("/", (req, response) => {
    const id = req.query.id;
    console.log(id);
    Room.deleteOne({_id: id}).then((res) =>{
        console.log("Deleted");
    }
    ).catch((err) =>{
        console.log(err);
    })
    }
    
);

module.exports = router;
