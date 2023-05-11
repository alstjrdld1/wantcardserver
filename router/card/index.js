var express = require('express')
var app = express()
var router = express.Router()
var path = require('path');
var fs = require('fs');

const bodyParser = require('body-parser'); // bodyparser 불러오는거 이제 express 서버한테 바디파서 쓴다고 말해야함
const db = require('../../utils/db.js'); // Database module is can be imported like this.

router.get('/', function(req, res){
  console.log("Request on /card");
  res.send("card/index.js");
});


router.post('/', async function(req, res){
  console.log("Post request /card");

  const returnData = {
    message: '',
    cards: []
  };

  const uid = req.body.uid; // parse uid from request

  // query setting database is user_card_info
  const getCardQuery = `SELECT card_file_name, card_nickname from user_card_info WHERE uid=${uid}`;

  try {
    const results = await db.queryDatabase(getCardQuery); // query shooting 
    console.log(results);

    for (let i = 0; i < results.length; i++) {
      const item = results[i];
      const buffer = await fs.promises.readFile(__dirname + '/cards/' + item.card_file_name);
      
      curCard = {
        fileName : item.card_file_name,
        nickName : item.card_nickname,
        image    : buffer.toString('base64')
      }
      returnData.cards.push(curCard);
    }

    res.status(200).json(returnData); // Data type casting into json format 
    console.log("DB read and send data success");

  } catch (error) {
    res.status(500).send("Internal Error");
  }

});

router.post('/upload', function(req, res){
  console.log("Post request /card/upload");

  const uid = req.body.uid;
  const nickName = req.body.nickName; 
  const img = req.body.img;

  // file명 자동으로 만들게 하기 
});


router.post('/card_image', function(req,res){
  console.log("Post request /card/card_image");

  const cardImages = req.body.fileNames;

  // Set response headers
  res.writeHead(200, {'Content-Type': 'image/jpeg'});

  cardImages.foreach(function(item){
    res.write(item);
  });

  res.end();
});


module.exports = router; // 이렇게 export되어서 다른 곳에서 쓸 수 있음