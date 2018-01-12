'use strict';

module.exports = function (Login) {

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


    Login.getCity = function (req, cb) {
        var LoadData = "SELECT * FROM city ";
        ds.connector.query(LoadData, function (err, citys) {

            if (err) console.error(err);

            cb(err, citys);

        });
    };

    Login.remoteMethod(
        'getCity',
        {
            http: { path: '/getCity', verb: 'get' },
            description: 'Get list of City',
            accepts: { arg: 'id_city', type: 'integer' },
            returns: { arg: 'data', type: ['city'], root: true }
        }
    );



};

