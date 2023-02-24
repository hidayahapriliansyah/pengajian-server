import UserVerification from '../../models/UserVerification.js';
import User from '../../models/User.js'

// cek user kode verifikasi sesuaikan dengan user_id di collection userVerification
const verify_get = async (req, res) => {
  const uniqueString = req.params.uniqueString;

  try {
    const verification = await UserVerification.findOne({
      unique_string: uniqueString,
      expired_at: { $gt: new Date() }
    });

    if (verification) {
      // ubah user isverified
      const userId = verification.user_id;
      const user = await User.findOneAndUpdate({ _id: userId }, { is_verified: true });
      res.status(200).json({ status: 'ok', user: user._id });
    } else {
      throw new Error('Kode verifikasi tidak valid');
    }
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message })
  }
};

export {
  verify_get,
};
