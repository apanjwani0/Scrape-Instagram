const ENV_FILE = NODE_ENV == "Production" ? ".env" : ".dev.env";

module.exports = {
  ENV_FILE,
};