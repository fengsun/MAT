
import { PathState } from '../path-state';


/** 
 * H and h: (from www.w3.org) 
 * 
 * params: x
 * 
 * Draws a horizontal line from the current point (cpx, cpy) to (x, cpy). H 
 * (uppercase) indicates that absolute coordinates will follow; h (lowercase) 
 * indicates that relative coordinates will follow. Multiple x values can be 
 * provided (although usually this doesn't make sense). At the end of the 
 * command, the new current point becomes (x, cpy) for the final value of x.
 */	
function h(s: PathState) {
    let xInterval = (s.vals[0] - s.p[0]) / 3;
    let ps = [
        s.p,
        [s.p[0] + xInterval*1, s.p[1]],
        [s.p[0] + xInterval*2, s.p[1]],
        [s.p[0] + xInterval*3, s.p[1]]
    ];
    s.prev2ndCubicControlPoint = undefined;
    s.prev2ndQuadraticControlPoint = undefined;
    
    return ps;
}


export { h }
