const ENV_FILE = process.env.NODE_ENV == "Production" ? ".env" : ".dev.env";

module.exports = {
  ENV_FILE,
};