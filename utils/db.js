const mysql = require('mysql2/promise');

async function queryDatabase(sql){
  console.log("Trying to connect database ...");
  const connection = await mysql.createConnection(
    {
      host : 'localhost',
      port : '3306',
      user : 'root',
      password : '1124ms',
      database : 'wantcardDB'
    }
  );
  console.log("Connecting database success !");
  
  console.log("Trying to execute Query ...");
  console.log("Query : " + sql);
  const [results, fields] = await connection.execute(sql);
  console.log("Executing Query success !");

  console.log("Trying to disconnect database ...");
  connection.end();
  console.log("Disconnecting database success !");

  return results;
};


module.exports = {
    queryDatabase: queryDatabase
  };
  