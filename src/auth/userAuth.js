import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const userAuth = async (req, res) => {
  const cookieName = process.env.COOKIE_NAME;
  const token = req.cookies[cookieName];
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decodedToken.id);
      if (user) {
        return user;
      } else {
        res.redirect('/login');
      }
    } catch (err) {
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
};

export default userAuth;