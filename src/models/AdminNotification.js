import mongoose from 'mongoose';

const adminNotificationSchema = new mongoose.Schema({
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

const AdminNotification = mongoose.model('admin_notification', adminNotificationSchema);

export default AdminNotification;
