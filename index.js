const hashFlux = require('./lib/multiflux');

var servers = process.env.SERVERS.split(',') || ['http://127.0.0.1:8086'];
var port = process.env.PORT || 8086;
var debug = process.env.DEBUG || false;
var hash = process.env.HASH || true;

var options = { servers: servers, port: port, debug: debug, hash: hash };
var server = new hashFlux(options);
