import Sponsor from '../../models/Sponsor.js';

const sponsor_get = async (req, res) => {
  // TODO 
  // send data all sponsorship and send to view

  try {
    const sponsor = await Sponsor.find({ user_id: '63eda20dd8da687c892116bb' });
    res.status(200).json({ status: 'ok', sponsor });
  } catch (err) {
    console.log(err);
  };
};

const sponsor_detail_get = async (req, res) => {
  const id = req.params.id;

  try {
    const sponsor = await Sponsor.find({ _id: id });
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

const sponsor_patch = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };

  try {
    const sponsor = await Sponsor.findOneAndUpdate(filter, req.body);
    res.status(201).json(sponsor);
  } catch (err) {
    console.log(err);
  };
};

export {
  sponsor_detail_get,
  sponsor_get,
  sponsor_patch,
};
