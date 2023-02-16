import Sponsor from '../../models/Sponsor.js';

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

export {
  sponsor_create_get,
  sponsor_delete,
  sponsor_detail_get,
  sponsor_edit_get,
  sponsor_get,
  sponsor_patch,
  sponsor_post,
};
