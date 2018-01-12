'use strict';

module.exports = function (MstBedType) {

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
    MstBedType.remoteMethod(
        'postMstBedType',
        {
            http: { path: '/postMstBedType', verb: 'post' },
            description: 'Insert MstBedType',
            accepts: { arg: 'data', type: 'object', http: { source: 'req' } },
            returns: { arg: 'data', type: ['mstbedtype'], root: true }
        }
    );

    MstBedType.postMstBedType = function (req, cb) {
        console.log(req.body);
        setTimeout(() => {
            var InsertData = `Insert into mstbedtype(code_bedtype, name_bedtype, desc_bedtype, active, createdate, createby, updatedate, updateby) 
        VALUES ('${req.body.bedtypeCode}', '${req.body.bedtypeName}', '${req.body.bedtypeDesc}', '${req.body.active}', CURRENT_DATE, 1, null, null)`;
            ds.connector.query(InsertData, function (err, mstbedtypes) {

                if (err) console.error(err);

                cb(err, mstbedtypes);

            });
        },
            5000);
    };



    MstBedType.remoteMethod(
        'postMstBedTypeByID',
        {
            http: { path: '/postMstBedTypeByID/:id', verb: 'post' },
            description: 'Update MstBedType',
            accepts: [{ arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            { arg: 'data', type: 'object', http: { source: 'req' } }],
            returns: { arg: 'data', type: ['mstbedtype'], root: true }
        }
    );

    MstBedType.postMstBedTypeByID = function (req, bedtype, cb) {
        console.log(req);
        console.log(bedtype.body);
        setTimeout(() => {
            var UpdateData = `UPDATE mstbedtype SET code_bedtype='${bedtype.body.bedtypeCode}', name_bedtype='${bedtype.body.bedtypeName}', desc_bedtype='${bedtype.body.bedtypeDesc}', active='${bedtype.body.active}', updatedate = CURRENT_DATE, updateby = '1' WHERE id_bedtype = ${req}`;
            ds.connector.query(UpdateData, function (err, mstbedtypes) {

                if (err) console.error(err);

                cb(err, mstbedtypes);

            });
        },
            5000);
    };
    //POST

    MstBedType.getMstBedType = function (req, cb) {
        setTimeout(() => {
            var LoadData = `SELECT * FROM mstbedtype`;
            ds.connector.query(LoadData, function (err, mstbedtypes) {

                if (err) console.error(err);

                cb(err, mstbedtypes);

            });
        },
            5000);

    };

    MstBedType.remoteMethod(
        'getMstBedType',
        {
            http: { path: '/getMstBedType', verb: 'get' },
            description: 'Get list of Master BedType',
            accepts: { arg: 'id_bedtype', type: 'integer' },
            returns: { arg: 'data', type: ['mstbedtype'], root: true }
        }
    );

    MstBedType.remoteMethod(
        'getMstBedTypeByID',
        {
            http: { path: '/getMstBedTypeByID/:id', verb: 'get' },
            description: 'Get MstBedType By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstbedtype'], root: true }
        }
    );

    MstBedType.getMstBedTypeByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var getData = `SELECT * FROM mstbedtype WHERE id_bedtype = ${req}`;
            ds.connector.query(getData, function (err, mstbedtypes) {

                if (err) console.error(err);

                cb(err, mstbedtypes);

            });
        },
            5000);
    };


    //DELETE
    MstBedType.remoteMethod(
        'deleteMstBedTypeByID',
        {
            http: { path: '/deleteMstBedTypeByID/:id', verb: 'delete' },
            description: 'Delete MstBedType By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstbedtype'], root: true }
        }
    );

    MstBedType.deleteMstBedTypeByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var DeleteData = `DELETE FROM mstbedtype WHERE id_bedtype = ${req}`;
            ds.connector.query(DeleteData, function (err, mstbedtypes) {

                if (err) console.error(err);

                cb(err, mstbedtypes);

            });
        },
            5000);

    };
    //DELETE


}