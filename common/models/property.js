'use strict';

module.exports = function (Property) {

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

    //POST
    Property.remoteMethod(
        'postProperty',
        {
            http: { path: '/postProperty', verb: 'post' },
            description: 'Insert property',
            accepts: { arg: 'data', type: 'object', http: { source: 'req' } },
            returns: { arg: 'data', type: ['property'], root: true }
        }
    );

    Property.postProperty = function (req, cb) {
        console.log(req.body);
        setTimeout(() => {
            var InsertData = `Insert into property(code_property, name_property, code_brand, address1, address2, address3, activatedkey, code_city, code_citycountry, code_country, no_rooms, postcode, createdate, createby, updatedate, updateby) 
            VALUES ('${req.body.propCode}', '${req.body.propName}', '${req.body.propBrand}', '${req.body.propAddress1}', '${req.body.propAddress2}', '${req.body.propAddress3}', '${req.body.propActivatedkey}', '${req.body.propCity}', '${req.body.propCityCountry}', '${req.body.propCountry}', '${req.body.propNorooms}', '${req.body.propPostcode}', '2017-12-07', 1, null, null)`;
            ds.connector.query(InsertData, function (err, propertys) {

                if (err) console.error(err);

                cb(err, propertys);

            });
        },
            5000);
    };



    Property.remoteMethod(
        'postPropertyByID',
        {
            http: { path: '/postPropertyByID/:id', verb: 'post' },
            description: 'Update property',
            accepts: [{ arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            { arg: 'data', type: 'object', http: { source: 'req' } }],
            returns: { arg: 'data', type: ['property'], root: true }
        }
    );

    Property.postPropertyByID = function (req, prop, cb) {
        console.log(req);
        console.log(prop.body);
        setTimeout(() => {
            var UpdateData = `UPDATE property SET code_property='${prop.body.propCode}', name_property='${prop.body.propName}', code_brand='${prop.body.propBrand}', address1='${prop.body.propAddress1}', address2='${prop.body.propAddress2}', address3='${prop.body.propAddress3}',
        activatedkey='${prop.body.propActivatedkey}', code_city = '${prop.body.propCity}', code_citycountry = '${prop.body.propCityCountry}', code_country = '${prop.body.propCountry}', no_rooms = '${prop.body.propNorooms}', postcode='${prop.body.propPostcode}', updatedate = '2017-12-07', updateby = '1' WHERE id_property= ${req}`;
            ds.connector.query(UpdateData, function (err, propertys) {

                if (err) console.error(err);

                cb(err, propertys);

            });
        },
            5000);

    };
    //POST

    //GET
    Property.remoteMethod(
        'getProperty',
        {
            http: { path: '/getProperty', verb: 'get' },
            description: 'Get list of property',
            accepts: { arg: 'id_property', type: 'integer' },
            returns: { arg: 'data', type: ['property'], root: true }
        }
    );

    Property.getProperty = function (req, cb) {
        setTimeout(() => {
            var LoadData = "SELECT * FROM property LEFT JOIN brand ON property.code_brand = brand.code_brand ";
            ds.connector.query(LoadData, function (err, propertys) {

                if (err) console.error(err);

                cb(err, propertys);
                console.log(propertys);

            });
        },
            5000);

    };

    Property.remoteMethod(
        'getPropertyByID',
        {
            http: { path: '/getPropertyByID/:id', verb: 'get' },
            description: 'Get property By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['property'], root: true }
        }
    );

    Property.getPropertyByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var getData = `SELECT * FROM property LEFT JOIN brand ON property.code_brand = brand.code_brand WHERE property.id_property = ${req}`;
            ds.connector.query(getData, function (err, propertys) {

                if (err) console.error(err);

                cb(err, propertys);

            });
        },
            5000);

    };
    //GET

    //DELETE
    Property.remoteMethod(
        'deletePropertyByID',
        {
            http: { path: '/deletePropertyByID/:id', verb: 'delete' },
            description: 'Delete property By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['property'], root: true }
        }
    );

    Property.deletePropertyByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var DeleteData = `DELETE FROM property WHERE property.id_property = ${req}`;
            ds.connector.query(DeleteData, function (err, propertys) {

                if (err) console.error(err);

                cb(err, propertys);

            });
        },
            5000);
    };
    //DELETE
};
