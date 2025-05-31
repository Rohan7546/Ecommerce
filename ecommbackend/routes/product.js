var express = require('express');
var router = express.Router();
const pool = require('../db');


router.post('/addProduct',async function(req,res,next){
    const pdata = req.body;

    try {
        const result = await pool.query('INSERT into productdata (productid, rating, productdescription, category, title, image, price, color) values(DEFAULT, $1,$2,$3,$4,$5,$6,$7)',
            [pdata.rating, pdata.productDescription, pdata.category, pdata.title, pdata.image, pdata.price, pdata.color]);
        res.status(201).json('created')
    }
    catch (error){
        console.log(error)
        res.status(500).json('Invalid');
    }
});

router.get('/getAllProduct', async function(req,res,next){
    try {
        const result = await pool.query('select * from productdata');
        res.status(200).json(result.rows);
    }
    catch(error) {
        console.log(error)
        res.status(500).json('Internal Server Error');
    }
})

router.get('/:id', async function(req,res,next){
    try {
        const {id} = req.params;
        const result = await pool.query('select * from productdata where productid=$1',[id]);
        console.log(result.rows[0])
        res.status(200).json(result.rows[0]);
    }
    catch (error){
        console.log(error)
        res.status(500).json('Internal Server Error');
    }
})

module.exports = router;