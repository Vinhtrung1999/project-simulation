const jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY;
require('dotenv').config();

const checkToken = (req, res, next) => {
  try {
    let tokenIn = req.body.token;
    let { username } = jwt.verify(tokenIn, privateKey);
    // TODO do anything with username
    console.log(username);

    next();
  }
  catch (err) {
    return res.json({ code: 99, err })
  }
}

const checkTokenURL = (req, res, next) => {
  try {
    let tokenIn = req.query.token;
    let { username } = jwt.verify(tokenIn, privateKey);
    // TODO do anything with username
    console.log(username);

    next();
  }
  catch (err) {
    return res.json({ code: 99, err })
  }
}

module.exports = {
  checkToken,
  checkTokenURL,
}