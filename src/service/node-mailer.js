import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import emailOption from './email/signupVerification/emailOption.js';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAILER_ADDRESS,
    pass: process.env.EMAILER_APP_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log('Error occured');
    console.log(error);
  } else {
    console.log('Ready to send email');
    console.log(success);
  }
});

// const emailOption = {
//   from: process.env.EMAILER_ADDRESS,
//   to: 'whateveritshi@gmail.com',
//   subject: 'Testing Nodemailer',
//   html: `
//   <p>Tesing Success</p>
//   <div style="
//       text-align: center;
//       max-width: 650px;
//       margin: auto;
//       border-radius: 20px;
//       overflow: hidden;
//       ">
//       <table style="
//         font-family: Arial, Helvetica, sans-serif;
//       ">
//         <tbody class="content">
//           <tr>
//             <div style="
//                 width: 100%;
//                 height: 120px;
//                 background-color: #1e3e72;
//               " class="header">
//             </div>
//           </tr>
//           <tr>
//             <div style="
//               padding: 30px;
//               " class="body">
//               <h1 style="
//                 font-family: Arial, Helvetica, sans-serif;
//                 color: #1e3e72;
//                 font-weight: bold;
//                 font-size: 32px;
//                 margin-bottom: 10px;
//                 " class="title">Assalamu'alaikum, Adi!</h1>
//               <p style="
//                 font-family: Arial, Helvetica, sans-serif;
//                 line-height: 24px;
//                 letter-spacing: 0.2px;
//               " class="message">
//                 Terima kasih telah mendaftar di handybonny.com. Silakan klik tombol verifikasi di bawah ini untuk memverifikasi akun Anda. Verifikasi email ini akan kadaluarsa setelah 6 jam.
//               </p>
//               <a href="handybonny.com/verify/uniqueString" style="
//                 font-family: Arial, Helvetica, sans-serif;
//                 display: block;
//                 width: fit-content;
//                 margin-top: 20px;
//                 margin-left: auto;
//                 margin-right: auto;
//                 padding: 10px 20px;
//                 background-color: #dd3f4c;
//                 font-size: 20px;
//                 font-weight: 600;
//                 text-decoration: none;
//                 color: white;
//                 border-radius: 10px;
//               " class="verifikasi" target="_blank">Verifikasi Email</a>
//             </div>
//           </tr>
//           <tr>
//             <div style="
//                 text-align: center;
//                 padding: 25px;
//                 background-color: #1e3e72;
//               " class="footer">
//               <a style="
//                 font-family: Arial, Helvetica, sans-serif;
//                 text-decoration: none;
//                 color: white;
//                 font-weight: bold;
//               " href="#" target="_blank">handybonny.com</a>
//               <span>
//                 <p style="
//                   font-family: Arial, Helvetica, sans-serif;
//                   font-size: 18px;
//                   margin-top: 10px;
//                   margin-bottom: -10px;
//                   color: white;
//                   ">Office</p>
//                 <p style="
//                   font-family: Arial, Helvetica, sans-serif;
//                   font-size: 14px;
//                   color:white;
//                 ">Jalan Permai Raya No. 54,
//                   Mekar Rahayu, Kecamatan Margaasih
//                   Kab. Bandung Jawa Barat 40216</p>
//               </span>
//             </div>
//           </tr>
//         </tbody>
//       </table>    
//     </div>
//   `,
// };

// model ieu jalan kahade
const sendMail = await transporter.sendMail(emailOption({
  email: 'firmannesiasyah@gmail.com',
  namaPanggilan: 'Adi',
  uniqueString: 'uniqueString',
})); 

console.log(sendMail);