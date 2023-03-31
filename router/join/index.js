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

// 회원가입 
router.post('/signup', function(req,res){
  console.log("/join/signup");
  
  const {id, password} = req.body;
  console.log(req.body);

  const signupQuery = `INSERT IGNORE INTO user (id, password) VALUES ('${id}', '${password}')`;

  db.queryDatabase(signupQuery)
  .then(results => {
    console.log("################## Results");
    console.log(results);

    // 회원가입 하고 uid얻는 코드 
    const resultSetHeader = results;

    console.log('Affected rows:', resultSetHeader.affectedRows);
    console.log('Insert ID:', resultSetHeader.insertId);
    
    res.status(200).json({uid: resultSetHeader.insertId});
  }).catch(error => {
    console.log("Error");
    console.log(error);
    res.status(500).send('Error adding new record');
  });
});

// 로그인
router.post('/login', function(req,res){
  console.log("/join/login");
  const {id, password} = req.body;

  // 로그인 하고 uid 얻는 코드 
  const getUidQuery = `SELECT user_id FROM user WHERE id='${id}' AND password='${password}'`;

  db.queryDatabase(getUidQuery)
  .then(result => {
    console.log(result[0].user_id);
    res.status(200).json({uid: result[0].user_id});
  })
  .catch(error => {
    console.log("Error");
    console.log(error);
    res.status(500).send('Error Getting user_id');
  });
});

router.post('/checkId', function(req, res){
  console.log("/join/checkId");

  const {id} = req.body;

  const checkIdQuery = `SELECT id FROM user WHERE id='${id}'`;
  db.queryDatabase(checkIdQuery)
  .then(result =>{
    if(result.length === 0){
      res.status(200).json({data: null, message: "사용가능한 아이디입니다"});
    }
    else{
      res.status(200).json( {data: result, message: "이미 사용중인 아이디입니다"});
    }
  })
  .catch(error => {
    console.log("Error");
    console.log(error);
    res.status(500).send('Error getting duplicate check');
  });
});

module.exports = router; // 이렇게 export되어서 다른 곳에서 쓸 수 있음