import dotenv from 'dotenv';

import Sponsor from '../../models/Sponsor.js';
import * as auth from '../../auth/index.js';
import { sponsorPayloadValidation } from '../../handlers/errorHandler.js';

dotenv.config();

const sponsor_get = async (req, res) => {
  const user = await auth.userAuth(req, res);

  if (user) {
    const userId = user._id;
    const sponsors = await Sponsor.find({ user_id: userId });
    res.render('user/sponsor', { title: 'Sponsorship', sponsors, endpoint: process.env.API_ENDPOINT });
  };
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
  res.render('user/sponsor-create', { title: 'Ajukan Undangan', endpoint: process.env.API_ENDPOINT});
};

const sponsor_post = async (req, res) => {
  const user = await auth.userAuth(req, res);

  const {
    brand: brand,
    kerjaSama: bentuk_kerjasama,
    contactPerson: contact_person,
  } = req.body;

  // sponsor input validation
  const payloadValidation = sponsorPayloadValidation({ brand, bentuk_kerjasama, contact_person, });
  if (payloadValidation.errors) {
    const errors = payloadValidation;
    return res.status('404').json({ status: 'fail', errors });
  }

  payloadValidation.user_id = user._id;

  try {
    const sponsor = await Sponsor.create(payloadValidation);
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
  const user = await auth.userAuth(req, res);
  if (user) {
    const { id } = req.body;
    if (!id) {
      return res.redirect('user/404');
    }

    try {
      const sponsor = await Sponsor.findOneAndDelete({ user_id: user._id, _id: id }, req.body);
      if (!sponsor) {
        return res.redirect('user/404');
      }
      res.status(201).json({status: 'ok', sponsor});
    } catch (err) {
      // Harus bisa error handling jika ID salah. Soalnya ini errornya jadi ke Object Id nya
      console.log(err);
    };
  } else {
    res.redirect('/login');
  }
};

export {
  sponsor_create_get,
  sponsor_delete,
  sponsor_detail_get,
  sponsor_edit_get,
  sponsor_get,
  sponsor_patch,
  sponsor_post,
};
