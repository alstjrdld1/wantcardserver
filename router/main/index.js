var express = require('express')
var app = express()
var router = express.Router(); // router라는 함수가 있음
var path = require('path'); // path라는 모듈 써서 상대경로를 알아낼 수 있음

router.get('/', function(req,res){
  res.send('main.js');
});

router.post('/', function(req,res){

});

// node에서는 외부 라이브러리를 가져다 export할 수 있고 require로 가져오기 가능
module.exports = router; // 이렇게 export되어서 다른 곳에서 쓸 수 있음
