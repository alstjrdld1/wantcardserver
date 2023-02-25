const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // bodyparser 불러오는거 이제 express 서버한테 바디파서 쓴다고 말해야함
const mysql = require('mysql');
const cors = require('cors');

// router
const router = require('./router/index')

const port = process.env.PORT || 3001;

app.listen(port, function(){
  console.log(`Server is running on port ${port}`);
})

// main에다가 app.use로 바디 파서같은거 선언하면 그 아래에 app.use('/main', main)여기에도 쓸 수 있다.
app.use(cors());
app.use(bodyParser.json()); // bodyparser 쓸거임 클라이언트에서 오는 정보가 json일수 있다.

// json으로 key value로 보낼 수 있음 선언
app.use(bodyParser.urlencoded({extended:true})); // client랑 서버랑 데이터 주고 받을 때 인코딩 하는데 아스키 형태의 데이터만 주고 받을 수 있는데
// 한글같은거는 다른 문자로 치환하는데 인코딩이다. 그런거도 받아주게 하겠다.

// router 모듈화 써서 main 선언
app.use(router)
