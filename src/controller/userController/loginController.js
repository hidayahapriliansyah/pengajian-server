import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';


dotenv.config();

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const login_get = (req, res) => {
  res.render('user/login', { title: 'Login', endpoint: process.env.API_ENDPOINT });
};

const login_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }) || await User.findOne({ email: username });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = createToken(user._id);
        res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
      } else {
        throw Error('Password salah');
      }
    } else {
      throw Error('Username atau email tidak ditemukan');
    }
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  };
};

const logout_get = (req, res) => {
  res.cookie(process.env.COOKIE_NAME, 'logout', { httpOnly: true, maxAge: 1 });
  res.redirect('/login');
};

export {
  login_get,
  login_post,
  logout_get,
};
