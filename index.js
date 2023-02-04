const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8888;
const jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY;
const { checkToken, checkTokenURL } = require('./middleware');

app.use(express.json());

app.post('/home', checkToken, (req, res) => {
  let { greeting } = req.body;
  return res.json({ code: 0, message: greeting });
})

app.get('/', checkTokenURL, (req, res) => {
  let { greeting } = req.query;
  return res.json({ code: 0, message: greeting });
})

app.post('/set-token', (req, res) => {
  let { username, pwd } = req.body;
  const token = jwt.sign({ username, pwd }, privateKey, {
    expiresIn: 100,
  });
  return res.json({ code: 0, token })
});

app.post('/verify-token', (req, res) => {
  try {
    let tokenIn = req.body.token;
    let verify = jwt.verify(tokenIn, privateKey);
    return res.json({ code: 0, tokenIn, verify })
  }
  catch (err) {
    return res.json({ code: 99, err })
  }
});

app.listen(port, () => {
  console.log(`Server run on: http://localhost:${port}`);
});