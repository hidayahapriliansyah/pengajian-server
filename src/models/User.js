import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

// aneh gak bisa pake import { isEmail } from 'validator' padahal sarua sarua keneh pan obj destructuring

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, 'Username wajib diisi'],
    lowercase: true,
    minlength: 6,
    unique: true,
  },
  email: {
    type: String,
    require: [true, 'Email wajib diisi'],
    unique: true,
    validate: [ validator.isEmail, 'Masukkan email yang valid'],
    lowercase: true,
  },
  password: {
    type: String,
    require: [true, 'Password wajib diisi'],
    minlength: [6, 'Password minimal memiliki 6 karakter'],
  },
  nama_lengkap: {
    type: String,
    require: [true, 'Nama lengkap wajib diisi'],
    minlength: [3, 'Nama lengkpa minimal memiliki 3 karakter']
  },
  nama_panggilan: {
    type: String,
    require: [true, 'Nama lengkap wajib diisi'],
    minlength: [3, 'Nama lengkpa minimal memiliki 3 karakter']
  },
  no_hp: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    sparse: true,
    minlength: 11,
  },
  alamat: {
    type: String,
    minlength: 10,
  },
  motivasi: {
    type: String,
    maxLength: 200,
  },
  kegiatan_kemasyarakatan: {
    type: String,
    maxLength: 200,
  },
  profesi: {
    type: String,
    maxLength: 200,
  },
  komunitas: {
    type: String,
    maxLength: 200,
  },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre('findByIdAndUpdate', function(next) {
  this.options.runValidators = true;
  next();
});

const User = mongoose.model('user', userSchema);

export default User;
