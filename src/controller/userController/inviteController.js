import dotenv from 'dotenv';

import User from '../../models/User.js';
import Invitation from '../../models/Invitation.js';
import * as auth from '../../auth/index.js';
import { invitationError as handleErrors, invatationPayloadValidation } from '../../handlers/errorHandler.js';
import { days, months } from '../../lib/time/index.js';

dotenv.config();

const makeInvitationCollection = (invitations, detail) => {
  return invitations.map((inv) => {
    const waktu = new Date(inv.waktu);
    const day = days[waktu.getDay()];
    const date = waktu.getDate();
    const month = months[waktu.getUTCMonth()];
    const year = waktu.getFullYear();
    const hour = waktu.getHours();
    const minute = waktu.getMinutes();

    const waktuFormatted = `${day}, ${date} ${month} ${year}. ${hour}:${minute}`;
    if(!detail || detail !== 'detail') {
      return {
        id: inv._id,
        tema: inv.tema,
        waktu: waktuFormatted,
        lokasi: inv.lokasi,
        status: inv.status,
      }
    } else {
      return {
        id: inv._id,
        tema: inv.tema,
        waktu: waktuFormatted,
        lokasi: inv.lokasi,
        lokasi_map: inv.lokasi_map,
        audience: inv.audience,
        cp: inv.contact_person,
        status: inv.status,
      }
    }
  });
};

const makeInvitationDocument = (invitation, timeraw) => {
  const inv = invitation;
  const waktu = new Date(inv.waktu);
  const day = days[waktu.getDay()];
  const date = waktu.getDate();
  const month = months[waktu.getUTCMonth()];
  const year = waktu.getFullYear();
  const hour = waktu.getHours();
  const minute = waktu.getMinutes();

  const waktuFormatted = `${day}, ${date} ${month} ${year}. ${hour}:${minute}`;

  if (timeraw === 'timeraw') {
    return {
      id: inv._id,
      tema: inv.tema,
      waktu: inv.waktu,
      lokasi: inv.lokasi,
      lokasi_map: inv.lokasi_map,
      audience: inv.audience,
      cp: inv.contact_person,
      status: inv.status,
    }
  }

  return {
    id: inv._id,
    tema: inv.tema,
    waktu: waktuFormatted,
    lokasi: inv.lokasi,
    lokasi_map: inv.lokasi_map,
    audience: inv.audience,
    cp: inv.contact_person,
    status: inv.status,
  }
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

  const payloadValidation = invatationPayloadValidation(req, res, {
    tema, lokasi, lokasi_map, waktu, audience, contact_person, waktu,
  });

  if(payloadValidation) {
    res.status(400).json({ status: 'fail', errors: payloadValidation });
    return;
  };

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
    const user = await auth.userAuth(req, res);
    if (!(user instanceof Error)) {
      const invitation = await Invitation.findOne({ _id: id, user_id: user._id });
      if (invitation) {
        const invitationDoc = makeInvitationDocument(invitation);
        return res.render('user/invite-detail', { title: 'Undangan', invitation: invitationDoc, endpoint: process.env.API_ENDPOINT });
      } else {
        return res.render('user/404', { title: '404' });
      }
    } else {
      throw user;
    }
  } catch (err) {
    if (err.message === 'User is invalid') {
      res.redirect('/login');
    }
    
    if(err.kind = 'ObjectId') {
      // invitation id error
      return res.render('user/404', { title: '404' });
    }
  }
};

const invite_edit_get = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await auth.userAuth(req, res);
    if (user instanceof Error) {
      throw user;
    }
    const invitation = await Invitation.findOne({ _id: id, user_id: user._id });
    if (invitation) {
      const invitationDoc = makeInvitationDocument(invitation, 'timeraw');
      res.render('user/invite-edit', { title: 'Edit Undangan', invitation: invitationDoc, endpoint: process.env.API_ENDPOINT });
    } else {
      return res.render('user/404', { title: '404' });
    }
  } catch (err) {
    if (err.message === 'User is invalid') {
      res.redirect('/login');
    }

    if(err.kind = 'ObjectId') {
      // invitation id error
      return res.render('user/404', { title: '404' });
    }
  }
};

const invite_patch = async (req, res) => {
  const {
    id,
    tema,
    lokasi,
    lokasi_map,
    waktu,
    audience,
    cp: contact_person,
  } = req.body;

  if(!id) {
    res.status(400).json({ status: 'fail', errors: { id: 'Id tidak valid' } });
    return;
  }

  const payloadValidation = invatationPayloadValidation(req, res, {
    tema, lokasi, lokasi_map, waktu, audience, contact_person, waktu,
  });

  if(payloadValidation) {
    res.status(400).json({ status: 'fail', errors: payloadValidation });
    return;
  };
  
  try {
    const user = await auth.userAuth(req, res);
    if (user) {
      const user_id = user._id;
      const filter = { user_id, _id: id };

      const payload = {
        user_id,
        tema,
        lokasi,
        lokasi_map,
        waktu,
        audience,
        contact_person,
      };

      const invitation = await Invitation.findOneAndUpdate(filter, payload);
      res.status(201).json({ status: 'ok', invitation: invitation._id });
    } else {
      res.status(400).json({ status: 'fail', message: 'User is invalid' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'fail', message: err.message });
  };
};

const invite_delete = async (req, res) => {
  const { id } = req.body;

  if(!id) {
    res.status(400).json({ status: 'fail', errors: { id: 'Id tidak valid' } });
    return;
  }

  try {
    const user = await auth.userAuth(req, res);
    if (user instanceof Error) {
      throw user;
    }
    if (user) {
      const filter = { user_id: user._id, _id: id };
      const invitation = await Invitation.findOneAndDelete(filter);
      res.status(200).json({ status: 'ok', invitation: invitation._id });
      console.log('id salah',invitation);
    }
  } catch (err) {
    // jika id salah path _id string
    if (error.)
    console.log('error', err);
    res.status()
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
