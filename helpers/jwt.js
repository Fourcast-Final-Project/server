const jwt = require('jsonwebtoken');

function generateToken(payload){
    return jwt.sign(payload, process.env.FORBIDDEN);
}

function verifyToken(token) {
  return jwt.verify(token, process.env.FORBIDDEN);
    // return new Promise(function(resolve, reject){
    //   jwt.verify(token, process.env.FORBIDDEN, function(err, decoded){
    //     if(err) reject ({ name: 'INVALID_TOKEN' })
    //     else resolve(decoded)
    //   })
    // })
  }

module.exports = { generateToken, verifyToken }