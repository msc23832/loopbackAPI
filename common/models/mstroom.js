'use strict';

module.exports = function (MstRoom) {

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
    MstRoom.postMstRoom = function (req, cb) {
        console.log(req.body);
        setTimeout(() => {
            var InsertData = `Insert into mstroom(code_room, name_room, code_property, code_floor, code_roomtype, desc_room, code_roomfeature, code_roomzone, code_wing, code_exposure, code_building, imgcatalog, active, createdate, createby, updatedate, updateby)
            VALUES ('${req.body.roomCode}', '${req.body.roomName}', '${req.body.roomProp}', '${req.body.roomFloor}', '${req.body.roomRoomType}', '${req.body.roomDesc}', '${req.body.roomFeature}', '${req.body.roomZone}', '${req.body.roomWing}', '${req.body.roomExposure}', '${req.body.roomBuilding}', '${req.body.roomImg}', '${req.body.active}', CURRENT_DATE, 1, null, null)`;
            ds.connector.query(InsertData, function (err, mstrooms) {

                if (err) console.error(err);

                cb(err, mstrooms);

            });
        },
            5000);

    };

    MstRoom.remoteMethod(
        'postMstRoom',
        {
            http: { path: '/postMstRoom', verb: 'post' },
            description: 'Insert Master Room',
            accepts: { arg: 'data', type: 'object', http: { source: 'req' } },
            returns: { arg: 'data', type: ['mstroom'], root: true }
        }
    );

    MstRoom.postMstRoomByID = function (req, room, cb) {
        console.log(req);
        console.log(room.body);
        setTimeout(() => {
            var UpdateData = `UPDATE mstroom SET code_room = '${room.body.roomCode}', name_room = '${room.body.roomName}', code_property = '${room.body.roomProp}', code_floor = '${room.body.roomFloor}', code_roomtype = '${room.body.roomRoomType}', desc_room = '${room.body.roomDesc}', code_roomfeature = '${room.body.roomFeature}', code_roomzone = '${room.body.roomZone}', code_wing = '${room.body.roomWing}', code_exposure = '${room.body.roomExposure}', code_building = '${room.body.roomBuilding}', imgcatalog = '${room.body.roomImg}', active = '${room.body.active}', updatedate = CURRENT_DATE, updateby = '1' WHERE id_room = ${req}`;
            ds.connector.query(UpdateData, function (err, mstrooms) {

                if (err) console.error(err);

                cb(err, mstrooms);

            });
        },
            5000);

    };

    MstRoom.remoteMethod(
        'postMstRoomByID',
        {
            http: { path: '/postMstRoomByID/:id', verb: 'post' },
            description: 'Update Master Room',
            accepts: [{ arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            { arg: 'data', type: 'object', http: { source: 'req' } }],
            returns: { arg: 'data', type: ['mstroom'], root: true }
        }
    );
    //POST


    //GET
    MstRoom.getMstRoom = function (req, cb) {
        setTimeout(() => {
            var LoadData = `SELECT mstroom.*, property.name_property, mstfloor.name_floor, mstroomtype.name_roomtype, mstwing.name_wing, mstbuilding.name_building FROM mstroom
            LEFT JOIN property ON property.code_property = mstroom.code_property
            LEFT JOIN mstfloor ON mstfloor.code_floor = mstroom.code_floor
            LEFT JOIN mstroomtype ON mstroomtype.code_roomtype = mstroom.code_roomtype
            LEFT JOIN mstwing ON mstwing.code_wing = mstroom.code_wing
            LEFT JOIN mstbuilding ON mstbuilding.code_building = mstroom.code_building`;
            // LEFT JOIN mstexposure ON mstexposure.code_exposure = mstroom.code_exposure
            // LEFT JOIN mstroomfeature ON mstroomfeature.code_roomfeature = mstroom.code_roomfeature
            // LEFT JOIN mstroomzone ON mstroomzone.code_roomzone = mstroom.code_roomzone
            ds.connector.query(LoadData, function (err, mstrooms) {

                if (err) console.error(err);

                cb(err, mstrooms);

            });
        },
            5000);

    };

    MstRoom.remoteMethod(
        'getMstRoom',
        {
            http: { path: '/getMstRoom', verb: 'get' },
            description: 'Get list of Master Room',
            accepts: { arg: 'id_room', type: 'integer' },
            returns: { arg: 'data', type: ['mstroom'], root: true }
        }
    );

    MstRoom.getMstRoomByID = function (req, cb) {
        setTimeout(() => {
            var LoadData = `SELECT mstroom.*, property.name_property, mstfloor.name_floor, mstroomtype.name_roomtype, mstwing.name_wing, mstbuilding.name_building FROM mstroom
            LEFT JOIN property ON property.code_property = mstroom.code_property
            LEFT JOIN mstfloor ON mstfloor.code_floor = mstroom.code_floor
            LEFT JOIN mstroomtype ON mstroomtype.code_roomtype = mstroom.code_roomtype
            LEFT JOIN mstwing ON mstwing.code_wing = mstroom.code_wing
            LEFT JOIN mstbuilding ON mstbuilding.code_building = mstroom.code_building 
            WHERE mstroom.id_room = ${req}`
            // LEFT JOIN mstexposure ON mstexposure.code_exposure = mstroom.code_exposure
            // LEFT JOIN mstroomfeature ON mstroomfeature.code_roomfeature = mstroom.code_roomfeature
            // LEFT JOIN mstroomzone ON mstroomzone.code_roomzone = mstroom.code_roomzone
            ds.connector.query(LoadData, function (err, mstrooms) {

                if (err) console.error(err);

                cb(err, mstrooms);

            });
        },
            5000);

    };

    MstRoom.remoteMethod(
        'getMstRoomByID',
        {
            http: { path: '/getMstRoomByID/:id', verb: 'get' },
            description: 'Get Master Room By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstroom'], root: true }
        }
    );
    //GET


    //DELETE
    MstRoom.deleteMstRoomByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var DeleteData = `DELETE FROM mstroom WHERE id_room = ${req}`;
            ds.connector.query(DeleteData, function (err, mstrooms) {

                if (err) console.error(err);

                cb(err, mstrooms);

            });
        },
            5000);

    };

    MstRoom.remoteMethod(
        'deleteMstRoomByID',
        {
            http: { path: '/deleteMstRoomByID/:id', verb: 'delete' },
            description: 'Delete MstRoom By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstroom'], root: true }
        }
    );
    //DELETE

}