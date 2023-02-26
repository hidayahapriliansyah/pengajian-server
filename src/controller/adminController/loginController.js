import bcrypt from 'bcrypt';
import Admin from '../../models/Admin.js';

const login_get = (req, res) => {
  res.render('admin/login', { title: 'Admin', endpoint: process.env.API_ENDPOINT })
};

const login_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username }) || await Admin.findOne({ email: username });
    if (admin) {
      const auth = bcrypt.compare(password, admin.password);
      if (auth) {
        res.status(200).json({ admin: admin.id });
      }
      throw Error('Password salah');
    } else {
      throw Error('Email atau username tidak tedaftar');
    }
  } catch (err) {
    console.log(err);
  };
};

export {
  login_get,
  login_post,
};
