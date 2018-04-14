var ST = require('./structure');
var kepler = require('./kepler');

function Game(options) {

    options = (options instanceof Object) ? options : {};

    var callback = options.callback || {};
    var updateSceneCallback = (callback.updateScene instanceof Function) ? callback.updateScene : function () {};

    var t = 0; //time of Universe
    var interval;
    var TICK = 500; //ms
    var scene = {
        planets: {},
        rockets: {}
    };

    function updateScene() {
        t++;
        for (var key in scene.planets) {
            if (scene.planets[key]) {
                var planet = scene.planets[key];
                var sun = (planet.sunId && scene.planets[planet.sunId]) ? scene.planets[planet.sunId] : null;
                if (sun) {
                    var koord = kepler(sun, planet, t);
                    planet.position.x = koord.x;
                    planet.position.y = koord.y;
                }
            }
        }
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
        scene.planets['sun'] = new ST.Planet({ id: 'sun', mass: 10000, radius: 100, position: new ST.Point(0, 0, 0) });
        scene.planets['earth'] = new ST.Planet({ id: 'earth', mass: 1, radius: 1, position: new ST.Point(50, 0, 0), a: 5, b: 4, sunId: 'sun' });
        //interval = setInterval(updateScene, TICK);
        updateScene();
    }
    init();
}

module.exports = Game;