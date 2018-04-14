STRUCTURE = {};

function Point(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

function Planet(options) {
    this.id = options.id;
    this.sunId = options.sunId;
    this.a = options.a;
    this.b = options.b;
    this.name = options.name || 'Marat';
    this.face = options.face;
    this.mass = options.mass || 1; //tons
    this.radius = options.radius || 1; //km
    this.speed = options.speed; //km/sec
    this.position = options.position || new Point(0, 0, 0);
    this.direction = options.directoin || new Point(0, 0, 0);
}

function Rocket(options) {
    this.id = options.id;
    this.mass = options.mass || 1; //tons
    this.speed = options.speed; //km/sec
    this.position = options.position || new Point(0, 0, 0);
    this.direction = options.directoin || new Point(0, 0, 0);
}

STRUCTURE.Point = Point;
STRUCTURE.Planet = Planet;
STRUCTURE.Rocket = Rocket;


module.exports = STRUCTURE;