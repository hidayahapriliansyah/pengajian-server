import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

// aneh gak bisa pake import { isEmail } from 'validator' padahal sarua sarua keneh pan obj destructuring

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, 'Username harus diisi'],
    lowercase: true,
    minlength: [6, 'Username minimal memiliki 6 karakter'],
    unique: true,
  },
  email: {
    type: String,
    require: [true, 'Email harus diisi'],
    unique: true,
    validate: [ validator.isEmail, 'Masukkan email yang valid'],
    lowercase: true,
  },
  password: {
    type: String,
    require: [true, 'Password harus diisi'],
    minlength: [6, 'Password minimal memiliki 6 karakter'],
  },
  nama_lengkap: {
    type: String,
    require: [true, 'Nama lengkap harus diisi'],
    minlength: [3, 'Nama lengkpa minimal memiliki 3 karakter']
  },
  nama_panggilan: {
    type: String,
    require: [true, 'Nama lengkap harus diisi'],
    minlength: [3, 'Nama lengkpa minimal memiliki 3 karakter']
  },
  gender: {
    type: String,
    enum: ['m', 'f'],
    require: [true, 'Gender harus diisi'],
  },
  birthdate: {
    type: Date,
  },
  no_hp: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    sparse: true,
    minlength: [11, 'No. hp minimal memiliki 11 karakter'],
  },
  alamat: {
    type: String,
    minlength: [10, 'Alamat minimal memiliki 10 karakter'],
  },
  motivasi: {
    type: String,
    maxLength: [200, 'Motivasi maksimal memiliki 200 karakter'],
  },
  kegiatan_kemasyarakatan: {
    type: String,
    maxLength: [200, 'Kegiatan kemasyarakatan maksimal memiliki 200 karakter'],
  },
  profesi: {
    type: String,
    maxLength: [200, 'Profesi maksimal memiliki 200 karakter'],
  },
  komunitas: {
    type: String,
    maxLength: [200, 'Profesi maksimal memiliki 200 karakter'],
  },
  is_verified: {
    type: Boolean,
    require: true,
    default: false,
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
