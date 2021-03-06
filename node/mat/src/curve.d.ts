import { Loop } from './loop';
import { Corner } from './corner';
/**
 * Represents a bezier curve on the shape boundary / loop.
 */
declare class Curve {
    readonly loop: Loop;
    readonly ps: number[][];
    prev: Curve;
    next: Curve;
    readonly idx: number;
    /**
     * Primarily for internal use.
     * @param loop The closed loop of bezier curves representing the shape
     * boundary this curve belongs to.
     * @param ps The bezier control points.
     * @param prev The previous curve (when going in a negative direction around
     * the shape boundary, i.e. clockwise for the outer shape and anti-clockwise
     * for the holes (if any)).
     * @param next The next curve (when going in a positive direction around
     * the shape boundary, i.e. anti-clockwise for the outer shape and clockwise
     * for the holes (if any)).
     * @param idx The curve's ordered index in the loop. This imposes a cycling
     * ordering of the curves in the loop.
     */
    constructor(loop: Loop, ps: number[][], prev: Curve, next: Curve, idx: number);
    /**
     * Returns information about the corner created at the end of this curve
     * (at t === 1) and the start of the next curve (at t === 0).
     * @param curve The relevant [[Curve]].
     */
    static getCornerAtEnd(curve: Curve): Corner;
}
export { Curve };
