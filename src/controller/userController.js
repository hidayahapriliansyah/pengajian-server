import User from '../models/User.js';
import bcrypt from 'bcrypt';

const index = (req, res) => {
  res.send('Dari conrolloersejdfjds')
};

const signup_get = (req, res) => {
  res.send('signup');
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

const login_get = (req, res) => {
  res.send('login');
};

const login_post = async (req, res) => {
  // console.log(req.body);
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }) || await User.findOne({ email: username });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        res.status(200).json({ user: user.id })
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

const invite_get = (req, res) => {
  res.send('invite');
};

const invite_post = (req, res) => {

};

const invite_patch = (req, res) => {
  
};

const invite_delete = (req, res) => {

};

const invite_detail_get = (req, res) => {
  res.send('invite detail get');
};

const profile_get = (req, res) => {
  res.send('profile');
};

const profile_patch = (req, res) => {

};

const endorse_get = (req, res) => {
  res.send('endorse');
};

const endorse_post = (req, res) => {

};

const endorse_patch = (req, res) => {

};

const endorse_delete = (req, res) => {

};

const endorse_detail_get = (req, res) => {

};

export default {
  index,
  signup_get,
  signup_post,
  login_get,
  login_post,
  invite_get,
  invite_post,
  invite_patch,
  invite_detail_get,
  invite_delete,
  endorse_delete,
  endorse_detail_get,
  endorse_get,
  endorse_patch,
  endorse_post,
  profile_patch,
  profile_get,
};