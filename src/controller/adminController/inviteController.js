import Invitation from '../../models/Invitation.js';

// get all invitation
const invite_get = async (req, res) => {
  try {
    const invitations = await Invitation.find();
    res.status(200).json({ status: 'ok', invitations });
  } catch (err) {
    console.log(err);
  }
};

// get invite detail
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

// respond user invitation by changing the status
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

export {
  invite_detail_get,
  invite_get,
  invite_patch,
};
