function Gaus2 (_koefs) {
    var koefs = _koefs;

    koefs.a1 /= koefs.a1;
    koefs.b1 /= koefs.a1;
    koefs.f1 /= koefs.a1;
    koefs.c1 /= koefs.a1;

    koefs.a1 *= -koefs.a2;
    koefs.b1 *= -koefs.a2;
    koefs.f1 *= -koefs.a2;
    koefs.c1 *= -koefs.a2;

    koefs.a2 += koefs.a1;
    koefs.b2 += koefs.b1;
    koefs.f2 += koefs.f1;
    koefs.c2 += koefs.c1;

    koefs.a1 /= koefs.a1;
    koefs.b1 /= koefs.a1;
    koefs.f1 /= koefs.a1;
    koefs.c1 /= koefs.a1;

    koefs.a1 *= -koefs.a3;
    koefs.b1 *= -koefs.a3;
    koefs.f1 *= -koefs.a3;
    koefs.c1 *= -koefs.a3;

    koefs.a3 += koefs.a1;
    koefs.b3 += koefs.b1;
    koefs.f3 += koefs.f1;
    koefs.c3 += koefs.c1;

    koefs.b2 /= koefs.b2;
    koefs.f2 /= koefs.b2;
    koefs.c2 /= koefs.b2;

    koefs.b2 *= -koefs.b3;
    koefs.f2 *= -koefs.b3;
    koefs.c2 *= -koefs.b3;

    koefs.b3 += koefs.b2;
    koefs.c3 += koefs.c2;
    koefs.f3 += koefs.f2;

    var z = koefs.c3/koefs.f3;
    var y = (koefs.c2 - (koefs.c3 * koefs.f2)/koefs.f3)/koefs.b2;
    var x = (koefs.c1 - y * koefs.b1 - z * koefs.f1)/koefs.a1;

    console.log (x,y,z);
}

module.exports = Gaus2;