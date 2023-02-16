import Admin from '../../models/Admin.js';

const signup_get = (req, res) => {
  res.send('signup view admin');
};

const signup_post = async (req, res) => {
  console.log(req.body);

  try {
    const admin = await Admin.create(req.body);
    res.status(201).json({ status: 'ok', admin: admin.id });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 'fail', message: err });
  };
};

export {
  signup_get,
  signup_post,
};
