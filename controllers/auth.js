const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

// Controlador para el registro
const signup = (req, res, next) => {
  const { email, password, name } = req.body;

  // Verificar si el usuario ya existe
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('User with this email already exists');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      return User.create({ email, password: hash, name });
    })
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.status(201).send(userWithoutPassword);
    })
    .catch(next);
};

// Controlador para el inicio de sesión
const signin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Incorrect email or password');
      }

      // Comparar la contraseña
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Incorrect email or password');
          }

          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

          res.send({ token });
        });
    })
    .catch(next);
};

module.exports = {
  signup,
  signin,
};
