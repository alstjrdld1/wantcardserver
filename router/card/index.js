var express = require('express')
var app = express()
var router = express.Router()
var path = require('path');

const bodyParser = require('body-parser'); // bodyparser 불러오는거 이제 express 서버한테 바디파서 쓴다고 말해야함
const db = require('../../utils/db.js'); // Database module is can be imported like this.

router.get('/', function(req, res){
  console.log("Request on /card");
  res.send("card/index.js");
});

router.post('/', function(req, res){
  console.log("Post request /card");

  const uid = req.body.uid;
  const getCardQuery = `SELECT card_file_name, card_nickname from user_card_info WHERE uid=${uid}`;

  db.queryDatabase(getCardQuery)
  .then(results => {
    console.log(results);
    res.status(200).json(results);
    console.log("DB read and send data success");

  }).catch(error => {
    res.status(500).send("Internal Error");
  });

});


module.exports = router; // 이렇게 export되어서 다른 곳에서 쓸 수 있음