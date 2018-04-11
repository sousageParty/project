var ST = require('./structure');

function Game(options) {

    options = (options instanceof Object) ? options : {};

    var callback = options.callback || {};
    var updateSceneCallback = (callback.updateScene instanceof Function) ? callback.updateScene : function () {};

    var interval;
    var TICK = 500; //ms
    var scene = {
        planets: {},
        rockets: {}
    };

    function updateScene() {
        updateSceneCallback(scene);
    }

    this.fire = function(id) {
        //...
    };

    this.join  = function (user, data) {
        if (user && data && data instanceof Object) {
            scene.planets[user.id] = new ST.Planet({ id: user.id, name: user.name, mass: data.mass, face: ("rgb(" + Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ")"), radius: data.radius, speed: data.speed, position: new ST.Point(data.center, 0, 0), direction: new ST.Point(1, 1, 0) });
        }
    };
    this.leave = function (user) {
        if (user) {
            delete scene.planets[user.id];
        }
    };

    this.deinit = function () {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    };

    function init() {
        interval = setInterval(updateScene, TICK);
    }
    init();
}

module.exports = Game;