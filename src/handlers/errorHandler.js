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
  let errors = {};

  if (err.message.includes('invitation validation failed')) {
    Object.values(err.errors).forEach((error) => {
      errors[error.path] = error.message;
    });
  }

  return errors;
};

export {
  signupError,
  invitationError,
};
