var sql = require('mssql');
var elasticsearch = require('elasticsearch');

// Connect to localhost:9200 and use the default settings
var client = new elasticsearch.Client();


var config = {
    user: 'sa',
    password: '17776666',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'WEDM',
    stream: true // You can enable streaming globally
}

sql.connect(config, function(err) {
    // ... error checks 

    var request = new sql.Request();
    request.stream = true; // You can set streaming differently for each request 
    request.query('select * from RMDriverLastMVR'); // or request.execute(procedure);

    request.on('row', function(row) {

        // index a document
        client.index({
            index: 'mvr',
            type: 'post',
            body: row
        }, function (err, resp) {
            console.log(resp);
        });
    });

    request.on('error', function(err) {
        console.log(err);
    });

    request.on('done', function(returnValue) {
        console.log('all done');
    });
});