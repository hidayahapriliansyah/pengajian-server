import AdminNotification from '../../models/AdminNotification.js';

const adminnotifitacation_get = async (req, res) => {
  // res.send('Go to user notification view and get data');

  try {
    const notifications = await AdminNotification.find();
    // error handling if notifcation is []
    res.status(200).json({ status: 'ok', notifications });
  } catch (err) {
    console.log(err);
  };
};

const adminnotification_data_get = async (req, res) => {
  // res.send('give user notification data to any view');
  // TODO
  // user id akan diambil dari jwt

  try {
    const notifcations = await UserNotification.find(filter);
    res.status(200).json({ status: 'ok', notifcations });
  } catch (err) {
    console.log(err);
  };
};

const adminnotification_post = async (req, res) => {
  console.log(req.body);

  try {
    const notification = await AdminNotification.create(req.body);
    res.status(201).json({ status: 'ok', notification });
  } catch (err) {
    console.log(err);
  };
};

const adminnotification_patch = async (req, res) => {
  const id = req.params.id;
  // TODO
  // user id akan diambil dari jwt

  try {
    const notification = await AdminNotification.findByIdAndUpdate(id, req.body);
    res.status(201).json({ status: 'ok', notification });
  } catch (err) {
    console.log(err);
  };
};

export {
  adminnotification_data_get,
  adminnotifitacation_get,
  adminnotification_patch,
  adminnotification_post,
};
