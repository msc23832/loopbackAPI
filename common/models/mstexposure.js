'use strict';

module.exports = function (MstExposure) {

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
    MstExposure.remoteMethod(
        'postMstExposure',
        {
            http: { path: '/postMstExposure', verb: 'post' },
            description: 'Insert MstExposure',
            accepts: { arg: 'data', type: 'object', http: { source: 'req' } },
            returns: { arg: 'data', type: ['mstexposure'], root: true }
        }
    );

    MstExposure.postMstExposure = function (req, cb) {
        console.log(req.body);
        setTimeout(() => {
            var InsertData = `Insert into mstexposure(code_exposure, name_exposure, createdate, createby, updatedate, updateby) 
        VALUES ('${req.body.exposureCode}', '${req.body.exposureName}', CURRENT_DATE, 1, null, null)`;
            ds.connector.query(InsertData, function (err, mstexposures) {

                if (err) console.error(err);

                cb(err, mstexposures);

            });
        },
            5000);
    };



    MstExposure.remoteMethod(
        'postMstExposureByID',
        {
            http: { path: '/postMstExposureByID/:id', verb: 'post' },
            description: 'Update MstExposure',
            accepts: [{ arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            { arg: 'data', type: 'object', http: { source: 'req' } }],
            returns: { arg: 'data', type: ['mstexposure'], root: true }
        }
    );

    MstExposure.postMstExposureByID = function (req, exposure, cb) {
        console.log(req);
        console.log(exposure.body);
        setTimeout(() => {
            var UpdateData = `UPDATE mstexposure SET code_exposure='${exposure.body.exposureCode}', name_exposure='${exposure.body.exposureName}', updatedate = CURRENT_DATE, updateby = '1' WHERE id_exposure = ${req}`;
            ds.connector.query(UpdateData, function (err, mstexposures) {

                if (err) console.error(err);

                cb(err, mstexposures);

            });
        },
            5000);
    };
    //POST

    MstExposure.getMstExposure = function (req, cb) {
        setTimeout(() => {
            var LoadData = `SELECT * FROM mstexposure`;
            ds.connector.query(LoadData, function (err, mstexposures) {

                if (err) console.error(err);

                cb(err, mstexposures);

            });
        },
            5000);

    };

    MstExposure.remoteMethod(
        'getMstExposure',
        {
            http: { path: '/getMstExposure', verb: 'get' },
            description: 'Get list of Master Exposure',
            accepts: { arg: 'id_exposure', type: 'integer' },
            returns: { arg: 'data', type: ['mstexposure'], root: true }
        }
    );

    MstExposure.remoteMethod(
        'getMstExposureByID',
        {
            http: { path: '/getMstExposureByID/:id', verb: 'get' },
            description: 'Get MstExposure By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstexposure'], root: true }
        }
    );

    MstExposure.getMstExposureByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var getData = `SELECT * FROM mstexposure WHERE id_exposure = ${req}`;
            ds.connector.query(getData, function (err, mstexposures) {

                if (err) console.error(err);

                cb(err, mstexposures);

            });
        },
            5000);
    };


    //DELETE
    MstExposure.remoteMethod(
        'deleteMstExposureByID',
        {
            http: { path: '/deleteMstExposureByID/:id', verb: 'delete' },
            description: 'Delete MstExposure By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstexposure'], root: true }
        }
    );

    MstExposure.deleteMstExposureByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var DeleteData = `DELETE FROM mstexposure WHERE id_exposure = ${req}`;
            ds.connector.query(DeleteData, function (err, mstexposures) {

                if (err) console.error(err);

                cb(err, mstexposures);

            });
        },
            5000);

    };
    //DELETE


}