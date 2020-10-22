const bcrypt = require('bcrypt')

function hashingPass(password){
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function comparePass(password, hashPass){
    return bcrypt.compareSync(password, hashPass)
}

module.exports = { hashingPass, comparePass };

