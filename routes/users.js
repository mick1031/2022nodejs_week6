const bcrypt = require('bcryptjs/dist/bcrypt');
var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const { route } = require('.');
const isAuth = require('../middlewares/isAuth');
const generateSendJWT = require('../services/generateSendJWT');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign_up', async function (req, res, next) {
  let { email, password, confirmPassword, name } = req.body;

  if (!email || !password || !confirmPassword || !name) {
    console.log('欄位未填寫正確(內容不可為空)');
  }

  if (password !== confirmPassword) {
    console.log('密碼不一致');
  }

  if (!validator.isLength(password, { min: 8 })) {
    console.log('密碼字數低於 8 碼');
  }

  if (!validator.isEmail(email)) {
    console.log('Email 格式不正確');
  }

  password = await bcrypt.hash(req.body.password, 12);

  const newUser = {
    email,
    password,
    name
  };
  const toke = generateSendJWT(newUser);

  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    user: {
      token,
      name: user.name
    },
  })

})

router.post('/sign_in', function (req, res, next) {
  res.status(200).json({
    status: 'success'
  })
})

router.get('/test', (req, res, next) => {
  const user = {
    _id: '123456789aaabbcc'
  };
  const token = generateSendJWT(user);
  res.status(200).json({
    status: 'success',
    token
  })
})

router.get('/check_login', isAuth, (req, res, next) => {
  res.status(200).json({
    status: 'success',
    user: req.user
  })
})

module.exports = router;
