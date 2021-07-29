var HashRing = require('hashring');
const Theodore = require('theodore')
const extend = require("xtend");
var merger = require("json-merger").mergeObjects;

const frest = require('./frest').frest;
var deepExtend = require('deep-extend');


module.exports = function HashFlux(options) {
  if (!options||!options.servers) options = { servers: ['http://127.0.0.1:8089'] };

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
        var final = { results: [] };
        response.forEach(function(block){
		final.results.push(block.body.results[0]);
                // deepExtend(final,block);
        });
        if (options.debug) console.log(JSON.stringify(final, null, 2));
	return res.json(final,200);
    }).catch(err => { 
	    console.error(err);
	    return res.json({},204);
    });

  })

  self.app.get('/*', async(req, res) => {
    /* get */
    var requests = [];
    options.servers.forEach(function(server){
	var item = {
		url: server + req.url,
		data: req.body
	}
	requests.push(item);
    });

    let result = frest.getAll(requests);
    console.log('mix',result);
    result.then(response => {
        var final = {};
        response.forEach(function(block){
		console.log(block);
		var res = block.body?.data?.result;
		if(!res||!res[0]) { return; }
		final = merger([final, block], {defaultArrayMergeOperation: "concat"});
                //deepExtend(final,block);
        });

        if (options.debug) console.log(JSON.stringify(final, null, 2));
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

  self.app.listen(options.port||3000)

}



