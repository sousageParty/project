function Game() {

    var count = 0;
    var gamers = {};

    this.fire = function(id) {
        count++;
        return gamers[id] + ' shooted! Count = ' + count;
    };

    this.join  = function (gamer) {
        if (gamer) {
            gamers[gamer.id] = gamer.name;
        }
    };
    this.leave = function (gamer) {
        if (gamer) {
            delete gamers[gamer.id];
        }
    };
}

module.exports = Game;