const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

const bodyParser = require('body-parser'); // bodyparser 불러오는거 이제 express 서버한테 바디파서 쓴다고 말해야함
const db = require('../../utils/db.js');

router.get('/', function(req, res){
  console.log("Request on /join");
  res.send("join/indx.js");
});

router.post('/', function(req,res){
  console.log(req.body);
});

router.post('/signup', function(req,res){
  console.log("/join/signup");
  
  const {id, password} = req.body;
  console.log(req.body);

  const signupQuery = `INSERT INTO user (user_id, id, password, info) VALUES (1, '${id}', '${password}', 1)`;

  db.queryDatabase(signupQuery).then(results => {
    console.log(results);
    res.status(200).send('New record added successfully');
  }).catch(error => {
    console.log("Error");
    console.log(error);
    res.status(500).send('Error adding new record');
  });

});

module.exports = router; // 이렇게 export되어서 다른 곳에서 쓸 수 있음