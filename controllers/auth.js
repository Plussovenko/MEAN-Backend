module.exports.login = function (req, res) {
  res.status(200).json({
    login: {
      email: req.body.email,
      password: req.body.password,
      test: 'sss'
    },
  })
}

module.exports.register = function (req, res) {
  res.status(200).json({
    register: 'test controller register',
  })
}