import * as auth from '../../auth/index.js';
import Invitation from '../../models/Invitation.js';

const dashboard = async (req, res) => {
  const user = await auth.userAuth(req, res);
  const userId = user._id;
  const invitation = await Invitation.find({ user_id: userId });

  const countInvitationTinjauan = invitation.filter((inv) => inv.status === 'tinjauan').length || 0;
  const countInvitationNegosiasi = invitation.filter((inv) => inv.status === 'negosiasi').length || 0;
  const countInvitationDiterima = invitation.filter((inv) => inv.status === 'diterima').length || 0;
  const countInvitationDitolak = invitation.filter((inv) => inv.status === 'ditolak').length || 0;
  res.render('user/dashboard', { title: dashboard,
    invitation: {
      tinjauan: countInvitationTinjauan,
      negosiasi: countInvitationNegosiasi,
      diterima: countInvitationDiterima,
      ditolak: countInvitationDitolak,
    },
  });
};

export * from './inviteController.js';
export * from './loginController.js';
export * from './profileController.js';
export * from './signupController.js';
export * from './sponsorContoller.js';
export * from './userNotificationController.js';
export * from './verifyController.js';
export { dashboard };
