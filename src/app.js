import express from 'express';

const app = express();

app.listen(3001);
// middleware

// route
app.get('/', (req, res) => {
  res.send('berhasil konek');
});