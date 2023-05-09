const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({email:req.body.email});

  if(candidate){
    // Проверка пароля
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
      if(passwordResult){
        // Генерация токена при совпадении пароля
        const token = jwt.sign({
          email: candidate.email,
          userId: candidate._id
        }, keys.jwt, {expiresIn: 3600});
        res.status(200).json({
          token: `Bearer ${token}`
        })
      } else {
        res.status(401).json({
          message: 'Uncorrect password. Try it again.'
        })
      }
  } else{
    // Пользователя нет
    res.status(404).json({
      message: 'User with that email not found'
    })
  }
}

module.exports.register = async function (req, res) {
  //email password
  const candidate = await User.findOne({email: req.body.email}) 
  
  //User is exist 
  if (candidate) {
    res.status(409).json({
      message: 'user with this email is already exist'
    })
  } else {
    //create user
    //Генерация шифрования для пароля
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User ({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })

    try {
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      errorHandler(res, error);
    }
  }
}