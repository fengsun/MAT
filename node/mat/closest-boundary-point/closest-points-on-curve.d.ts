import { Curve } from "../../curve";
/**
 *
 * @param curve The bezier
 * @param p The point from which to check
 * @param tRange The allowed t range
 * @param touchedCurve The bezier on which p is located
 * @param t The t value of the bezier that locates p
 */
declare function closestPointsOnCurve(curve: Curve, p: number[], tRange: number[], touchedCurve: Curve, t: number, distance: number, distanceTolerance: number): {
    p: number[];
    t: number;
}[];
export { closestPointsOnCurve };
