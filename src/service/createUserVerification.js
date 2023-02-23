import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import UserVerification from '../models/UserVerification.js';
import transporter from './email/app.js';
import emailOption from './email/signupVerification/emailOption.js';

const createUserVerification = async ({ userId, email, namaPanggilan }) => {
  const salt = await bcrypt.genSalt(10);
  const uniqueString = await bcrypt.hash((uuidv4() + userId), salt);

  try {
    const verification = await UserVerification.create({
      user_id: userId,
      unique_string: uniqueString,
      expired_at: new Date(Date.now() + 6 * 60 * 60 * 1000),
    });
    if (verification) {
      console.log('to emailOption');
      transporter.sendMail(emailOption({ email, namaPanggilan, uniqueString }));
    } else {
      throw Error('Terjadi kesalahan saat signup');
    }
  } catch (err) {
    return err;
  }
}

export default createUserVerification;