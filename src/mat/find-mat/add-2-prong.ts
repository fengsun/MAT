
declare var _debug_: MatDebug;

import { MatDebug } from '../../debug/debug';

import LlRbTree from 'flo-ll-rb-tree';

import { Loop         } from '../../loop';
import { CpNode       } from '../../cp-node';
import { Circle       } from '../../circle';
import { ContactPoint } from '../../contact-point';
import { PointOnShape } from '../../point-on-shape';

import { isAnotherCpCloseby } from '../is-another-cp-closeby';
import { getNeighbouringPoints } from '../get-neighboring-cps';
import { TwoProngForDebugging } from '../../debug/two-prong-for-debugging';


/**
 * Adds a 2-prong contact circle to the shape.
 * @param cpGraphs
 * @param circle Circle containing the 2 contact points
 * @param posSource The source point on shape
 * @param posAntipode The found antipodal point on shape
 * @param holeClosing True if this is a hole-closing 2-prong, false otherwise
 * @param extreme The maximum coordinate value used to calculate floating point
 * tolerances.
 */
function add2Prong(
		cpGraphs      : Map<Loop,LlRbTree<CpNode>>,
        circle        : Circle, 
        posSource     : PointOnShape, 
		//posAntipode   : PointOnShape, 
		posAntipodes     : { pos: PointOnShape, d: number }[],
		holeClosing   : boolean,
		extreme       : number) {

	let orderSource   = PointOnShape.calcOrder(circle, posSource);
	let orderAntipodes = posAntipodes.map(
		posAntipode => PointOnShape.calcOrder(circle, posAntipode.pos)
	);

	let t_s = posSource.t;
	let curve;
	if (t_s === 0) {
		t_s = 1;
		curve = posSource.curve.prev;
		posSource = new PointOnShape(curve, t_s);
	}


	// Make sure there isn't already a ContactPoint close by - it can cause
	// floating point stability issues.
	// TODO - possibly combine n-prongs in this case

	let isCloseByAntipodes = false;
	for (let i=0; i<posAntipodes.length; i++) {
		let posAntipode = posAntipodes[i];
		let orderAntipode = orderAntipodes[i];

		if (isAnotherCpCloseby(cpGraphs, posAntipode.pos, circle, orderAntipode, 0, extreme, 'red')) {
			isCloseByAntipodes = true;
			break;
		}
	}
	if (isAnotherCpCloseby(cpGraphs, posSource, circle, orderSource, 0, extreme, 'red') ||
		isCloseByAntipodes) {

		if (typeof _debug_ !== 'undefined') {
			if (holeClosing) {
				_debug_.generated.elems['twoProng_holeClosing'].pop();
			} else {
				_debug_.generated.elems['twoProng_regular'].pop();
			}
		}
		return;
	}

	// Antipode
	let newCpAntipodes: CpNode[] = [];
	let cpAntipodes: ContactPoint[] = [];
	let cpTreeAntipodes: LlRbTree<CpNode>[] = [];
	let deltaAntipodes: CpNode[][] = [];
	let loopAntipodes: Loop[] = [];
	for (let i=0; i<posAntipodes.length; i++) {
		let posAntipode = posAntipodes[i];
		let orderAntipode = orderAntipodes[i];

		let cpAntipode = new ContactPoint(posAntipode.pos, circle, orderAntipode, 0);
		cpAntipodes.push(cpAntipode);
		let loopAntipode = posAntipode.pos.curve.loop;
		loopAntipodes.push(loopAntipode);
		let cpTreeAntipode = cpGraphs.get(loopAntipode);
		cpTreeAntipodes.push(cpTreeAntipode);
		let deltaAntipode = getNeighbouringPoints(
			cpTreeAntipode, posAntipode.pos, orderAntipode, 0
		);	
		deltaAntipodes.push(deltaAntipode);

		newCpAntipodes.push(CpNode.insert(
			holeClosing,
			false,
			cpTreeAntipode,
			cpAntipode, 
			deltaAntipode[0]
		));
	}
	
	
	//console.log(cpAntipode.pointOnShape.t);

	// Source
	let cpSource = new ContactPoint(posSource, circle, orderSource, 0);
	let loopSource = posSource.curve.loop;
	let cpTreeSource = cpGraphs.get(loopSource);
	let deltaSource = getNeighbouringPoints(
		cpTreeSource, posSource, orderSource, 0
	);
	let newCpSource = CpNode.insert(
		holeClosing,
		false,
		cpTreeSource,
		cpSource, 
		deltaSource[0]
	);
	//console.log(cpSource.pointOnShape.t);


	// Connect graph
	if (newCpAntipodes.length === 1) {
		newCpSource.prevOnCircle = newCpAntipodes[0];
		newCpSource.nextOnCircle = newCpAntipodes[0];
	
		newCpAntipodes[0].prevOnCircle = newCpSource;
		newCpAntipodes[0].nextOnCircle = newCpSource;
	} else {
		let cpNodes = newCpAntipodes.slice();
		cpNodes.push(newCpSource);

		cpNodes.sort(CpNode.comparator);

		for (let i=0; i<cpNodes.length; i++) {
			let iNext = (i+1 === cpNodes.length) ? 0 : i+1;
			let iPrev = (i === 0) ? cpNodes.length-1 : i-1;

			let cpNodeCurr = cpNodes[i];
			let cpNodeNext = cpNodes[iNext];
			let cpNodePrev = cpNodes[iPrev];

			cpNodeCurr.nextOnCircle = cpNodeNext;
			cpNodeCurr.prevOnCircle = cpNodePrev;
		}
	}
	

	if (holeClosing) { 
		// TODO - important - take care of case where there are more than 1 antipode
		// Duplicate ContactPoints
		let cpB2 = new ContactPoint(posAntipodes[0].pos, circle, cpAntipodes[0].order, +1);
		let newCpB2Node = CpNode.insert(true, false, cpTreeAntipodes[0], cpB2, newCpAntipodes[0]);
		
		let cpB1 = new ContactPoint(posSource, circle, cpSource.order, -1);
		let newCpB1Node = CpNode.insert(true, false, cpTreeSource, cpB1, newCpSource.prev);
		
		// Connect graph
		newCpB1Node.prevOnCircle = newCpB2Node;
		newCpB1Node.nextOnCircle = newCpB2Node;
		newCpB2Node.prevOnCircle = newCpB1Node;
		newCpB2Node.nextOnCircle = newCpB1Node;
		
		newCpAntipodes[0].next = newCpSource;
		newCpSource.prev = newCpAntipodes[0];
		
		newCpB1Node.next = newCpB2Node;
		newCpB2Node.prev = newCpB1Node;
	}


	if (typeof _debug_ !== 'undefined') {
		let elems: TwoProngForDebugging[];
		if (holeClosing) {
			elems = _debug_.generated.elems['twoProng_holeClosing'];
		} else {
			elems = _debug_.generated.elems['twoProng_regular'];
		}

		let elem = elems[elems.length-1];

		if (!newCpSource) { console.log('asas')}
		elem.cpNode = newCpSource;
	}

	return newCpSource;
}


export { add2Prong };
