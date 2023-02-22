const signupError = (err) => {
  let errors = {};

  if (err.code === 11000) {
    if ('email' in err.keyPattern) {
      errors.email = 'Email sudah digunakan user lain.';
    }

    if ('username' in err.keyPattern) {
      errors.username = 'Username sudah digunakan user lain.'
    }
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach((error) => {
      errors[error.path] = error.message;
    });
  }
  
  return errors;
};

const signupPayloadValidation = ({
    username,
    email,
    password,
    nama_lengkap,
    nama_panggilan,
    gender,
    birthdate,
  }) => {

  let errors = {};
  const now = new Date();
  const timeBody = new Date(birthdate);

  if (now < timeBody) {
    errors.birthdate = 'Waktu tidak valid. Waktu sudah berlalu.';
    return errors;
  }

  if (!username || username === '') {
    errors.username = 'Username harus diisi';
    return errors;
  } else if (!email || email === '') {
    errors.email = 'Email harus diisi';
    return errors;
  } else if (!password || password === '') {
    errors.password = 'Password harus diisi';
    return errors;
  } else if (!nama_lengkap || nama_lengkap === '') {
    errors.nama_lengkap = 'Nama lengkap harus diisi';
    return errors;
  } else if (!nama_panggilan || nama_panggilan === '') {
    errors.nama_panggilan = 'Nama panggilan harus diisi';
    return errors;
  } else if (!gender || gender === '') {
    errors.gender = 'Gender harus diisi';
    return errors;
  }

  if (username.indexOf(' ') > 0) {
    errors.username = 'Username tidak boleh mengandung spasi';
    return errors;
  } else if (!(/^[a-z0-9_\.]*$/.test(username))) {
    errors.username = 'Gunakan huruf kecil, nomor, karakter titik (.) dan underscore (_)';
    return errors;
  } else if (username.length === 0) {
    errors.username = 'Username harus diisi';
    return errors;
  } else if (username.length < 6) {
    errors.username = 'Username minimal memiliki 6 karakter';
    return errors;
  }

  if (email.length === 0) {
    errors.email = 'Email harus diisi';
    return errors;
  } else if (!(/^[a-z0-9\.\@]*$/.test(email))){
    errors.email = 'Masukkan format email yang benar. Huruf kecil a-z, angka 0-9, @ dan .';
    return errors;
  }

  if (password.length === 0) {
    errors.password = 'Password harus diisi'
    return errors;
  } else if (password.length < 6) {
    errors.password = 'Password minimal memiliki 6 karakter'
    return errors;
  }

  if (nama_lengkap.length === 0) {
    errors.nama_lengkap = 'Nama lengkap harus diisi'
    return errors;
  } else if (nama_lengkap.length < 3) {
    errors.nama_lengkap = 'Nama lengkap minimal memiliki 3 karakter';
    return errors;
  }

  if (nama_panggilan.length === 0) {
    errors.nama_panggilan = 'Nama panggilan harus diisi'
    return errors;
  } else if (nama_panggilan.length < 3) {
    errors.nama_panggilan = 'Nama panggilan minimal memiliki 3 karakter';
    return errors;
  }

  return null;
};

const invitationError = (err) => {
  // error from Schema mongoose
  let errors = {};

  if (err.message.includes('invitation validation failed')) {
    Object.values(err.errors).forEach((error) => {
      errors[error.path] = error.message;
    });
  }

  return errors;
};

const invatationPayloadValidation = ({
    id, tema, lokasi, waktu, lokasi_map, audience, contact_person,
  }) => {

  let errors = {};
  const now = new Date();
  const timeBody = new Date(waktu);

  if (now > timeBody) {
    errors.waktu = 'Waktu tidak valid. Waktu sudah berlalu.';
    return errors;
  }

  if (!tema || tema === '') {
    errors.tema = 'Tema harus diisi';
    return errors;
  } else if (!lokasi || lokasi === '') {
    errors.lokasi = 'Lokasi harus diisi';
    return errors;
  } else if (!lokasi_map || lokasi_map === '') {
    errors.lokasi_map = 'Link lokasi harus diisi';
    return errors;
  } else if (!waktu || waktu === '') {
    errors.waktu = 'Waktu harus diisi';
    return errors;
  } else if (!audience || audience === '') {
    errors.audience = 'Audience harus diisi';
    return errors;
  } else if (!contact_person || contact_person === '') {
    errors.contact_person = 'Contact person harus diisi';
    return errors;
  }

  if (tema.length < 5) {
    errors.tema = 'Tema minimal memiliki 5 karakter';
    return errors;
  }

  if (lokasi.length < 20) {
    errors.lokasi = 'Lokasi minimal memiliki 20 karakter. Mohon isi alamat dengan lengkap.'
    return errors;
  }

  if (contact_person.length < 11) {
    errors.contact_person = 'Contact Person minimal memiliki 11 karakter';
    return errors;
  }

  if (audience.length < 5) {
    errors.audience = 'Audience minimal memiliki 5 karakter';
    return errors;
  }

  return null;
};

export {
  signupError,
  signupPayloadValidation,
  invitationError,
  invatationPayloadValidation,
};
