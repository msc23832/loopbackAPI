'use strict';

module.exports = function (Country) {

    var DataSource = require('loopback-datasource-juggler').DataSource;

    var ds = new DataSource({
        host: "10.41.55.4",
        port: 5432,
        url: "postgres://postgres:P@ssw0rd@10.41.55.4/DBPMS",
        database: "DBPMS",
        password: "P@ssw0rd",
        name: "PMSServer",
        user: "postgres",
        connector: "postgresql"
    });


    Country.getCountry = function (req, cb) {
        setTimeout(() => {
            var LoadData = "SELECT * FROM country ";
            ds.connector.query(LoadData, function (err, countrys) {

                if (err) console.error(err);

                cb(err, countrys);

            });
        },
            5000);

    };

    Country.remoteMethod(
        'getCountry',
        {
            http: { path: '/getCountry', verb: 'get' },
            description: 'Get list of countrys',
            accepts: { arg: 'id_country', type: 'integer' },
            returns: { arg: 'data', type: ['country'], root: true }
        }
    );

};

