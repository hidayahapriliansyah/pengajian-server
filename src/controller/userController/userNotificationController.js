import UserNotification from '../../models/UserNotification.js';

const usernotifitacation_get = async (req, res) => {
  // res.send('Go to user notification view and get data');
  const filter = { user_id: '63ee33e67872b2e9ce9ec3d9' };
  // TODO
  // user id akan diambil dari jwt

  try {
    const notifications = await UserNotification.find(filter);
    // error handling if notifcation is []
    res.status(200).json({ status: 'ok', notifications });
  } catch (err) {
    console.log(err);
  };
};

const usernotification_data_get = async (req, res) => {
  // res.send('give user notification data to any view');
  const filter = { user_id: '63ee33e67872b2e9ce9ec3d9' };
  // TODO
  // user id akan diambil dari jwt

  try {
    const notifcations = await UserNotification.find(filter);
    res.status(200).json({ status: 'ok', notifcations });
  } catch (err) {
    console.log(err);
  };
};

const usernotification_post = async (req, res) => {
  console.log(req.body);

  try {
    const notification = await UserNotification.create(req.body);
    res.status(201).json({ status: 'ok', notification });
  } catch (err) {
    console.log(err);
  };
};

const usernotification_patch = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id, user_id: '63ee33e67872b2e9ce9ec3d9'};
  // TODO
  // user id akan diambil dari jwt

  try {
    const notification = await UserNotification.findOneAndUpdate(filter, req.body);
    res.status(201).json({ status: 'ok', notification });
  } catch (err) {
    console.log(err);
  };
};

export {
  usernotification_data_get,
  usernotifitacation_get,
  usernotification_patch,
  usernotification_post,
};
