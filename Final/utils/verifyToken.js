const jwt = require('jsonwebtoken');
const findUser = require('./findUserInDB');

const verifyToken = (cookie , secretKey , tokenTime) => {

    if(!cookie) return false

    const decoded = jwt.verify(cookie , secretKey)

    const expireToeken = decoded.iat;

    const userExists = findUser(decoded.user)

    if((Date.now() / 1000 - expireToeken) / 60 < tokenTime && userExists){
        return true
    }else{
        return false
    }
};

module.exports = verifyToken