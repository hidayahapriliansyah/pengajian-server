import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const adminSchema = new mongoose.Schema({
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
  role: {
    type: String,
    enum: ['superadmin', 'admin'],
  },
}, { timestamps: true });

adminSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(salt, this.password);
  next();
});

const Admin = mongoose.model('admin', adminSchema);

export default Admin;
