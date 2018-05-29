const request = require('request');
const router = require('../application/router/router');

describe("my first test", () => {
    it("my first test for my method api", () => {
        request.get("http://localhost:3000/vm-21/areaSS?f=x*x&g=x*x*x", (err, res, body) => {
            body = JSON.parse(body);
            expect(body.result).toEqual(0.08333325000000047);
        });
    });
});