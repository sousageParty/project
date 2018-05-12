//var G = 6.673 * 1000;
//var G = 6.673 * 0.000000000001;
var G = 6.673 * 0.00000001;
var eps = 0.00001;

function calc(sun, planet, t) {

    var x = 0;
    var y = 0;

    var iteration = 0;
    var eccentricity = 0;
    var meanAnomaly = 0;
    var eccentricAnomaly = 0;
    var mu = 0;
    var oldEccAnomaly = 0;

    var a = planet.a;
    var b = planet.b;
    var massSun = sun.mass;

    mu = G * massSun;
    eccentricity = Math.sqrt(1 - ((b * b) / (a * a)));
    meanAnomaly = t * Math.sqrt(mu / Math.pow(a, 3));
    eccentricAnomaly = meanAnomaly;

    while ((iteration < 10000)) {
        iteration++;
        eccentricAnomaly = eccentricity * Math.sin(eccentricAnomaly) + meanAnomaly;
        if ((Math.abs(oldEccAnomaly - eccentricAnomaly) <= eps)) {
            break;
        }
        oldEccAnomaly = eccentricAnomaly;
    }

    x = Math.cos(eccentricAnomaly) * a;
    //y = Math.sqrt((1 - ((Math.pow(x, 2)) / (Math.pow(a, 2)))) * (Math.pow(b , 2)));
    y = a * Math.sqrt(1 - Math.pow(eccentricity, 2)) * Math.sin(eccentricAnomaly);

    return { x: x, y: y };
}

module.exports = calc;