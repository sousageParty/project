var q = require('q');

function ORM(db) {

    var db = db;

    this.list = function (table, fields, params, separator) {
        var deffered = q.defer();
        var query = "SELECT " +
            ((fields && fields.length) ? fields.join(',') : '*') +
            " FROM " + table;
        if (params instanceof Object) {
            query += " WHERE ";
            var arr = [];
            var values = [];
            for (var key in params) {
                arr.push(key + '=? ');
                values.push(params[key]);
            }
            query += arr.join((separator) ? ' ' + separator + ' ' : ' AND ');
        }
        db.all(query, values, function (err, rows) {
            if (!err && rows && rows.length != 0) {
                deffered.resolve(rows);
            } else {
                deffered.resolve(null);
            }
        });
        return deffered.promise;
    };

    this.detail = function (table, fields, params, separator) {
    /*     db.get(query, values, function (err, rows) {
            if (!err && rows && rows.length != 0) {
                deffered.resolve(rows);
            } else {
                deffered.resolve(null);
            }
        });
        return deffered.promise; */
    };

    this.add = function (table, fields) {
        if (fields instanceof Object) {
            var arr = []
            var values = [];
            var params = [];
            for (var key in fields) {
                params.push(key);
                arr.push('?');
                values.push(fields[key]);
            }
            var query = "insert into " + table +
                "(" + params.join(',') + ") " +
                "values (" + arr.join() + ")";
            db.run(query, values);
        }
    }

    this.update = function (table, column, fields, separator) {
        var query = "UPDATE " + table + " SET "
        if (column instanceof Object) {
            var arr = []
            var values = [];
            var params = [];
            for (var key in column) {
                params.push(key);
                arr.push(key + '=? ');
                values.push(column[key]);
            }
            query += arr.join();
        }
        if (fields instanceof Object) {
            query += " WHERE ";
            arr = [];
            params = [];
            for (var key in fields) {
                params.push(key);
                arr.push(key + '=? ');
                values.push(fields[key]);
            }
            query += arr.join((separator) ? ' ' + separator + ' ' : ' AND ');
        }
        db.run(query, values);
    };

    this.delete = function (table, params, separator) {
        var deffered = q.defer();
        var query = "delete" +
            " FROM " + table;
        if (params instanceof Object) {
            query += " WHERE ";
            var arr = [];
            var values = [];
            for (var key in params) {
                arr.push(key + '=?');
                values.push(params[key]);
            }
            query += arr.join((separator) ? ' ' + separator + ' ' : ' or ');
        }
        db.run(query, values);
    };
}

module.exports = ORM;