var express = require('express');
var router = express.Router();
const pool = require('../db');


router.get('/getCoordinate',async function(req,res,next){
    const {pincode}  = req.query;
    try {
        const result = await pool.query('select * from pincode where pincode=$1',[pincode]);
        res.status(200).json(result.rows[0]);
    }
    catch(error) {
        console.log(error)
        res.status(500).json('Internal Server Error');
    }
});

module.exports = router;