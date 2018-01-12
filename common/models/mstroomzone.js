'use strict';

module.exports = function (MstRoomZone) {

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
    MstRoomZone.remoteMethod(
        'postMstRoomZone',
        {
            http: { path: '/postMstRoomZone', verb: 'post' },
            description: 'Insert MstRoomZone',
            accepts: { arg: 'data', type: 'object', http: { source: 'req' } },
            returns: { arg: 'data', type: ['mstroomzone'], root: true }
        }
    );

    MstRoomZone.postMstRoomZone = function (req, cb) {
        console.log(req.body);
        setTimeout(() => {
            var InsertData = `Insert into mstroomzone(code_roomzone, name_roomzone, createdate, createby, updatedate, updateby) 
        VALUES ('${req.body.roomzoneCode}', '${req.body.roomzoneName}', CURRENT_DATE, 1, null, null)`;
            ds.connector.query(InsertData, function (err, mstroomzones) {

                if (err) console.error(err);

                cb(err, mstroomzones);

            });
        },
            5000);
    };



    MstRoomZone.remoteMethod(
        'postMstRoomZoneByID',
        {
            http: { path: '/postMstRoomZoneByID/:id', verb: 'post' },
            description: 'Update MstRoomZone',
            accepts: [{ arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            { arg: 'data', type: 'object', http: { source: 'req' } }],
            returns: { arg: 'data', type: ['mstroomzone'], root: true }
        }
    );

    MstRoomZone.postMstRoomZoneByID = function (req, roomzone, cb) {
        console.log(req);
        console.log(roomzone.body);
        setTimeout(() => {
            var UpdateData = `UPDATE mstroomzone SET code_roomzone='${roomzone.body.roomzoneCode}', name_roomzone='${roomzone.body.roomzoneName}', updatedate = CURRENT_DATE, updateby = '1' WHERE id_roomclass = ${req}`;
            ds.connector.query(UpdateData, function (err, mstroomzones) {

                if (err) console.error(err);

                cb(err, mstroomzones);

            });
        },
            5000);
    };
    //POST


    MstRoomZone.getMstRoomZone = function (req, cb) {
        setTimeout(() => {
            var LoadData = `SELECT * FROM mstroomzone`;
            ds.connector.query(LoadData, function (err, mstroomzones) {

                if (err) console.error(err);

                cb(err, mstroomzones);

            });
        },
            5000);

    };

    MstRoomZone.remoteMethod(
        'getMstRoomZone',
        {
            http: { path: '/getMstRoomZone', verb: 'get' },
            description: 'Get list of Master RoomZone',
            accepts: { arg: 'id_roomzone', type: 'integer' },
            returns: { arg: 'data', type: ['mstroomzone'], root: true }
        }
    );

    MstRoomZone.remoteMethod(
        'getMstRoomZoneByID',
        {
            http: { path: '/getMstRoomZoneByID/:id', verb: 'get' },
            description: 'Get MstRoomZone By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstroomzone'], root: true }
        }
    );

    MstRoomZone.getMstRoomZoneByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var getData = `SELECT * FROM mstroomzone WHERE id_roomzone = ${req}`;
            ds.connector.query(getData, function (err, mstroomzones) {

                if (err) console.error(err);

                cb(err, mstroomzones);

            });
        },
            5000);
    };


    //DELETE
    MstRoomZone.remoteMethod(
        'deleteMstRoomZoneByID',
        {
            http: { path: '/deleteMstRoomZoneByID/:id', verb: 'delete' },
            description: 'Delete MstRoomZone By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstroomzone'], root: true }
        }
    );

    MstRoomZone.deleteMstRoomZoneByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var DeleteData = `DELETE FROM mstroomzone WHERE id_roomzone = ${req}`;
            ds.connector.query(DeleteData, function (err, mstroomzones) {

                if (err) console.error(err);

                cb(err, mstroomzones);

            });
        },
            5000);

    };
    //DELETE


}