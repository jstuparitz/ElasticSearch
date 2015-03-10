var elasticsearch = require('elasticsearch');

// Connect to localhost:9200 and use the default settings
var client = new elasticsearch.Client();
var take = 100;
// get all mvrs with drivers between the age of 30 and 35 within certain vehicle unit types
client.search({
    index: 'mvr',
    size: take,
    body: {
        "query": {
            "multi_match": {
                "query": "New York Mary",
                "fields": ["DriversLicenseStateName", "DriverFullName"],
                "type":     "most_fields"
            }
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

