'use strict';

module.exports = function (MstRoomTypeGroup) {

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
    MstRoomTypeGroup.remoteMethod(
        'postMstRoomTypeGroup',
        {
            http: { path: '/postMstRoomTypeGroup', verb: 'post' },
            description: 'Insert mstroomtypegroup',
            accepts: { arg: 'data', type: 'object', http: { source: 'req' } },
            returns: { arg: 'data', type: ['mstroomtypegroup'], root: true }
        }
    );

    MstRoomTypeGroup.postMstRoomTypeGroup = function (req, cb) {
        console.log(req.body);
        setTimeout(() => {
            var InsertData = `Insert into mstroomtypegroup(code_roomtypegroup, name_roomtypegroup, code_roomtypegroup, createdate, createby, updatedate, updateby) 
        VALUES ('${req.body.roomclassCode}', '${req.body.roomclassName}', CURRENT_DATE, 1, null, null)`;
            ds.connector.query(InsertData, function (err, mstroomtypegroups) {

                if (err) console.error(err);

                cb(err, mstroomtypegroups);

            });
        },
            5000);
    };



    MstRoomTypeGroup.remoteMethod(
        'postMstRoomTypeGroupByID',
        {
            http: { path: '/postMstRoomTypeGroupByID/:id', verb: 'post' },
            description: 'Update MstRoomTypeGroup',
            accepts: [{ arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            { arg: 'data', type: 'object', http: { source: 'req' } }],
            returns: { arg: 'data', type: ['mstroomtypegroup'], root: true }
        }
    );

    MstRoomTypeGroup.postMstRoomTypeGroupByID = function (req, roomtypegroup, cb) {
        console.log(req);
        console.log(roomclass.body);
        setTimeout(() => {
            var UpdateData = `UPDATE mstroomtypegroup SET code_roomtypegroup='${roomclass.body.roomtypegroupCode}', name_roomtypegroup='${roomclass.body.roomtypegroupName}', updatedate = CURRENT_DATE, updateby = '1' WHERE id_roomtypegroup = ${req}`;
            ds.connector.query(UpdateData, function (err, mstroomtypegroups) {

                if (err) console.error(err);

                cb(err, mstroomtypegroups);

            });
        },
            5000);
    };
    //POST


    MstRoomTypeGroup.getMstRoomTypeGroup = function (req, cb) {
        setTimeout(() => {
            var LoadData = `SELECT * FROM mstroomtypegroup`;
            ds.connector.query(LoadData, function (err, mstroomtypegroups) {

                if (err) console.error(err);

                cb(err, mstroomtypegroups);

            });
        },
            5000);

    };

    MstRoomTypeGroup.remoteMethod(
        'getMstRoomTypeGroup',
        {
            http: { path: '/getMstRoomTypeGroup', verb: 'get' },
            description: 'Get list of Master RoomTypeGroup',
            accepts: { arg: 'id_roomtypegroup', type: 'integer' },
            returns: { arg: 'data', type: ['mstroomtypegroup'], root: true }
        }
    );

    MstRoomTypeGroup.remoteMethod(
        'getMstRoomTypeGroupByID',
        {
            http: { path: '/getMstRoomTypeGroupByID/:id', verb: 'get' },
            description: 'Get MstRoomTypeGroup By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstroomtypegroup'], root: true }
        }
    );

    MstRoomTypeGroup.getMstRoomTypeGroupByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var getData = `SELECT * FROM mstroomtypegroup WHERE id_roomtypegroup = ${req}`;
            ds.connector.query(getData, function (err, mstroomtypegroups) {

                if (err) console.error(err);

                cb(err, mstroomtypegroups);

            });
        },
            5000);
    };


    //DELETE
    MstRoomTypeGroup.remoteMethod(
        'deleteMstRoomTypeGroupByID',
        {
            http: { path: '/deleteMstRoomTypeGroupByID/:id', verb: 'delete' },
            description: 'Delete MstRoomTypeGroup By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstroomtypegroup'], root: true }
        }
    );

    MstRoomTypeGroup.deleteMstRoomTypeGroupByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var DeleteData = `DELETE FROM mstroomtypegroup WHERE id_roomtypegroup = ${req}`;
            ds.connector.query(DeleteData, function (err, mstroomtypegroups) {

                if (err) console.error(err);

                cb(err, mstroomtypegroups);

            });
        },
            5000);

    };
    //DELETE


}