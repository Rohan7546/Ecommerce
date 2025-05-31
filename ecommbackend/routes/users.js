var express = require('express');
var router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const privateKey = "herosing"
/* GET users listing. */
router.get('/', function(req, res, next) {
   res.send('fljkdsfsfsdssfsffsslfsj')
});

router.post('/',async function(req,res, next){
  const {firstName,lastName,userEmail,password} = req.body;
  console.log(firstName,lastName);
  try {
    bcrypt.hash(password, saltRounds, async function(err,hash){
      console.log(firstName,lastName);
      const result = await pool.query('INSERT INTO ecommuser (firstName,lastName,userEmail,password) VALUES($1,$2,$3,$4) RETURNING *',[firstName,lastName,userEmail,hash]);  
      res.json(result.rows);
    })
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

router.post('/login', async function (req,res,next) {
  console.log(req.body)
  const {userEmail,password}=req.body;
   console.log('hello')
  try  { 
     
      const result = await pool.query('SELECT * FROM ecommuser WHERE userEmail = $1',[userEmail]);
      const data = result?.rows[0];
      console.log(result.rows, password);
      bcrypt.compare(password,data.password , function(err, result){
          
        if(result) {
          

          const token = jwt.sign({payload: data.firstName},privateKey, {expiresIn: '1h'});
          console.log(token);
          res.status(200).json({token});
        }
        else {
          res.status(401).send('unauthorized')
        }
      })
        
  }
  catch (err){
      console.log(err.message);
      res.status(401).send('unauthorized');
  }
  
})

router.post('/register', async function(req,res,next){
  console.log(req.body);
  const userData = req.body
  try {
    bcrypt.hash(userData.password, saltRounds, async function(err,hash){
      const result = await pool.query('INSERT INTO ecommuser (firstName,lastName,userEmail,password) VALUES($1,$2,$3,$4) RETURNING *',[userData.firstName,userData.lastName,userData.userEmail,hash]);  
      const token = jwt.sign({payload: userData.firstName}, privateKey, {expiresIn: '1h'});
       
      res.status(200).json({token});
    })    
  }
  catch(err){
    console.log(err)
    res.status(500).send('server error');
  }
})

module.exports = router;
