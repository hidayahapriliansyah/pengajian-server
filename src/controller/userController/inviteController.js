import dotenv from 'dotenv';
import htmlspecialchars from 'htmlspecialchars';
import moment from 'moment-timezone';

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
    const waktuTz = moment.tz(inv.waktu, process.env.TIMEZONE);
    const dateLocal = waktuTz.toDate();
    console.log('dateLocal', dateLocal);

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
  

  if (timeraw === 'datetimelocal') {
    let waktuDateTimeLocal = '';

    const addZero = (time) => {
      return time.lenght === 1
      ? ('0' + time)
      : time; 
    };

    waktuDateTimeLocal = `${year}-${bulan}-${tgl}T${jam}:${minute}`;
    
    return {
      id: inv._id,
      tema: inv.tema,
      waktu: waktuLocal,
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
      res.render('user/invite', { title: 'Undangan', invitations: invitationsColl, endpoint: process.env.API_ENDPOINT });
    } else {
      return res.redirect('login');
    }
  } catch (err) {
    if (err.message === 'User is invalid') {
      res.redirect('/login');
      return;
    }
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

  const payloadValidation = invatationPayloadValidation({
    tema, lokasi, lokasi_map, waktu, audience, contact_person, waktu,
  });

  if (payloadValidation) {
    res.status(400).json({ status: 'fail', errors: payloadValidation });
    return;
  };

  try {
    const user = await auth.userAuth(req, res);
    if (user instanceof Error) {
      throw user;
    }

    const user_id = user._id;
    const payload = {
      user_id,
      tema: htmlspecialchars(tema),
      lokasi: htmlspecialchars(lokasi),
      lokasi_map: htmlspecialchars(lokasi_map),
      waktu: htmlspecialchars(waktu),
      audience: htmlspecialchars(audience),
      contact_person: htmlspecialchars(contact_person),
    }

    const invitation = await Invitation.create(payload);
    res.status(201).json({ status: 'ok', invitation: invitation._id });
  } catch (err) {
    if (err.message === 'User is invalid') {
      res.redirect('/login');
      return;
    }

    const errors = handleErrors(err);
    if (errors) {
      res.status(400).json({ status: 'fail', errors });
    } else {
      res.status(500).json({ status: 'fail', message: err });
    }
  }
};

const invite_create_get = async (req, res) => {
  const user = await auth.userAuth(req, res);
  if (user) {
    res.render('user/invite-create', { title: 'Ajukan Undangan', endpoint: process.env.API_ENDPOINT });
  }
};

const invite_detail_get = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await auth.userAuth(req, res);
    if (user instanceof Error) {
      throw user;
    }
    const invitation = await Invitation.findOne({ _id: id, user_id: user._id });
    if (invitation) {
      const invitationDoc = makeInvitationDocument(invitation);
      return res.render('user/invite-detail', { title: 'Undangan', invitation: invitationDoc, endpoint: process.env.API_ENDPOINT });
    } else {
      return res.render('user/404', { title: '404' });
    }
  } catch (err) {
    if (err.message === 'User is invalid') {
      res.redirect('/login');
      return;
    }
    
    if(err.kind = 'ObjectId') {
      res.render('user/404', { title: '404' });
      return;
    }

    res.status(500).json({ status: 'fail', message: err });
  }
};

const invite_edit_get = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await auth.userAuth(req, res);
    if (user) {
      const invitation = await Invitation.findOne({ _id: id, user_id: user._id });
      if (invitation) {
        const invitationDoc = makeInvitationDocument(invitation, 'timeraw');
        res.render('user/invite-edit', { title: 'Edit Undangan', invitation: invitationDoc, endpoint: process.env.API_ENDPOINT });
      } else {
        return res.render('user/404', { title: '404' });
      }
    }
  } catch (err) {
    if (err.message === 'User is invalid') {
      res.redirect('/login');
      return;
    }

    if(err.kind = 'ObjectId') {
      // invitation id error
      res.render('user/404', { title: '404' });
      return;
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
    if (user instanceof Error) {
      throw user;
    }
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
  } catch (err) {
    if (err.message === 'User is invalid') {
      res.redirect('/login');
      return;
    }
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
    const filter = { user_id: user._id, _id: id };
    const invitation = await Invitation.findOneAndDelete(filter);
    res.status(200).json({ status: 'ok', invitation: invitation._id });
  } catch (err) {
    if (err.message === 'User is invalid') {
      res.redirect('/login');
      return;
    }

    res.status(500).json({ status: 'fail', message: err });
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
