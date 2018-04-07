var q = require('q');

function ORM(_db) {

	var db;

	// get detail info by ONE record
	this.detail = function (table, params, detail, operand) {
		var deffered = q.defer();
		if (table && params) {
			var str = [];
			var arr = [];
			if (params instanceof Object) { // сложный выбор по нескольким параметрам (из объекта)
				for (var key in params) {
					str.push(key + "=?");
					arr.push(params[key]);
				}
			} else { // выбор по id
				str.push("id=?");
				arr.push(params);
			}
			db.serialize(function () {
				var query = "SELECT " + ((detail) ? detail : "*") + " FROM " + table + " WHERE " + str.join((operand) ? " " + operand + " " : " AND ");
				db.get(query, arr, function (err, row) { deffered.resolve((err) ? null : row); });
			});
		} else {
			deffered.resolve(null);
		}
		return deffered.promise;
	};

	// get LIST of records
	this.list = function (table, params, detail, operand) {
		var deffered = q.defer();
		if (table && params && params instanceof Object) { // сложный выбор по нескольким параметрам (из объекта)
			var str = [];
			var arr = [];
			for (var key in params) {
				str.push(key + "=?");
				arr.push(params[key]);
			}
			db.serialize(function () {
				var query = "SELECT " + ((detail) ? detail : "*") + " FROM " + table + ((str.length) ? " WHERE " + str.join((operand) ? " " + operand + " " : " AND ") : "");
				db.all(query, arr, function (err, row) { 
					deffered.resolve((err) ? null : row); 
				});
			});
		} else {
			deffered.resolve(null);
		}
		return deffered.promise;
	};

	// ADD records
	this.add = function (table, params, values) {
		var deffered = q.defer();
		if (table && params && values instanceof Array) {
			db.serialize(function () {
				var str = [];
				var arr = [];
				if (values[0] instanceof Array) { // данных много
					for (var i = 0; i < values.length; i++) {
						var part = [];
						for (var j = 0; j < values[i].length; j++) {
							arr.push(values[i][j]);
							part.push("?");
						}
						str.push("(" + part.join(",") + ")");
					}
				} else { // добавляем одну запись
					arr = values;
					var part = [];
					for (var i = 0; i < values.length; i++) {
						part.push("?");
					}
					str.push("(" + part.join(",") + ")");
				}
				var query = "INSERT INTO " + table + " (" + params + ") VALUES " + str.join(",");
				db.run(query, arr, function (err) { deffered.resolve(!(err)); });
			});
		} else {
			deffered.resolve(null);
		}
		return deffered.promise;
	};

	// DELETE record(s)
	this.delete = function (table, params, operand) {
		var deffered = q.defer();
		if (table && params) {
			var str = [];
			var arr = [];
			if (params instanceof Object) { // сложный выбор по нескольким параметрам (из объекта)
				for (var key in params) {
					str.push(key + "=?");
					arr.push(params[key]);
				}
			} else { // выбор по id
				str.push("id=?");
				arr.push(params);
			}
			db.serialize(function () {
				var query = "DELETE FROM " + table + " WHERE " + str.join((operand) ? " " + operand + " " : " AND ");
				db.run(query, arr, function (err) { deffered.resolve(!(err)); });
			});
		} else {
			deffered.resolve(null);
		}
		return deffered.promise;
	};

	// UPDATE record(s)
	this.update = function (table, params, values, operand) {
		var deffered = q.defer();
		if (table && values) {
			var strSet = [];
			var strWhere = [];
			var arr = [];
			for (var key in values) {
				strSet.push(key + "=?");
				arr.push(values[key]);
			}
			if (params instanceof Object) { // сложный выбор по нескольким параметрам (из объекта)
				for (var key in params) {
					strWhere.push(key + "=?");
					arr.push(params[key]);
				}
			}
			db.serialize(function () {
				var query = "UPDATE " + table + " SET " + strSet.join(",") + " WHERE " + strWhere.join((operand) ? " " + operand + " " : " AND ");
				db.run(query, arr, function (err) { deffered.resolve(!(err)); });
			});
		} else {
			deffered.resolve(null);
		}
		return deffered.promise;
	};

	function init() {
		db = _db;
	}
	init();
}

module.exports = ORM;