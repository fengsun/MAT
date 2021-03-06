"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const circle_1 = require("../../../circle");
const scaleFactor = 0.3;
function threeProng(g, threeProng) {
    let draw = _debug_.fs.draw;
    let circle = circle_1.Circle.scale(threeProng.circle, 1);
    let poss = threeProng.poss;
    let $cp1 = draw.dot(g, poss[0].p, 0.1 * 1 * scaleFactor, 'blue');
    let $cp2 = draw.dot(g, poss[1].p, 0.1 * 2 * scaleFactor, 'blue');
    let $cp3 = draw.dot(g, poss[2].p, 0.1 * 3 * scaleFactor, 'blue');
    let $center = draw.dot(g, circle.center, 0.3 * scaleFactor, 'blue');
    let $circle = draw.circle(g, circle, 'blue thin2 nofill');
    return [...$center, ...$cp1, ...$cp2, ...$cp3, ...$circle];
}
exports.threeProng = threeProng;
//# sourceMappingURL=three-prong.js.map