import User from '../../models/User.js';

const profile_get = async (req, res) => {
  const { userId } = req.body;
  // TODO get user ID from jwt

  // Send user data to see
  try {
    const user = await User.findById(userId);
    // TODO
    // check if user is null
    res.status(200).json(user);
    // res.send('profile');
  } catch (err) {
    console.log(err);
  }
};

const profile_edit = async (req, res) => {
  // TODO
  // send user profile data to edit view
  const { userId } = req.body;
  // TODO get user ID from jwt

  // Send user data to see
  try {
    const user = await User.findById(userId);
    // TODO
    // check if user is null
    res.status(200).json(user);
    res.send('Profile Edit view');
    // res.send('profile');
  } catch (err) {
    console.log(err);
  }
};

const profile_patch = async (req, res) => {
  const { userId } = req.body;
  const { username, alamat } = req.body;
  const formEdit = { username, alamat };
  console.log(formEdit);
  // TODO get user ID from jwt

  // Send user data to see
  try {
    const user = await User.findByIdAndUpdate(userId, formEdit);
    // TODO
    // check if user is null
    res.status(200).json(user);
    // res.send('profile');
  } catch (err) {
    console.log(err);
  }
};

export {
  profile_edit,
  profile_get,
  profile_patch,
};