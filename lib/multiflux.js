var HashRing = require('hashring');
const Theodore = require('theodore')
var merger = require("json-merger").mergeObjects;
const frest = require('./frest').frest;


module.exports = function HashFlux(options) {
  if (!options||!options.servers) { console.log('missing options!'); process.exit(); }

  var self = {};
  var clients = {};
  var servers = options.servers;
  self.ring = new HashRing(servers);
  self.app = new Theodore()

  /* QUERY Handler */
  self.app.post('/*', (req, res) => {
    /* post */
    var requests = [];
    options.servers.forEach(function(server){
	if(options.debug) console.log('trying',server,req.url);
	var item = {
		url: server + req.url,
		data: req.body
	}
	requests.push(item);
    });

    let result = frest.postAll(requests);
    result.then(response => {
        var final = {};
        response.forEach(function(block){
		final = merger([final, block], {defaultArrayMergeOperation: options.mode || "concat"});
        });
        if (options.debug) console.log('merged-post', JSON.stringify(final.body, null, 2));
	return res.json(final.body,200);
    }).catch(err => {
	    console.error(err);
	    return res.json({},204);
    });

  })

  self.app.get('/*', async(req, res) => {
    /* get */
    var requests = [];
    options.servers.forEach(function(server){
	if(options.debug) console.log('trying',server,req.url);
	var item = {
		url: server + req.url,
		data: req.body
	}
	requests.push(item);
    });

    let result = frest.getAll(requests);
    result.then(response => {
        var final = {};
        response.forEach(function(block){
		final = merger([final, block], {defaultArrayMergeOperation: options.mode || "concat"});
        });
        if (options.debug) console.log('merged-get', JSON.stringify(final.body, null, 2));
	return res.json(final.body,200);
    }).catch(err => {
	    console.error(err);
	    return res.json({},204);
    });

  })


  /* PING Handler */
  self.app.get('/ping', (req, res) => {
	if (options.debug) console.log('PING req', req);
        return res.send('ok', 204);
  })

  self.app.listen(options.port||3100)
  console.log('Aggress-IO UP! ', options.servers.length);

}



