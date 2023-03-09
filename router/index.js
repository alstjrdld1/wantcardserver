var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

let main = require('./main/index');
let join = require('./join/index');
let card = require('./card/index');

router.get('/', function(req,res){
  console.log('indexjs/path loaded');
  res.send('index.js');
});

router.use('/main', main);
router.use('/join', join);
router.use('/card', card);

module.exports = router;
