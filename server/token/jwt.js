const jwt = require('jsonwebtoken');
//Key
const secretKey = 'Azir32';

function jwtFun(...data) {
  var result = jwt.sign({ ...data }, secretKey, {
    expiresIn: 60 * 24 * 60,
  });

  const token = result;
  return token;
}

function verifyJWT(req, res, next) {
  var token = req.headers.authorization.split(' ')[1];
  if (!token)
    return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) return res.status(201).json({ Erro: err });
    return res.json({
      auth: true,
      token: decoded,
    });
  });
}

module.exports = { jwtFun, jwt, verifyJWT };

/*
res
        .status(500)
        .json({ auth: false, message: 'Failed to authenticate token.' });
*/
