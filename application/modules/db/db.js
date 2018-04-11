var sqlite3 = require('sqlite3').verbose();
var q = require('q');

var ORM = require('./ORM');

function DB() {

    var db;
    var orm;

    this.setUser = function (name, login, password) { // запись нового пользователя
        return orm.add('users', "name, login, password" , [ name, login, password ]);
    };
    this.getUser = function (login, password) {
        return orm.detail('users', { login: login, password: password });
    };

    this.uniqueUser = function (login) {// проверка есть ли пользователь в базе
        return orm.list('users', { login: login });
    };

    this.deleteUser = function (login) {// удалить пользователя из базы 
        return orm.delete('users', { login: login });
    };

    this.changeUserData =function(login, newLogin){
        return orm.update('users',{ login: login },{ login: newLogin });
    };
    this.deinit = function () {
        db.close();
    };
    
    function init() {
        db = new sqlite3.Database(__dirname + '/dbMaratSpace.db');
        orm = new ORM(db);
    }
    init();
}

module.exports = DB; 