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
        return null;
      }
    } catch (err) {
      return null;
    }
  } else {
    return null;
  }
};

export default userAuth;