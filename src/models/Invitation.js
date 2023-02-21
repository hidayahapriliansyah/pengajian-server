import mongoose from 'mongoose';
import validator from 'validator';

const invitationSchema = new mongoose.Schema({
  user_id: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ['tinjauan', 'negosiasi', 'diterima', 'ditolak'],
    default: 'tinjauan',
  },
  tema: {
    type: String,
    require: [true, 'Tema harus diisi'],
    minLength: [5, 'Tema setidaknya harus memiliki 5 karakter. Mohon isi tema dengan jelas dan singkat'],
  },
  lokasi: {
    type: String,
    require: [true, 'Lokasi harus diisi'],
    minlength: [10, 'Lokasi setidaknya harus memiliki 10 karakter. Mohon isi lokasi dengan detail'],
  },
  lokasi_map: {
    type: String,
    require: [true, 'Link lokasi map harus diisi'],
    validate: [ validator.isURL, 'Input yang dimasukkan harus berupa URL'],
  },
  waktu: {
    type: String,
    require: [true, 'Waktu harus diisi'],
  },
  audience: {
    type: String,
    require: [true, 'Audience harus diisi'],
    maxlength: [50, 'Audience memiliki maksimal karakter 50'],
  },
  contact_person: {
    type: String,
    require: [true, 'Contact person harus diisi'],
    minlength: 11,
  }
}, { timestamps: true });

// validation on update
invitationSchema.pre('findByIdAndUpdate', function(next) {
  this.options.runValidators = true;
  next();
});

const Invitation = mongoose.model('invitation', invitationSchema);

export default Invitation;