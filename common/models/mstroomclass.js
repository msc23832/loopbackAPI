'use strict';

module.exports = function (MstRoomClass) {

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
    MstRoomClass.remoteMethod(
        'postMstRoomClass',
        {
            http: { path: '/postMstRoomClass', verb: 'post' },
            description: 'Insert MstRoomClass',
            accepts: { arg: 'data', type: 'object', http: { source: 'req' } },
            returns: { arg: 'data', type: ['mstroomclass'], root: true }
        }
    );

    MstRoomClass.postMstRoomClass = function (req, cb) {
        console.log(req.body);
        setTimeout(() => {
            var InsertData = `Insert into mstroomclass(code_roomclass, name_roomclass, createdate, createby, updatedate, updateby) 
        VALUES ('${req.body.roomclassCode}', '${req.body.roomclassName}', CURRENT_DATE, 1, null, null)`;
            ds.connector.query(InsertData, function (err, mstroomclasses) {

                if (err) console.error(err);

                cb(err, mstroomclasses);

            });
        },
            5000);
    };



    MstRoomClass.remoteMethod(
        'postMstRoomClassByID',
        {
            http: { path: '/postMstRoomClassByID/:id', verb: 'post' },
            description: 'Update MstRoomClass',
            accepts: [{ arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            { arg: 'data', type: 'object', http: { source: 'req' } }],
            returns: { arg: 'data', type: ['mstroomclass'], root: true }
        }
    );

    MstRoomClass.postMstRoomClassByID = function (req, roomclass, cb) {
        console.log(req);
        console.log(roomclass.body);
        setTimeout(() => {
            var UpdateData = `UPDATE mstroomclass SET code_roomclass='${roomclass.body.roomclassCode}', name_roomclass='${roomclass.body.roomclassName}', updatedate = CURRENT_DATE, updateby = '1' WHERE id_roomclass = ${req}`;
            ds.connector.query(UpdateData, function (err, mstroomclasses) {

                if (err) console.error(err);

                cb(err, mstroomclasses);

            });
        },
            5000);
    };
    //POST


    MstRoomClass.getMstRoomClass = function (req, cb) {
        setTimeout(() => {
            var LoadData = `SELECT * FROM mstroomclass`;
            ds.connector.query(LoadData, function (err, mstroomclasses) {

                if (err) console.error(err);

                cb(err, mstroomclasses);

            });
        },
            5000);

    };

    MstRoomClass.remoteMethod(
        'getMstRoomClass',
        {
            http: { path: '/getMstRoomClass', verb: 'get' },
            description: 'Get list of Master RoomClass',
            accepts: { arg: 'id_roomclass', type: 'integer' },
            returns: { arg: 'data', type: ['mstroomclass'], root: true }
        }
    );

    MstRoomClass.remoteMethod(
        'getMstRoomClassByID',
        {
            http: { path: '/getMstRoomClassByID/:id', verb: 'get' },
            description: 'Get MstRoomClass By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstroomclass'], root: true }
        }
    );

    MstRoomClass.getMstRoomClassByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var getData = `SELECT * FROM mstroomclass WHERE id_roomclass = ${req}`;
            ds.connector.query(getData, function (err, mstroomclasses) {

                if (err) console.error(err);

                cb(err, mstroomclasses);

            });
        },
            5000);
    };


    //DELETE
    MstRoomClass.remoteMethod(
        'deleteMstRoomClassByID',
        {
            http: { path: '/deleteMstRoomClassByID/:id', verb: 'delete' },
            description: 'Delete MstRoomClass By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstroomclass'], root: true }
        }
    );

    MstRoomClass.deleteMstRoomClassByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var DeleteData = `DELETE FROM mstroomclass WHERE id_roomclass = ${req}`;
            ds.connector.query(DeleteData, function (err, mstroomclasses) {

                if (err) console.error(err);

                cb(err, mstroomclasses);

            });
        },
            5000);

    };
    //DELETE


}