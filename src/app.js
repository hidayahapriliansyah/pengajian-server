import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

// connection to mongodb local
mongoose.connect('mongodb://localhost:27017/undangan_pengajian')
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err));

// middleware
app.use(express.json());

// route
app.use(userRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('berhasil konek');
});