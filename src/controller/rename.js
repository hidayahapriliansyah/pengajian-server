import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Invitation from '../models/Invitation.js';
import Sponsor from '../models/Sponsor.js';

const index = (req, res) => {
  res.send('Dari conrolloersejdfjds');
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

const invite_get = async (req, res) => {
  try {
    const invitations = await Invitation.find();
    res.status(200).json({ status: 'ok', invitations });
  } catch (err) {
    console.log(err);
  }
};

const invite_post = async (req, res) => {
  try {
    // const invitation = Invitation.create();
    const invitations = await Invitation.create(req.body);
    res.status(201).json(invitations);
  } catch (err) {
    console.log(err);
  }
};

const invite_create_get = (req, res) => {
  res.send('Create Invitation Form');
};

const invite_detail_get = async (req, res) => {
  const id = req.params.id;

  try {
    const invitation = await Invitation.findById(id);
    // TODO handle if invitaion is null
    res.status(200).json({ status: 'ok', invitation });
  } catch (err) {
    console.log(err);
  }
};

const invite_edit_get = (req, res) => {
  res.send('View Edit Invitation');
};

const invite_patch = async (req, res) => {
  const id = req.params.id;
  // TODO
  // untuk update tidak boleh menggunakan params dari url, harus ngambil dari payload

  try {
    const invitation = await Invitation.findByIdAndUpdate(id, req.body);
    // TODO handle if invitaion is null
    res.status(201).json({ status: 'ok', invitation });
    console.log(invitation);
  } catch (err) {
    console.log(err);
  }
};

const invite_delete = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  // TODO
  // untuk update tidak boleh menggunakan params dari url, harus ngambil dari payload

  try {
    const invitation = await Invitation.findOneAndRemove({ _id: id });
    res.status(201).json({ status: 'ok', invitation });
    console.log(invitation);
  } catch (err) {
    console.log(err);
  }
};

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

const sponsor_get = async (req, res) => {
  // TODO 
  // send data all sponsorship and send to view

  try {
    const sponsor = await Sponsor.find({ user_id: '63eda20dd8da687c892116bb' });
    res.status(200).json({ status: 'ok', sponsor });
  } catch (err) {
    console.log(err);
  }
};

const sponsor_detail_get = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const sponsor = await Sponsor.find({ _id: id, user_id: '63eda20dd8da687c892116bb' });
    if (sponsor.length === 0) {
      console.log('kososng wo');
      res.status(200).json({ status: 'ok', message: 'Tidak ada pengajuan sponsor' });
    } else {
      res.status(200).json({ status: 'ok', sponsor });
    }
  } catch (err) {
    console.log(err);
  };
};

const sponsor_edit_get = (req, res) => {
  res.send('Sponsor Edit View');
};

const sponsor_create_get = (req, res) => {
  res.send('Send To sponsor create view')
};

const sponsor_post = async (req, res) => {
  try {
    const sponsor = await Sponsor.create(req.body);
    res.status(201).json({ status: 'ok', sponsor });
  } catch (err) {
    console.log(err);
  };
};

const sponsor_patch = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id, user_id: '63eda20dd8da687c892116bb' };

  try {
    const sponsor = await Sponsor.findOneAndUpdate(filter, req.body);
    res.status(201).json(sponsor);
  } catch (err) {
    console.log(err);
  };
};

const sponsor_delete = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id, user_id: '63eda20dd8da687c892116bb' };

  try {
    const sponsor = await Sponsor.findOneAndDelete(filter, req.body);
    // jika tidak ada yang delete akan mengembalikan null
    res.status(201).json(sponsor);
  } catch (err) {
    // Harus bisa error handling jika ID salah. Soalnya ini errornya jadi ke Object Id nya
    console.log(err);
    res.send(err);
  };
};

export default {
  index,
  signup_get,
  signup_post,
  login_get,
  login_post,
  invite_get,
  invite_post,
  invite_create_get,
  invite_edit_get,
  invite_patch,
  invite_detail_get,
  invite_delete,
  sponsor_delete,
  sponsor_detail_get,
  sponsor_get,
  sponsor_create_get,
  sponsor_post,
  sponsor_patch,
  sponsor_edit_get,
  profile_get,
  profile_edit,
  profile_patch,
};