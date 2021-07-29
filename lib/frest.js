'use strict';
const fetch = require('node-fetch');
const frest = {
    getAll: async function (urls) {
        let requests = await Promise.all(urls.map(url => this.getOne(url.url)));
        return await this.parseResult(requests);
    },
    postAll: async function (postRequests) {
        let requests = postRequests.map(request => fetch(request.url,
            {
                method: 'POST',
                body: request.data
            }));

        return await this.parseResult(requests);
    },
    putAll: async function (putRequests) {
        let requests = putRequests.map(request => fetch(request.url,
            {
                method: 'PUT',
                body: request.data
            }));

        return await this.parseResult(requests);
    },
    deleteAll: async function (deleteRequests) {
        let requests = deleteRequests.map(request => fetch(request,
            {
                method: 'DELETE'
            }));

        return await this.parseResult(requests);
    },
    parseResult: async function (requests) {
        let result = [];

        return await Promise.all(requests)
            .then(responses => {
                for (let response of responses) {
                    result.push({ "status": response.status, "body": {} })
                }
                return responses;
            })
            .then(responses => Promise.all(responses.map(r => r.json ? r.json() : r )))
            .then(data => {
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    result[index].body = element;
                }
                return result;
            });
    },
    getSingle: function (url) {
        return fetch(url).then(response => response.json());
    },
    getOne: async function (url) {
	try { return await fetch(url) } catch(e) { return { status: 200, body: {} } }
    },
    waterfall: async function (urls) {
        let count = urls.length - 1;
        let index = 0;
        var responses = [];
        while (count >= 0) {
            let response = await this.getSingle(urls[index]);
            responses.push(response);
            count--;
            index++;
        }
        return await responses;
    },
    casecaded: async function (data) {
        let responses = [];
        for (let index = 0; index < data.length; index++) {
            let request = data[index];
            if (request.param) {
                request.url = request.url.replace('{param}', responses[index - 1][request.param]);
            }
            let response = await this.getSingle(request.url);
            responses.push(response);
        }
        return await responses;
    }
}


module.exports.frest = frest;
