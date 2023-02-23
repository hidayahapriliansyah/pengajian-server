import dotenv from 'dotenv';

import User from '../../models/User.js';
import { signupError as handleErrors, signupPayloadValidation } from '../../handlers/errorHandler.js';
import createUserVerification from '../../service/createUserVerification.js';

dotenv.config();

const signup_get = (req, res) => {
  res.render('user/signup', { title: 'Buat Akun', endpoint: process.env.API_ENDPOINT });
};

const signup_post = async (req, res) => {
  
  const {
    username,
    email,
    password,
    nama_lengkap,
    nama_panggilan,
    gender,
    birthdate,
  } = req.body;

  const payload = {
    username,
    email,
    password,
    nama_lengkap,
    nama_panggilan,
    gender,
    birthdate,
  };

  const payloadValidation = signupPayloadValidation(payload);
  if (payloadValidation) {
    res.status(400).json({ status: 'fail', errors: payloadValidation });
    return;
  }

  try {
    const user = await User.create(payload);

    const { _id: userId, email, nama_panggilan: namaPanggilan } = user;
    const verification = createUserVerification({ userId, email, namaPanggilan });
    if (verification instanceof Error) {
      throw verification;
    }

    res.status(201).json({ status: 'ok', user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ status: 'fail', errors });
  }
};

export {
  signup_get,
  signup_post,
};
