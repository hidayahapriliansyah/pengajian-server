import mongoose from 'mongoose';

const userNotificationSchema = new mongoose.Schema({
  user_id : {
    type: String,
    require: true,
  },
  jenis: {
    type: String,
    enum: ['pengajian', 'endorse'],
    require: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  pengajuan_id: {
    type: String,
    require: true,
  }
}, { timestamps: true });

const UserNotification = mongoose.model('user_notification', userNotificationSchema);

export default UserNotification;