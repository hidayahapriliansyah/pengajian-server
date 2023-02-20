import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import User from '../../models/User.js';
import Invitation from '../../models/Invitation.js';
import * as auth from '../../auth/index.js';

dotenv.config();

const invite_get = async (req, res) => {
  res.render('user/invite', { title: 'Undangan' });
  // try {
  //   const invitations = await Invitation.find();
  //   res.status(200).json({ status: 'ok', invitations });
  // } catch (err) {
  //   console.log(err);
  // }
};

const invite_post = async (req, res) => {
  const {
    tema,
    lokasi,
    waktu,
    audience,
    cp: contact_person,
  } = req.body;

  // payload validation
  // berarti ini mah pake switch case
  let errors = {};
  if (!tema) {
    errors.tema = 'Tema harus diisi';
    return res.status(400).json({status: 'fail', errors });
  } else if (!lokasi) {
    errors.tema = 'Tema harus diisi';
  }
  // cek apakah tema undefined
  // aneh ari dina skema geus require, tapi lamun tina payloadna
  //  didedetkeun tanpa property require eta malah bisa masuk. uhuk uhuk

  const payload = req.body;

  try {
    const invitation = await Invitation.create(payload);
    res.status(201).json({ status: 'ok', invitation: invitation._id });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }

  // try {
  //   const user = await auth.userAuth(req, res);
  //   if (user) {
  //     const user_id = user.id;
  //     const payload = {
  //       user_id,
  //       tema,
  //       lokasi,
  //       waktu,
  //       audience,
  //       contact_person,
  //     };
  //     const invitation = await Invitation.create(payload);
  //     res.status(201).json({ status: 'ok', invitation: invitation._id });
  //   } else {
  //     throw Error('User tidak valid');
  //   }
  // } catch (err) {
  //   console.log(err);
  //   res.status(400).json({ status: 'fail', message: err.message });
  // }
};

const invite_create_get = (req, res) => {
  res.render('user/invite-create', { title: 'Ajukan Undangan', endpoint: process.env.API_ENDPOINT });
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
