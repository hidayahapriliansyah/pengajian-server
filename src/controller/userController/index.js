import * as auth from '../../auth/index.js';
import Invitation from '../../models/Invitation.js';
import Sponsor from '../../models/Sponsor.js';

const dashboard = async (req, res) => {
  const user = await auth.userAuth(req, res);
  const userId = user._id;
  const invitation = await Invitation.find({ user_id: userId });

  const countInvitationTinjauan = invitation.filter((inv) => inv.status === 'tinjauan').length || 0;
  const countInvitationNegosiasi = invitation.filter((inv) => inv.status === 'negosiasi').length || 0;
  const countInvitationDiterima = invitation.filter((inv) => inv.status === 'diterima').length || 0;
  const countInvitationDitolak = invitation.filter((inv) => inv.status === 'ditolak').length || 0;

  const sponsorship = await Sponsor.find({ user_id: userId });
  const countSponsorTinjauan = sponsorship.filter((spo) => spo.status === 'tinjauan').length || 0;
  const countSponsorNegosiasi = sponsorship.filter((spo) => spo.status === 'negosiasi').length || 0;
  const countSponsorDiterima = sponsorship.filter((spo) => spo.status === 'diterima').length || 0;
  const countSponsorDitolak = sponsorship.filter((spo) => spo.status === 'ditolak').length || 0;


  res.render('user/dashboard', { title: dashboard,
    invitation: {
      tinjauan: countInvitationTinjauan,
      negosiasi: countInvitationNegosiasi,
      diterima: countInvitationDiterima,
      ditolak: countInvitationDitolak,
    },
    sponsorship: {
      tinjauan: countSponsorTinjauan,
      negosiasi: countSponsorNegosiasi,
      diterima: countSponsorDiterima,
      ditolak: countSponsorDitolak,
    },
  });
};

export * from './inviteController.js';
export * from './loginController.js';
export * from './profileController.js';
export * from './signupController.js';
export * from './sponsorController.js';
export * from './userNotificationController.js';
export * from './verifyController.js';
export { dashboard };
