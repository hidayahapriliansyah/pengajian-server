const dashboard = (req, res) => {
  res.render('user/dashboard', { title: dashboard });
};

export * from './inviteController.js';
export * from './loginController.js';
export * from './profileController.js';
export * from './signupController.js';
export * from './sponsorContoller.js';
export * from './userNotificationController.js';
export * from './verifyController.js';
export { dashboard };
