import bcrypt from 'bcrypt';
import User from '../../models/User.js';

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
        res.status(200).json({ user: user.id });
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

export {
  login_get,
  login_post,
};
