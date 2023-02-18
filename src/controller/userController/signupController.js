import dotenv from 'dotenv';
import User from '../../models/User.js';

dotenv.config();

const handleErrors = (err) => {
  let errors = {};

  if (err.code === 11000) {
    if ('email' in err.keyPattern) {
      errors.email = 'Email sudah digunakan user lain.';
    }

    if ('username' in err.keyPattern) {
      errors.username = 'Username sudah digunakan user lain.'
    }
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach((error) => {
      errors[error.path] = error.message;
    });
  }

  return errors;
};

const signup_get = (req, res) => {
  res.render('user/signup', { title: 'Buat Akun', endpoint: process.env.API_ENDPOINT });
};

const signup_post = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ status: 'ok', user: user.id });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status(400).json({ status: 'fail', errors });
  }
};

export {
  signup_get,
  signup_post,
};
