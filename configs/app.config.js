module.exports = {
  SESSION_SECRET: process.env.SESSION_SECRET,
  ROUNDS: parseInt(process.env.ROUNDS) || 11,
  PORT: parseInt(process.env.PORT) || 8000,
  URI: process.env.URI,
};
