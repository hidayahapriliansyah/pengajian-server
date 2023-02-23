import dotenv from 'dotenv';

dotenv.config();

const emailOption = (userEmail, ) => {
  return {
    from: process.env.AUTH_EMAIL,
    to: userEmail,
    subject: 'Verifikasi Email | Ustadz Handy Bonny',
    html: `
      <div>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,800&display=swap');

        * {
          margin: 0;
          padding: 0;
          font-weight: normal;
          font-size: 16px;
          font-style: normal;
          font-family: 'Montserrat', sans-serif;
          text-decoration: none;
          color: black;
        }

        .header {
          width: 100%;
          height: 160px;
          background-color: #A8E4B1;
        }

        .body {
          text-align: center;
          padding: 50px;
        }

        .title {
          font-size: 32px;
          font-weight: bold;
          color: #306D75;
          margin-bottom: 16px;
        }

        .message {
          line-height: 24px;
          letter-spacing: 0.2px;
        }

        .verifikasi {
          display: block;
          width: fit-content;
          margin-top: 20px;
          margin-left: auto;
          margin-right: auto;
          padding: 10px;
          background-color: #306D75;
          font-size: 22px;
          font-weight: 600;
          color: white;
          border-radius: 10px;
        }

        .footer {
          text-align: center;
        }
      </style>
      <div class="content">
        <div class="header">
        </div>
        <div class="body">
          <h1 class="title">Assalamu alaikum, Nama!</h1>
          <p class="message">
            Terima kasih telah mendaftar di website handybonny.com. Silakan klik tombol verifikasi di bawah ini untuk memverifikasi akun Anda. Verifikasi email ini akan kadaluarsa setelah 6 jam.
          </p>
          <a href="#" class="verifikasi" target="_blank">Verifikasi Email</a>
        </div>
        <div class="footer">
          <a href="#" target="_blank">handybonny.com</a>
        </div>
      </div>
    </div>
    `,
  };
};

