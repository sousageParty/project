function GameManager(options) {

    options = (options instanceof Object) ? options : {};
    var callback = options.callback || {};
    var getUserCallback = (callback.getUser instanceof Function) ? callback.getUser : function () {};
    var showPageCallback = (callback.showPage instanceof Function) ? callback.showPage : function () {};
    var socket = options.socket;
    var EVENTS = options.EVENTS;

    var color = "rgb(" + Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ")";

    var user;
    var view;

    function joinGame() {
        user = getUserCallback();
        var mass = $('.mass').html() - 0;
        var center = $('.center').html() - 0;
        var speed = $('.speed').html() - 0;
        var radius = $('.radius').html() - 0;
        if (mass && center && speed && radius) {
            socket.emit(EVENTS.USER_JOIN_GAME, { mass: mass, center: center, speed: speed, radius: radius });
        }
    }

    //Вешаем события. Генерируем события, касающиеся игры здесь!
    function eventHandler() {
        view = new View($('.watchExample'));
        var planet = { id: "planet", radius: $('.range-radius-js').val() - 0, position: { x: $('.range-center-js').val() - 0, y: 0, z: 0 }, color: color, speed: $('.range-speed-js').val() - 0  };
        /*view.createPlanet(planet);*/
        $('.ranges').on('change', function () {
            planet.position.x = $('.range-center-js').val() - 0;
            planet.radius = $('.range-radius-js').val() - 0;
            planet.speed = $('.range-speed-js').val() - 0;
            //view.updateScene([planet]);
            view.createPlanet(planet);
        });

        $('.join-game-btn-js').on('click', function () {//присоединиться к игре
            joinGame();
        });

        $('.leave-game-btn-js').on('click', function () {//выйти из игры
            socket.emit(EVENTS.USER_LEAVE_GAME);
        });

        $('.third-page-js').on('click', function () {
            var rocket = { id: "rocket" + user.id, idPlanet: user.id };
            socket.emit(EVENTS.GAME_PUSH_ROCKET, rocket);
        });


    }

    //подписываемся на все сокеты, касающиеся игры здесь!
    function socketHandler() {
        //присоединиться к игре
        socket.on(EVENTS.USER_JOIN_GAME, function(data) {
            if (data && data.planets) {
                showPageCallback('third-page-js');
                view = null;
                view = new View($('.third-page-js'));
                view.createPlanets(data.planets);
            }
        });
        //обновить сцену
        socket.on(EVENTS.GAME_UPDATE_SCENE, function (data) {
            //console.log(data);
            if (!($.isEmptyObject(data.planets)) && view) {
                view.updateScene(data);
            }
        });
        //
        socket.on(EVENTS.GAME_PUSH_ROCKET, function (rockets) {
            if (rockets) {
                console.log(rockets);
                view.createRockets(rockets);
            }
        });

    }

    function init() {
        eventHandler();
        socketHandler();
    }
    init();
}