const jwt = require('jsonwebtoken');
//Key
const secretKey = 'Azir32';

function jwtFun(...data) {
  var result = jwt.sign({ ...data }, secretKey, {
    expiresIn: 60 * 24,
  });

  const token = result;
  return token;
}

function decodeJwt(token) {}
module.exports = { jwtFun, jwt, decodeJwt };
