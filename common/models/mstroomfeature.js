'use strict';

module.exports = function (MstRoomFeature) {

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
    MstRoomFeature.remoteMethod(
        'postMstRoomFeature',
        {
            http: { path: '/postMstRoomFeature', verb: 'post' },
            description: 'Insert MstRoomFeature',
            accepts: { arg: 'data', type: 'object', http: { source: 'req' } },
            returns: { arg: 'data', type: ['mstroomfeature'], root: true }
        }
    );

    MstRoomFeature.postMstRoomFeature = function (req, cb) {
        console.log(req.body);
        setTimeout(() => {
            var InsertData = `Insert into mstroomfeature(code_roomfeature, name_roomfeature, createdate, createby, updatedate, updateby) 
        VALUES ('${req.body.roomfeatureCode}', '${req.body.roomfeatureName}', CURRENT_DATE, 1, null, null)`;
            ds.connector.query(InsertData, function (err, mstroomfeatures) {

                if (err) console.error(err);

                cb(err, mstroomfeatures);

            });
        },
            5000);
    };



    MstRoomFeature.remoteMethod(
        'postMstRoomFeatureByID',
        {
            http: { path: '/postMstRoomFeatureByID/:id', verb: 'post' },
            description: 'Update MstRoomFeature',
            accepts: [{ arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            { arg: 'data', type: 'object', http: { source: 'req' } }],
            returns: { arg: 'data', type: ['mstroomfeature'], root: true }
        }
    );

    MstRoomFeature.postMstRoomFeatureByID = function (req, roomfeature, cb) {
        console.log(req);
        console.log(roomfeature.body);
        setTimeout(() => {
            var UpdateData = `UPDATE mstroomfeature SET code_roomfeature='${roomfeature.body.roomfeatureCode}', name_roomfeature='${roomfeature.body.roomfeatureName}', updatedate = CURRENT_DATE, updateby = '1' WHERE id_roomfeature = ${req}`;
            ds.connector.query(UpdateData, function (err, mstroomfeatures) {

                if (err) console.error(err);

                cb(err, mstroomfeatures);

            });
        },
            5000);
    };
    //POST


    MstRoomFeature.getMstRoomFeature = function (req, cb) {
        setTimeout(() => {
            var LoadData = `SELECT * FROM mstroomfeature`;
            ds.connector.query(LoadData, function (err, mstroomfeatures) {

                if (err) console.error(err);

                cb(err, mstroomfeatures);

            });
        },
            5000);

    };

    MstRoomFeature.remoteMethod(
        'getMstRoomFeature',
        {
            http: { path: '/getMstRoomFeature', verb: 'get' },
            description: 'Get list of Master RoomFeature',
            accepts: { arg: 'id_roomfeature', type: 'integer' },
            returns: { arg: 'data', type: ['mstroomfeature'], root: true }
        }
    );

    MstRoomFeature.remoteMethod(
        'getMstRoomFeatureByID',
        {
            http: { path: '/getMstRoomFeatureByID/:id', verb: 'get' },
            description: 'Get MstRoomFeature By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstroomfeature'], root: true }
        }
    );

    MstRoomFeature.getMstRoomFeatureByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var getData = `SELECT * FROM mstroomfeature WHERE id_roomfeature = ${req}`;
            ds.connector.query(getData, function (err, mstroomfeatures) {

                if (err) console.error(err);

                cb(err, mstroomfeatures);

            });
        },
            5000);
    };


    //DELETE
    MstRoomFeature.remoteMethod(
        'deleteMstRoomFeatureByID',
        {
            http: { path: '/deleteMstRoomFeatureByID/:id', verb: 'delete' },
            description: 'Delete MstRoomFeature By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstroomfeature'], root: true }
        }
    );

    MstRoomFeature.deleteMstRoomFeatureByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var DeleteData = `DELETE FROM mstroomfeature WHERE id_roomfeature = ${req}`;
            ds.connector.query(DeleteData, function (err, mstroomfeatures) {

                if (err) console.error(err);

                cb(err, mstroomfeatures);

            });
        },
            5000);

    };
    //DELETE


}