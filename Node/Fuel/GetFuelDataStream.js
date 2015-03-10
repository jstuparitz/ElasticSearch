var sql = require('mssql');
var elasticsearch = require('elasticsearch');

// Connect to localhost:9200 and use the default settings
var client = new elasticsearch.Client();


var config = {
    user: 'sa',
    password: '17776666',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'ElasticData',
    stream: true, // You can enable streaming globally
    connectionTimeout: 900000,
    requestTimeout: 900000,
    pool: {
        idleTimeoutMillis: 900000,
        max: 100
    }
}

sql.connect(config, function(err) {

    var request = new sql.Request();
    request.stream = true; // You can set streaming differently for each request 
    request.query('select BusinessPartyKey, BusPartyBillKey, AssetKey, DateKey, VendorKey, FuelBrandKey, \
    FuelSourceId, TranDateTime, LogId, LogSeqNum DetailSeqNum, AdjOdometerInd, AssetId, BilledAmt, BilledBusPartyId, BillingMatchedInd, \
    BillingOdometer, BillingRunKey, BusinessPartyId, BusPartyFiscalDateKey, CardAccountSeqNum, CardMemberKey, CostPerGallon, CostPerMile,\
    DriverFirstName, DriverLastName, DriverPin, EventKey, FinalOdometerReading, FuelBillingCd, FuelBrandDesc,FuelSourceCreateDt, FuelSourceUpdateDt,\
    FuelTax, FuelTypeCd, FuelTypeKey, Gallons, HourKey, InvoiceNum, LogDt, MilesPerGallon, OdometerReading, ProductCdDesc, SequenceNum, TotAmt, \
    TranCd, TranDt, TranSeqNum, TranSiteAddress, TranSiteCity, TranSiteName, TranSitePostalCd, TranSiteStateCd\
    from edw_fuelfact'); // or request.execute(procedure);

    request.on('row', function(row) {

        // index a document
        client.index({
            index: 'fuel',
            type: 'post',
            body: row
        }, function (err, resp) {
        });
    });

    request.on('error', function(err) {
        console.log(err);
    });

    request.on('done', function(returnValue) {
        console.log('all done');
    });
});