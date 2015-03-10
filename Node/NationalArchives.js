var nara = require('./nara-node.js');

var options;
options.uri = 'https://catalog.archives.gov/api/' + version;
options.qs = options.search;
options.qs.action = 'search';
// Request
request(options, function (err, resp, body) {
    if (err) return callback(err);
    body = json.parse(body)['opaResponse']['results']['result'];
    if (parseInt(resp.statusCode, 10) !== 200) return callback(body);
    callback(null, body);
});

nara({
    search: {
        q: 'nixon',
        rows: '10',
        offset: '20'
    }
}, function (err, result) {
    console.log(result);
    console.log(err);
/*    if (resp.hits.total > 0) {
        for (var i = 0; i < take; i++) {
            console.log(resp.hits.hits[i]);
        }
    }*/
});
