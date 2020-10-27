const jwt = require('jsonwebtoken');
//Key
const secretKey = 'Azir32';

function jwtFun(...data) {
  var token = jwt.sign({ ...data }, secretKey, {
    expiresIn: 60 * 24,
  });

  const result = {
    success: true,
    message: 'Usuario Enconstrado',
    token: token,
  };
  return result;
}
module.exports = { jwtFun, jwt };
