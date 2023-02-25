var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

var main = require('./main/index');
var join = require('./join/index');

router.get('/', function(req,res){
  console.log('indexjs/path loaded');
  res.send('index.js');
});

router.use('/main', main);
router.use('/join', join);

module.exports = router;
