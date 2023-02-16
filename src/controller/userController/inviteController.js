import Invitation from '../../models/Invitation.js';

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

export {
  invite_create_get,
  invite_delete,
  invite_detail_get,
  invite_edit_get,
  invite_get,
  invite_patch,
  invite_post,
};
