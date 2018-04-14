var G = 6.673 * 0.000000000001;
var eps = 0.0001;

function calc(sun, planet, t) {

    var iteration = 0;

    var a = planet.a;
    var b = planet.b;
    var massSun = sun.mass;

    var eccentricity = Math.sqrt(1 - (b * b) / (a * a));
    var mu = G * massSun;
    var meanAnomaly = t * Math.sqrt(mu / Math.pow(a, 3));
    var eccentricAnomaly = meanAnomaly;

    while ((iteration < 10000) || (eccentricAnomaly > eps)) {
        iteration++;
        eccentricAnomaly = eccentricity * Math.sin(eccentricAnomaly) + meanAnomaly;
    }

    var x = Math.cos(eccentricAnomaly) / a;
    var y = Math.sqrt((1 - (Math.pow(x, 2)) / (Math.pow(a, 2))) * (Math.pow(b , 2)));

    return { x: x * 100, y: y * 100 }
}

module.exports = calc;