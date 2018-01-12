'use strict';

module.exports = function (MstBuilding) {

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
    MstBuilding.remoteMethod(
        'postMstBuilding',
        {
            http: { path: '/postMstBuilding', verb: 'post' },
            description: 'Insert MstBuilding',
            accepts: { arg: 'data', type: 'object', http: { source: 'req' } },
            returns: { arg: 'data', type: ['mstbuilding'], root: true }
        }
    );

    MstBuilding.postMstBuilding = function (req, cb) {
        console.log(req.body);
        setTimeout(() => {
            var InsertData = `Insert into mstbuilding(code_property, code_building, name_building, desc_building, code_wing, createdate, createby, updatedate, updateby) 
        VALUES ('${req.body.buildingProperty}', '${req.body.buildingCode}', '${req.body.buildingName}', '${req.body.buildingDesc}', '${req.body.buildingWing}', CURRENT_DATE, 1, null, null)`;
            ds.connector.query(InsertData, function (err, mstbuildings) {

                if (err) console.error(err);

                cb(err, mstbuildings);

            });
        },
            5000);
    };



    MstBuilding.remoteMethod(
        'postMstBuildingByID',
        {
            http: { path: '/postMstBuildingByID/:id', verb: 'post' },
            description: 'Update MstBuilding',
            accepts: [{ arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            { arg: 'data', type: 'object', http: { source: 'req' } }],
            returns: { arg: 'data', type: ['mstbuilding'], root: true }
        }
    );

    MstBuilding.postMstBuildingByID = function (req, building, cb) {
        console.log(req);
        console.log(building.body);
        setTimeout(() => {
            var UpdateData = `UPDATE mstbuilding SET code_property='${building.body.buildingProperty}', code_building='${building.body.buildingCode}', name_building='${building.body.buildingName}', desc_building='${building.body.buildingDesc}', code_wing='${building.body.buildingWing}', updatedate = CURRENT_DATE, updateby = '1' WHERE id_building = ${req}`;
            ds.connector.query(UpdateData, function (err, mstbuildings) {

                if (err) console.error(err);

                cb(err, mstbuildings);

            });
        },
            5000);
    };
    //POST


    MstBuilding.getMstBuilding = function (req, cb) {
        setTimeout(() => {
            var LoadData = `SELECT mstbuilding.* , property.name_property , mstwing.name_wing FROM public.mstbuilding 
            INNER JOIN property ON property.code_property = mstbuilding.code_property 
            INNER JOIN mstwing ON mstwing.code_wing = mstbuilding.code_wing`;
            ds.connector.query(LoadData, function (err, mstbuildings) {

                if (err) console.error(err);

                cb(err, mstbuildings);

            });
        },
            5000);

    };

    MstBuilding.remoteMethod(
        'getMstBuilding',
        {
            http: { path: '/getMstBuilding', verb: 'get' },
            description: 'Get list of Master Building',
            accepts: { arg: 'id_building', type: 'integer' },
            returns: { arg: 'data', type: ['mstbuilding'], root: true }
        }
    );

    MstBuilding.remoteMethod(
        'getMstBuildingByID',
        {
            http: { path: '/getMstBuildingByID/:id', verb: 'get' },
            description: 'Get MstBuilding By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['brand'], root: true }
        }
    );

    MstBuilding.getMstBuildingByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var getData = `SELECT mstbuilding.* , property.name_property , mstwing.name_wing FROM public.mstbuilding 
            INNER JOIN property ON property.code_property = mstbuilding.code_property 
            INNER JOIN mstwing ON mstwing.code_wing = mstbuilding.code_wing WHERE mstbuilding.id_building = ${req}`;
            ds.connector.query(getData, function (err, mstbuildings) {

                if (err) console.error(err);

                cb(err, mstbuildings);

            });
        },
            5000);
    };


    //DELETE
    MstBuilding.remoteMethod(
        'deleteMstBuildingByID',
        {
            http: { path: '/deleteMstBuildingByID/:id', verb: 'delete' },
            description: 'Delete MstBuilding By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['mstbuilding'], root: true }
        }
    );

    MstBuilding.deleteMstBuildingByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var DeleteData = `DELETE FROM mstbuilding WHERE id_building = ${req}`;
            ds.connector.query(DeleteData, function (err, mstbuildings) {

                if (err) console.error(err);

                cb(err, mstbuildings);

            });
        },
            5000);

    };
    //DELETE


}