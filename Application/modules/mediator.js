function Mediator(options) {
    options = (options instanceof Object) ? options : {};
    var EVENTS = {};

    this.subscribe = function (name, _func) {
        if (name && _func instanceof Function) {
            if (!EVENTS[name]) {
                EVENTS[name] = [];
            }
            EVENTS[name].push(_func);
        }
    };

    this.call = function (name, data) {
        if (EVENTS[name] && EVENTS[name].length) {
            for ( var i = 0; i < EVENTS[name].length; i++) {
                if (EVENTS[name][i] instanceof Function) {
                    EVENTS[name][i](data);
                }
            }
        }
    };

    function init() {
      if (options.evets instanceof Object) {
          for (var key in options.events) {
              EVENTS[options.events[key]] = [];
          }
      }
    }
    init();
}

module.exports = Mediator;