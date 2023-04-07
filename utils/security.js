const crypto = require('crypto');

function myHash(inputStr){
    const hashed = crypto.createHash('sha256').update(inputStr).digest('hex');
    return hashed;
};

module.exports = {
    myHash: myHash
  };