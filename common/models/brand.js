'use strict';

module.exports = function (Brand) {

    var DataSource = require('loopback-datasource-juggler').DataSource;

    // var ds = new DataSource({
    //     host: "192.168.20.108",
    //     port: 5432,
    //     url: "postgres://postgres:P@ssw0rd@192.168.20.108/PMS",
    //     database: "PMS",
    //     password: "P@ssw0rd",
    //     name: "PostgresPMS",
    //     user: "postgres",
    //     connector: "postgresql"
    //   });

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
    Brand.remoteMethod(
        'postBrand',
        {
            http: { path: '/postBrand', verb: 'post' },
            description: 'Insert brand',
            accepts: { arg: 'data', type: 'object', http: { source: 'req' } },
            returns: { arg: 'data', type: ['brand'], root: true }
        }
    );

    Brand.postBrand = function (req, cb) {
        console.log(req.body);
        setTimeout(() => {
            var InsertData = `Insert into brand(code_brand, name_brand, active, brand_license, brand_validate, createdate, createby, updatedate, updateby) 
        VALUES ('${req.body.brandCode}', '${req.body.brandName}', '${req.body.active}', '${req.body.brandLicense}', '${req.body.brandValidate}', CURRENT_DATE, 1, null, null)`;
            ds.connector.query(InsertData, function (err, brands) {

                if (err) console.error(err);

                cb(err, brands);

            });
        },
            5000);
    };



    Brand.remoteMethod(
        'postBrandByID',
        {
            http: { path: '/postBrandByID/:id', verb: 'post' },
            description: 'Update Brand',
            accepts: [{ arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            { arg: 'data', type: 'object', http: { source: 'req' } }],
            returns: { arg: 'data', type: ['brand'], root: true }
        }
    );

    Brand.postBrandByID = function (req, prop, cb) {
        console.log(req);
        console.log(prop.body);
        setTimeout(() => {
            var UpdateData = `UPDATE brand SET code_brand='${prop.body.brandCode}', name_brand='${prop.body.brandName}', active='${prop.body.active}', brand_license='${prop.body.brandLicense}', brand_validate='${prop.body.brandValidate}', updatedate = CURRENT_DATE, updateby = '1' WHERE id_brand = ${req}`;
            ds.connector.query(UpdateData, function (err, brands) {

                if (err) console.error(err);

                cb(err, brands);

            });
        },
            5000);
    };
    //POST


    Brand.getBrand = function (req, cb) {
        setTimeout(() => {
            var LoadData = "SELECT * FROM brand ";
            ds.connector.query(LoadData, function (err, brands) {

                if (err) console.error(err);

                cb(err, brands);

            });
        },
            5000);
    };

    Brand.remoteMethod(
        'getBrand',
        {
            http: { path: '/getBrand', verb: 'get' },
            description: 'Get list of brands',
            accepts: { arg: 'id_brand', type: 'integer' },
            returns: { arg: 'data', type: ['brand'], root: true }
        }
    );


    Brand.remoteMethod(
        'getBrandByID',
        {
            http: { path: '/getBrandByID/:id', verb: 'get' },
            description: 'Get brands By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['brand'], root: true }
        }
    );

    Brand.getBrandByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var getData = `SELECT id_brand, code_brand, name_brand, active, brand_license, to_char(brand_validate, 'DD/MM/YYYY') as brand_validate , createdate, createby, updatedate, updateby FROM brand WHERE id_brand = ${req}`;
            ds.connector.query(getData, function (err, brands) {

                if (err) console.error(err);

                cb(err, brands);

            });
        },
            5000);
    };


    //DELETE
    Brand.remoteMethod(
        'deleteBrandByID',
        {
            http: { path: '/deleteBrandByID/:id', verb: 'delete' },
            description: 'Delete Brand By ID',
            accepts: { arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: 'Primary key' },
            returns: { arg: 'data', type: ['brand'], root: true }
        }
    );

    Brand.deleteBrandByID = function (req, cb) {
        console.log(req);
        setTimeout(() => {
            var DeleteData = `DELETE FROM brand WHERE id_brand = ${req}`;
            ds.connector.query(DeleteData, function (err, brands) {

                if (err) console.error(err);

                cb(err, brands);

            });
        },
            5000);

    };
    //DELETE

};

