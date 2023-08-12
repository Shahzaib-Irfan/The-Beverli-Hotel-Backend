const express = require("express");
const router = express.Router();
const { db } = require("../database/mongo");
const {BookingHistory} = require('../models/schema');

router.get("/", (req, response) => {
    BookingHistory.aggregate([
            {
                $group: {
                    _id: '$roomId',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 3
            }
        ]).then((res) =>{
        if(res) {
            console.log(res);
            response.send(res);
        }
        else{
            console.log("error")
        }
    }
    )
    }
    
);

module.exports = router;
