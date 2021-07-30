const aggressIO = require('./lib/multiflux');

var options = {
  servers: process.env.SERVERS.split(',') || false,
  port:    process.env.PORT || 8086,
  debug:   process.env.DEBUG || false,
  hash:    process.env.HASH || true,
  mode:    process.env.MODE || "concat" /* "combine" | "replace" | "concat" */
}

var server = new aggressIO(options);
