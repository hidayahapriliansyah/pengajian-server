import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';

import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import * as authMiddleware from './middleware/index.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// connection to mongodb local
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/undangan_pengajian')
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err));

// middleware
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// route middleware
app.get('*', authMiddleware.checkUser);

// route
app.use(userRoutes);
app.use('/admin', adminRoutes);


app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});
