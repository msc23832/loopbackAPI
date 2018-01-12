'use strict';

module.exports = function (MstRoomType) {

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
    MstRoomType.postMstRoomType = function (req, cb) {
        console.log(req.body);
        setTimeout(() => {
            var InsertData = `Insert into mstroomtype(seq_roomtype, code_roomtype, name_roomtype, desc_roomtype, code_roomclass, code_roomtypegroup, def_no_guest, def_occ, def_min_adult, def_max_adult, def_min_child, def_max_child, def_bed_addable, def_bedtype, max_no_bed, createdate, createby, updatedate, updateby)
            VALUES ('${req.body.roomTypeSeq}', '${req.body.roomTypeCode}', '${req.body.roomTypeName}', '${req.body.roomTypeDesc}', '${req.body.roomTypeClass}', '${req.body.roomTypeGroup}', '${req.body.def_no_guest}', '${req.body.def_occ}', '${req.body.def_min_adult}', '${req.body.def_max_adult}', '${req.body.def_min_child}', '${req.body.def_max_child}', '${req.body.def_bed_addable}', '${req.body.def_bedtype}', '${req.body.max_no_bed}', CURRENT_DATE, 1, null, null)`;
            ds.connector.query(InsertData, function (err, mstroomtypes) {

                if (err) console.error(err);

                cb(err, mstroomtypes);

            });
        },
            5000);

    };

    MstRoomType.remoteMethod(
        'postMstRoomType',
        {
            http: { path: '/postMstRoomType', verb: 'post' },
            description: 'Insert Master RoomType',
            accepts: { arg: 'data', type: 'object', http: { source: 'req' } },
            returns: { arg: 'data', type: ['mstroomtype'], root: true }
        }
    );

    MstRoomType.postMstRoomTypeByID = function (req, roomtype, cb) {
        console.log(req);
        console.log(roomtype.body);
        setTimeout(() => {
            var UpdateData = `UPDATE mstroomtype SET seq_roomtype = '${roomtype.body.roomTypeSeq}', code_roomtype = '${roomtype.body.roomTypeCode}', name_roomtype = '${roomtype.body.roomTypeName}', desc_roomtype = '${roomtype.body.roomTypeDesc}', code_roomclass = '${roomtype.body.roomTypeClass}', code_roomtypegroup = '${roomtype.body.roomTypeGroup}', def_no_guest = '${roomtype.body.def_no_guest}', def_occ = '${roomtype.body.def_occ}', def_min_adult = '${roomtype.body.def_min_adult}', def_max_adult = '${roomtype.body.def_max_adult}', def_min_child = '${roomtype.body.def_min_child}', def_max_child = '${roomtype.body.def_max_child}', def_bed_addable = '${roomtype.body.def_bed_addable}', def_bedtype = '${roomtype.body.def_bedtype}', max_no_bed = '${roomtype.body.max_no_bed}', updatedate = CURRENT_DATE, updateby = '1' WHERE id_roomtype = ${req}`;
            ds.connector.query(UpdateData, function (err, mstroomtypes) {

                if (err) console.error(err);

                cb(err, mstroomtypes);

            });
        },
            5000);

    };

    MstRoomType.remoteMethod(
        'postMstRoomTypeByID',
        {
            http: { path: '/postMstRoomTypeByID/:id', verb: 'post' },
            description: 'Update Master RoomType',
            accepts: [{ arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            { arg: 'data', type: 'object', http: { source: 'req' } }],
            returns: { arg: 'data', type: ['mstroomtype'], root: true }
        }
    );
    //POST


    //GET
    MstRoomType.getMstRoomType = function (req, cb) {
        setTimeout(() => {
            var LoadData = `SELECT mstroomtype.*, mstroomclass.name_roomclass, mstroomtypegroup.name_roomtypegroup FROM mstroomtype 
            LEFT JOIN mstroomclass ON mstroomclass.code_roomclass = mstroomtype.code_roomclass
            LEFT JOIN mstroomtypegroup ON mstroomtypegroup.code_roomtypegroup = mstroomtype.code_roomtypegroup`;
            ds.connector.query(LoadData, function (err, mstroomtypes) {

                if (err) console.error(err);

                cb(err, mstroomtypes);

            });
        },
            5000);

    };

    MstRoomType.remoteMethod(
        'getMstRoomType',
        {
            http: { path: '/getMstRoomType', verb: 'get' },
            description: 'Get list of Master RoomType',
            accepts: { arg: 'id_roomtype', type: 'integer' },
            returns: { arg: 'data', type: ['mstroomtype'], root: true }
        }
    );

    MstRoomType.getMstRoomTypeByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var getData = `SELECT mstroomtype.*, mstroomclass.name_roomclass, mstroomtypegroup.name_roomtypegroup FROM mstroomtype 
            LEFT JOIN mstroomclass ON mstroomclass.code_roomclass = mstroomtype.code_roomclass
            LEFT JOIN mstroomtypegroup ON mstroomtypegroup.code_roomtypegroup = mstroomtype.code_roomtypegroup
            WHERE mstroomtype.id_roomtype = ${req}`;
            ds.connector.query(getData, function (err, propertys) {

                if (err) console.error(err);

                cb(err, propertys);

            });
        },
            5000);

    };

    MstRoomType.remoteMethod(
        'getMstRoomTypeByID',
        {
            http: { path: '/getMstRoomTypeByID/:id', verb: 'get' },
            description: 'Get RoomType By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstroomtype'], root: true }
        }
    );
    //GET

    //DELETE
    MstRoomType.deleteMstRoomTypeByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var DeleteData = `DELETE FROM mstroomtype WHERE id_roomtype = ${req}`;
            ds.connector.query(DeleteData, function (err, mstroomtypes) {

                if (err) console.error(err);

                cb(err, mstroomtypes);

            });
        },
            5000);

    };

    MstRoomType.remoteMethod(
        'deleteMstRoomTypeByID',
        {
            http: { path: '/deleteMstRoomTypeByID/:id', verb: 'delete' },
            description: 'Delete MstRoomType By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstroomtype'], root: true }
        }
    );
    //DELETE
}