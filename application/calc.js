var calc = {};

var a, b;

function findPoints (f, g) {
    var count = -100; //стартовая точка отсчёта

    if (f(count) > g(count)) {//если f выше g

        while (count < 100) {
            if (f(count) <= g(count)) {//если поменялись
                a = count;
                while (count < 100) {
                    count++;
                    if (f(count) >= g(count)) {//если сснова поменялись
                        b = count;
                        break;
                    }
                }
                break;
            }
            count++;
        }
    } else { //если f ниже g
        while (count < 100) {
            if (f(count) >= g(count)) {//поменялись
                a = count;
                while (count < 100) {
                    count++;
                    if (f(count) <= g(count)) {//снова поменялись
                        b = count;
                        break;
                    }
                }
                break;
            }
            count++;
        }
    }
    return (!isNaN(a) && !isNaN(b)) ? { a: a, b: b } : 'эти функции имеют <2 точек пересечения на отрезке [-100, 100]';
}

function rectCalc(F, G) {
    if (a > b) {
        var c = a;
        a = b;
        b = c;
    }
    var dx = (b - a) / 1000;
    var s1 = 0;
    var s2 = 0;
    var x = a;
    while (x < b) {
        s1 += F(x) * dx;
        s2 += G(x) * dx;
        x += dx;
    }
    return Math.abs(s2 - s1);
}

function squares(F, G, method) {
    var points = findPoints(F, G);
    if (points instanceof Object) {
        a = points.a;
        b = points.b;
    } else {
        return points;
    }
    switch (method) {
        //case 'points' : return pointsCalc(F, G); break;
        case 'rects'  : return rectCalc(F, G); break;
        //case 'trapeze': return trapezeCalc(F, G); break;
        default: return pointsCalc(F, G); break;
    }

}

calc.squares = squares;


module.exports =  calc;
