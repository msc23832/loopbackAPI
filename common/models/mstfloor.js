'use strict';

module.exports = function (MstFloor) {

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
     MstFloor.remoteMethod(
        'postMstFloor',
        {
            http: { path: '/postMstFloor', verb: 'post' },
            description: 'Insert MstFloor',
            accepts: { arg: 'data', type: 'object', http: { source: 'req' } },
            returns: { arg: 'data', type: ['mstfloor'], root: true }
        }
    );

    MstFloor.postMstFloor = function (req, cb) {
        console.log(req.body);
        setTimeout(() => {
            var InsertData = `Insert into mstfloor(code_property, code_floor, name_floor, desc_floor, active, createdate, createby, updatedate, updateby) 
        VALUES ('${req.body.floorProperty}', '${req.body.floorCode}', '${req.body.floorName}', '${req.body.floorDesc}', '${req.body.active}', CURRENT_DATE, 1, null, null)`;
            ds.connector.query(InsertData, function (err, mstfloors) {

                if (err) console.error(err);

                cb(err, mstfloors);

            });
        },
            5000);
    };



    MstFloor.remoteMethod(
        'postMstFloorByID',
        {
            http: { path: '/postMstFloorByID/:id', verb: 'post' },
            description: 'Update MstFloor',
            accepts: [{ arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            { arg: 'data', type: 'object', http: { source: 'req' } }],
            returns: { arg: 'data', type: ['mstfloor'], root: true }
        }
    );

    MstFloor.postMstFloorByID = function (req, mstfloor, cb) {
        console.log(req);
        console.log(mstfloor.body);
        setTimeout(() => {
            var UpdateData = `UPDATE mstfloor SET code_property='${mstfloor.body.floorProperty}', code_floor='${mstfloor.body.floorCode}', name_floor='${req.body.floorName}', desc_floor='${req.body.floorDesc}', active='${req.body.active}',  updatedate = CURRENT_DATE, updateby = '1' WHERE id_floor = ${req}`;
            ds.connector.query(UpdateData, function (err, mstfloors) {

                if (err) console.error(err);

                cb(err, mstfloors);

            });
        },
            5000);
    };
    //POST


    MstFloor.getMstFloor = function (req, cb) {
        setTimeout(() => {
            var LoadData = `SELECT mstfloor.* , property.name_property FROM mstfloor INNER JOIN property ON property.code_property = mstfloor.code_property`;
            ds.connector.query(LoadData, function (err, mstfloors) {

                if (err) console.error(err);

                cb(err, mstfloors);

            });
        },
            5000);

    };

    MstFloor.remoteMethod(
        'getMstFloor',
        {
            http: { path: '/getMstFloor', verb: 'get' },
            description: 'Get list of Master Floor',
            accepts: { arg: 'id_floor', type: 'integer' },
            returns: { arg: 'data', type: ['mstfloor'], root: true }
        }
    );

    MstFloor.remoteMethod(
        'getMstFloorByID',
        {
            http: { path: '/getMstFloorByID/:id', verb: 'get' },
            description: 'Get MstFloor By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstfloor'], root: true }
        }
    );

    MstFloor.getMstFloorByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var getData = `SELECT * FROM mstfloor WHERE id_floor = ${req}`;
            ds.connector.query(getData, function (err, mstfloors) {

                if (err) console.error(err);

                cb(err, mstfloors);

            });
        },
            5000);
    };


    //DELETE
    MstFloor.remoteMethod(
        'deleteMstFloorByID',
        {
            http: { path: '/deleteMstFloorByID/:id', verb: 'delete' },
            description: 'Delete MstFloor By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstfloor'], root: true }
        }
    );

    MstFloor.deleteMstFloorByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var DeleteData = `DELETE FROM mstfloor WHERE id_floor = ${req}`;
            ds.connector.query(DeleteData, function (err, mstfloors) {

                if (err) console.error(err);

                cb(err, mstfloors);

            });
        },
            5000);

    };
    //DELETE


}