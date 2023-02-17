import dotenv from 'dotenv';
import User from '../../models/User.js';

dotenv.config();

const signup_get = (req, res) => {
  res.render('user/signup', { title: 'Buat Akun', endpoint: process.env.API_ENDPOINT });
};

const signup_post = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ status: 'ok', user: user.id });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 'fail', message: err });
  }
};

export {
  signup_get,
  signup_post,
};
