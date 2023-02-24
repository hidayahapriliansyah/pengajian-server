import UserVerification from '../../models/UserVerification.js';
import User from '../../models/User.js'

// cek user kode verifikasi sesuaikan dengan user_id di collection userVerification
const verify_get = async (req, res) => {
  const uniqueString = req.params.uniqueString;

  try {
    const verification = await UserVerification.findOne({ unique_string: uniqueString });
    if (verification) {
      // ubah user isverified
      const userId = verification.user_id;
      const user = User.findOneAndUpdate({ _id: userId, isVerified: true });
      res.status(200).json({ status: 'SUCCESS', user: user._id });
    } else {
      throw new Error('Kode verifikasi salah');
    }
  } catch {
    // jika salah signup
  }
};

export {
  verify_get,
};
