var express = require('express');
var router = express.Router();
const pool = require('../db');
/* GET users listing. */
router.get('/', function(req, res, next) {
   res.send('fljkdsfsfsdssfsffsslfsj')
});

router.post('/',async function(req,res, next){
  const {firstName,lastName,userEmail,password} = req.body;
  try {
    const result = await pool.query('INSERT INTO ecommuser (firstName,lastName,userEmail,password) VALUES($1,$2,$3,$4) RETURNING *',[firstName,lastName,userEmail,password]);  
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

router.post('/login', async function (req,res,next) {
    const {userEmail,userPassword}=req.body;
    try  {'SELECT * FROM ecommuser WHERE userEmail = $1',
      [userEmail]
        const result = await pool.query('SELECT * FROM ecommuser WHERE userEmail = $1',[userEmail]);
        console.log(result);
        res.send(result);
    }
    catch (err){
        console.log(err.message);
        res.status(500).send('server error');
    }
    
})

module.exports = router;
