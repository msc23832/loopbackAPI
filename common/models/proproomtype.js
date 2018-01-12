'use strict';

module.exports = function (PropRoomType) {

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
    PropRoomType.postPropRoomType = function (req, cb) {
        console.log(req.body);
        setTimeout(() => {
            var InsertData = `Insert into propertyroomtype(code_property, code_roomtype, code_bedtype, code_building, code_wing, no_rooms, createdate, createby, updatedate, updateby) 
            VALUES ('${req.body.propCode}', '${req.body.propRoomType}', '${req.body.propBedType}', '${req.body.propBuilding}', '${req.body.propWing}', '${req.body.propNorooms}', CURRENT_DATE, 1, null, null)`;
            ds.connector.query(InsertData, function (err, propertyroomtypes) {

                if (err) console.error(err);

                cb(err, propertyroomtypes);

            });
        },
            5000);
    };

    PropRoomType.remoteMethod(
        'postPropRoomType',
        {
            http: { path: '/postPropRoomType', verb: 'post' },
            description: 'Insert Property RoomType',
            accepts: { arg: 'data', type: 'object', http: { source: 'req' } },
            returns: { arg: 'data', type: ['propertyroomtype'], root: true }
        }
    );

    PropRoomType.postPropRoomTypeByID = function (req, prop, cb) {
        console.log(req);
        console.log(prop.body);
        setTimeout(() => {
            var UpdateData = `UPDATE propertyroomtype SET code_property='${prop.body.propCode}', code_roomtype='${prop.body.propRoomType}', code_bedtype='${prop.body.propBedType}', code_building='${prop.body.propBuilding}', code_wing='${prop.body.propWing}', no_rooms='${prop.body.propNorooms}', updatedate = CURRENT_DATE, updateby = '1' WHERE id_proproomtype = ${req}`;
            ds.connector.query(UpdateData, function (err, propertyroomtypes) {

                if (err) console.error(err);

                cb(err, propertyroomtypes);

            });
        },
            5000);
    };

    PropRoomType.remoteMethod(
        'postPropRoomTypeByID',
        {
            http: { path: '/postPropRoomTypeByID/:id', verb: 'post' },
            description: 'Update Property RoomType',
            accepts: [{ arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            { arg: 'data', type: 'object', http: { source: 'req' } }],
            returns: { arg: 'data', type: ['propertyroomtype'], root: true }
        }
    );
    //POST


    //GET
    PropRoomType.getPropRoomType = function (req, cb) {
        setTimeout(() => {
            var LoadData = `SELECT propertyroomtype.*, mstroomtype.name_roomtype, property.name_property, mstbedtype.name_bedtype, mstbuilding.name_building, mstwing.name_wing  FROM propertyroomtype 
        LEFT JOIN mstroomtype ON mstroomtype.code_roomtype = propertyroomtype.code_roomtype
        LEFT JOIN property ON property.code_property = propertyroomtype.code_property
        LEFT JOIN mstbedtype ON mstbedtype.code_bedtype = propertyroomtype.code_bedtype
        LEFT JOIN mstbuilding ON mstbuilding.code_building = propertyroomtype.code_building
        LEFT JOIN mstwing ON mstwing.code_wing = propertyroomtype.code_wing`;
            ds.connector.query(LoadData, function (err, propertyroomtypes) {

                if (err) console.error(err);

                cb(err, propertyroomtypes);

            });
        },
            5000);
    };

    PropRoomType.remoteMethod(
        'getPropRoomType',
        {
            http: { path: '/getPropRoomType', verb: 'get' },
            description: 'Get list of Property RoomType',
            accepts: { arg: 'id_proproomtype', type: 'integer' },
            returns: { arg: 'data', type: ['propertyroomtype'], root: true }
        }
    );

    PropRoomType.getPropRoomTypeByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var getData = `SELECT propertyroomtype.*, mstroomtype.name_roomtype, property.name_property, mstbedtype.name_bedtype, mstbuilding.name_building, mstwing.name_wing  FROM propertyroomtype 
        LEFT JOIN mstroomtype ON mstroomtype.code_roomtype = propertyroomtype.code_roomtype
        LEFT JOIN property ON property.code_property = propertyroomtype.code_property
        LEFT JOIN mstbedtype ON mstbedtype.code_bedtype = propertyroomtype.code_bedtype
        LEFT JOIN mstbuilding ON mstbuilding.code_building = propertyroomtype.code_building
        LEFT JOIN mstwing ON mstwing.code_wing = propertyroomtype.code_wing WHERE propertyroomtype.id_proproomtype = ${req}`;
            ds.connector.query(getData, function (err, propertyroomtypes) {

                if (err) console.error(err);

                cb(err, propertyroomtypes);

            });
        },
            5000);
    };

    PropRoomType.remoteMethod(
        'getPropRoomTypeByID',
        {
            http: { path: '/getPropRoomTypeByID/:id', verb: 'get' },
            description: 'Get Property RoomType By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['propertyroomtype'], root: true }
        }
    );
    //GET

    //DELETE
    PropRoomType.deletePropRoomTypeByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var DeleteData = `DELETE FROM propertyroomtype WHERE id_proproomtype = ${req}`;
            ds.connector.query(DeleteData, function (err, propertyroomtypes) {

                if (err) console.error(err);

                cb(err, propertyroomtypes);

            });
        },
            5000);
    };

    PropRoomType.remoteMethod(
        'deletePropRoomTypeByID',
        {
            http: { path: '/deletePropRoomTypeByID/:id', verb: 'delete' },
            description: 'Delete Brand By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['propertyroomtype'], root: true }
        }
    );
    //DELETE

};

