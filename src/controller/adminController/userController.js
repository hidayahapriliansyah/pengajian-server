import User from '../../models/User.js';

const user_get = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: 'ok', users });
  } catch (err) {
    console.log(err);
  };
};

const user_detail_get = async (req, res) => {
  const user_id = req.params.id;

  try {
    const user = await User.findById(user_id);
    res.status(200).json({ status: 'ok', user});
  } catch (err) {
    console.log(err);
  };
};

const user_delete = async (req, res) => {
  const user_id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(user_id);
    res.status(200).json({ status: 'ok', user });
  } catch (err) {
    console.log(err);
  };
};

export {
  user_delete,
  user_detail_get,
  user_get,
};
