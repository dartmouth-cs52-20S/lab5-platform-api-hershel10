/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
import dotenv from 'dotenv';
import jwt from 'jwt-simple';
import User from '../models/user_model';

dotenv.config({ silent: true });

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }

  // Only create user if it does not exist currently
  User.findOne({ email }, (error, data) => {
    // if error in querry
    if (error) return res.status(404).send(error);
    else if (data) return res.status(409).send('A User with this email already exists');

    const user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.save()
      .then((result) => {
        res.send({ token: tokenForUser(user) });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  });
};
