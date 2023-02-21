import dotenv from 'dotenv';

import User from '../../models/User.js';
import Invitation from '../../models/Invitation.js';
import * as auth from '../../auth/index.js';
import { invitationError as handleErrors } from '../../handlers/errorHandler.js';
import { days, months } from '../../lib/time/index.js';

dotenv.config();

const makeInvitationCollection = (invitations) => {
  return invitations.map((inv) => {
    const waktu = new Date(inv.waktu);
    console.log(waktu);
    const day = days[waktu.getDay()];
    const date = waktu.getDate();
    const month = months[waktu.getUTCMonth()];
    const year = waktu.getFullYear();
    const hour = waktu.getHours();
    const minute = waktu.getMinutes();

    const waktuFormatted = `${day}, ${date} ${month} ${year}, ${hour}:${minute}`;
    return {
      id: inv._id,
      tema: inv.tema,
      waktu: waktuFormatted,
      lokasi: inv.lokasi,
      status: inv.status,
    }
  });
};

const invite_get = async (req, res) => {
  try {
    const user = await auth.userAuth(req, res);
    if (user) {
      const invitations = await Invitation.find({ user_id: user._id });
      const invitationsColl = makeInvitationCollection(invitations);
      res.render('user/invite', { title: 'Undangan', invitations: invitationsColl });
    } else {
      res.status(403).json({ status: 'fail', message: 'User is invalid' });
    }
  } catch (err) {
    console.log(err);
  }
};

const invite_post = async (req, res) => {
  const {
    tema,
    lokasi,
    lokasi_map,
    waktu,
    audience,
    cp: contact_person,
  } = req.body;

  // payload validation
  let errors = {};
  if (!tema) {
    errors.tema = 'Tema harus diisi';
    return res.status(400).json({status: 'fail', errors });
  } else if (!lokasi) {
    errors.lokasi = 'Lokasi harus diisi';
    return res.status(400).json({status: 'fail', errors });
  } else if (!lokasi_map) {
    errors.lokasi_map = 'Link lokasi harus diisi';
    return res.status(400).json({status: 'fail', errors });
  } else if (!waktu) {
    errors.waktu = 'Waktu harus diisi';
    return res.status(400).json({status: 'fail', errors });
  } else if (!audience) {
    errors.audience = 'Audience harus diisi';
    return res.status(400).json({status: 'fail', errors });
  } else if (!contact_person) {
    errors.contact_person = 'Contact person harus diisi';
    return res.status(400).json({status: 'fail', errors });
  }

  try {
    const user = await auth.userAuth(req, res);
    if (user) {
      const user_id = user._id;
      const payload = {
        user_id,
        tema,
        lokasi,
        lokasi_map,
        waktu,
        audience,
        contact_person,
      };
      const invitation = await Invitation.create(payload);
      res.status(201).json({ status: 'ok', invitation: invitation._id });
    } else {
      res.status(400).json({ status: 'fail', message: 'User is invalid' });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ status: 'fail', errors });
  }
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
  } catch (err) {
    console.log(err);
  }
};

const invite_delete = async (req, res) => {
  const id = req.params.id;
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
