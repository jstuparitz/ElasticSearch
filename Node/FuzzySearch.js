var elasticsearch = require('elasticsearch');

// Connect to localhost:9200 and use the default settings
var client = new elasticsearch.Client();
var take = 20;
// get all mvrs with the word "new" in the state name from row 1o to row 30
client.search({
    index: 'mvr',
    from: 10,
    size: take,
    body: {
        "query": {
            "fuzzy" : { "DriversLicenseStateName" : "new" }
        }
    }
}).then(function (resp) {
    console.log(resp.hits.total);
    if (resp.hits.total > 0) {
        for (var i = 0; i < take; i++) {
            console.log(resp.hits.hits[i]);
        }
    }
});
