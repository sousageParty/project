function Trigger(options){
    options = (options instanceof Object) ? options:{};
    var EVENTS = {};

    this.subscribe =function(name, _func){
        if (name && _func instanceof Function){
            EVENTS[name] = _func;
        }
    };
    this.call =function(name, data){
        if (EVENTS[name] && EVENTS[name] instanceof Function){
            return EVENTS[name](data);
        }
    };
}
module.exports = Trigger;