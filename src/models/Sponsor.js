import mongoose from 'mongoose';

const sponsorSchema = new mongoose.Schema({
  user_id: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ['tinjauan', 'negosiasi', 'diterima', 'ditolak'],
    default: 'tinjauan',
  },
  brand: {
    type: String,
    require: [true, 'Nama brand harus diisi'],
  },
  bentuk_kerjasama: {
    type: String,
    require: [true, 'Bentuk kerja sama harus diisi'],
  },
  contact_person: {
    type: String,
    require: [true, 'Contact person harus diisi'],
    minlength: 11,
  },
}, { timestamps: true });

const Sponsor = mongoose.model('sponsor', sponsorSchema);

export default Sponsor;
