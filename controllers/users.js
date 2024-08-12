const User = require('../models/user');

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      res.send({ email: user.email, name: user.name });
    })
    .catch(next);
};

module.exports = {
  getUserInfo,
};
