const EXPIRES_IN = 60 * 60; // 1 hour
const PASSWORD_RESET_EXPIRES_IN = 60 * 60 * 24; // 24 hour

const jwtOptions = {
  EXPIRES_IN,
  PASSWORD_RESET_EXPIRES_IN
};

export {
  EXPIRES_IN,
  PASSWORD_RESET_EXPIRES_IN
};

export default jwtOptions;
