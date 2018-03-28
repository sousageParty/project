var sqlite3 = require('sqlite3').verbose();
var q = require('q');
var db = new sqlite3.Database('./application/DataBase/dbMaratSpace');

var DB = {
    setUser: function (name, login, password) { // запись нового пользователя
        db.run("insert into users(name, login, password) values('" + name + "','" + login + "', '" + password + "')");
        db.close();
    },
    uniqueUser: function (login) {// проверка есть ли пользователь в базе
        var deffered= q.defer();
        db.all("select * from users where login = ?", [login],  function (err, rows) {
            if (rows && rows.length != 0) {
                deffered.resolve(rows);
            } else {
                deffered.resolve(null);
            }
        });
        return deffered.promise;
    },
    deleteUser: function (login) {// удалить пользователя из бызы 
        db.run("delete from users where login ='" + login + "'");
        db.close();
    }
}

module.exports = DB; 