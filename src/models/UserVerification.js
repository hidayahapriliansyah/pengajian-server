import mongoose from 'mongoose';

const userVerificationSchema = new mongoose.Schema({
  user_id: {
    type: String,
    require: true,
  },
  unique_string: {
    type: String,
    require: true,
  },
  expired_at: {
    type: Date,
    require: true,
  },
}, { timestamps: true });

const UserVerification = mongoose.model('user_verification', userVerificationSchema);

export default UserVerification;
