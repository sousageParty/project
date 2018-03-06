function Squares() {

    function calcSquareByPolygon(points, functions) {//прямоугольник
        let a = (points.a < points.b) ? points.a : points.b;
        let b = (points.a > points.b) ? points.a : points.b;
        let f = functions.f; let g = functions.g;

        let dx = (b - a) / 1000;
        let s1 = 0; let s2 = 0;

        for (let i = a; i < b; i += dx) {
            s1 += f(i) * dx;
        }
        for (let i = a; i < b; i += dx) {
            s2 += g(i) * dx;
        }

        return Math.abs(s2-s1);
    }

    function calcSquareByTrapeze(points, functions) {//трапеция
        let a = (points.a < points.b) ? points.a : points.b;
        let b = (points.a > points.b) ? points.a : points.b;
        let f = functions.f; let g = functions.g;

        let dx = (b - a) / 1000;
        let s1 = 0; let s2 = 0;

        for (let i = a; i < b; i += dx) {
            s1 += (f(i) + f(i + dx) / 2) * dx;
        }
        for (let i = a; i < b; i += dx) {
            s2 += (g(i) + g(i + dx) / 2) * dx;
        }

        return Math.abs(s2-s1);
    }

    function calcSByRandom() {
        return "Have no idea how to do it, sorry :-(";
    }

    this.calc = (points, functions, method) => {
        if (points instanceof Object && functions instanceof Object) {
            switch (method) {
                case "рандом":
                    calcSByRandom();
                    break;
                case "прямоугольник":
                    calcSquareByPolygon(points, functions);
                    break;
                case "трапеция":
                    calcSquareByTrapeze(points, functions);
                    break;
                default:
                    return "Нет такого метода";
            }
        }
        return false;
    };

}

module.exports = Squares;