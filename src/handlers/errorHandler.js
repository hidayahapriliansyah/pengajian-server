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

const invatationPayloadValidation = (req, res, {
    id, tema, lokasi, waktu, lokasi_map, audience, contact_person,
  }) => {

  let errors = {};
  const now = new Date();
  const timeBody = new Date(waktu);

  if (now > timeBody) {
    errors.waktu = 'Waktu tidak valid. Waktu sudah berlalu.';
    return errors;
  }

  if (!tema) {
    errors.tema = 'Tema harus diisi';
    return errors;
  } else if (!lokasi) {
    errors.lokasi = 'Lokasi harus diisi';
    return errors;
  } else if (!lokasi_map) {
    errors.lokasi_map = 'Link lokasi harus diisi';
    return errors;
  } else if (!waktu) {
    errors.waktu = 'Waktu harus diisi';
    return errors;
  } else if (!audience) {
    errors.audience = 'Audience harus diisi';
    return errors;
  } else if (!contact_person) {
    errors.contact_person = 'Contact person harus diisi';
    return errors;
  }

  return null;
};

export {
  signupError,
  invitationError,
  invatationPayloadValidation,
};
