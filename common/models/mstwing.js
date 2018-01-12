'use strict';

module.exports = function (MstWing) {

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
    MstWing.remoteMethod(
        'postMstWing',
        {
            http: { path: '/postMstWing', verb: 'post' },
            description: 'Insert MstWing',
            accepts: { arg: 'data', type: 'object', http: { source: 'req' } },
            returns: { arg: 'data', type: ['mstwing'], root: true }
        }
    );

    MstWing.postMstWing = function (req, cb) {
        console.log(req.body);
        setTimeout(() => {
            var InsertData = `Insert into mstwing(code_brand, name_brand, active, brand_license, brand_validate, createdate, createby, updatedate, updateby) 
        VALUES ('${req.body.brandCode}', '${req.body.brandName}', '${req.body.active}', '${req.body.brandLicense}', '${req.body.brandValidate}', CURRENT_DATE, 1, null, null)`;
            ds.connector.query(InsertData, function (err, mstwings) {

                if (err) console.error(err);

                cb(err, mstwings);

            });
        },
            5000);
    };



    MstWing.remoteMethod(
        'postMstWingByID',
        {
            http: { path: '/postMstWingByID/:id', verb: 'post' },
            description: 'Update MstWing',
            accepts: [{ arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            { arg: 'data', type: 'object', http: { source: 'req' } }],
            returns: { arg: 'data', type: ['mstwing'], root: true }
        }
    );

    MstWing.postMstWingByID = function (req, prop, cb) {
        console.log(req);
        console.log(prop.body);
        setTimeout(() => {
            var UpdateData = `UPDATE mstwing SET code_brand='${prop.body.brandCode}', name_brand='${prop.body.brandName}', active='${prop.body.active}', brand_license='${prop.body.brandLicense}', brand_validate='${prop.body.brandValidate}', updatedate = CURRENT_DATE, updateby = '1' WHERE id_brand = ${req}`;
            ds.connector.query(UpdateData, function (err, mstwings) {

                if (err) console.error(err);

                cb(err, mstwings);

            });
        },
            5000);
    };
    //POST

    MstWing.getMstWing = function (req, cb) {
        setTimeout(() => {
            var LoadData = `SELECT mstwing.* , mstbuilding.name_building FROM mstwing INNER JOIN mstbuilding ON mstwing.code_building =  mstbuilding.code_building`;
            ds.connector.query(LoadData, function (err, mstwings) {

                if (err) console.error(err);

                cb(err, mstwings);

            });
        },
            5000);

    };

    MstWing.remoteMethod(
        'getMstWing',
        {
            http: { path: '/getMstWing', verb: 'get' },
            description: 'Get list of Master Wing',
            accepts: { arg: 'id_wing', type: 'integer' },
            returns: { arg: 'data', type: ['mstwing'], root: true }
        }
    );

    MstWing.remoteMethod(
        'getMstWingByID',
        {
            http: { path: '/getMstWingByID/:id', verb: 'get' },
            description: 'Get MstWing By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstwing'], root: true }
        }
    );

    MstWing.getMstWingByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var getData = `SELECT mstwing.* , mstbuilding.name_building FROM mstwing INNER JOIN mstbuilding ON mstwing.code_building =  mstbuilding.code_building WHERE mstwing.id_wing = ${req}`;
            ds.connector.query(getData, function (err, mstwings) {

                if (err) console.error(err);

                cb(err, mstwings);

            });
        },
            5000);
    };


    //DELETE
    MstWing.remoteMethod(
        'deleteMstWingByID',
        {
            http: { path: '/deleteMstWingByID/:id', verb: 'delete' },
            description: 'Delete MstWing By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstwing'], root: true }
        }
    );

    MstWing.deleteMstWingByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var DeleteData = `DELETE FROM mstwing WHERE id_wing = ${req}`;
            ds.connector.query(DeleteData, function (err, mstwings) {

                if (err) console.error(err);

                cb(err, mstwings);

            });
        },
            5000);

    };
    //DELETE


}