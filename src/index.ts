
import { Mat          } from './mat';
import { Loop         } from './loop';
import { Curve        } from './curve';
import { CpNode       } from './cp-node';
import { PointOnShape } from './point-on-shape';
import { Circle       } from './circle';
import { ContactPoint } from './contact-point';
import { BezierPiece  } from './bezier-piece';

import { findMats        } from './find-mats';
import { trimMat 	     } from './mat/trim-mat';
import { toScaleAxis     } from './to-scale-axis';

import { traverseEdges   } from './traverse-edges';
import { traverseVertices } from './traverse-vertices';

import { MatDebug } from './debug/debug';

import { DebugElemType } from './debug/debug-elem-types';
import { IDrawElemFunctions } from './debug/functions/draw-elem/draw-elem';

import { CpNodeForDebugging } from './debug/cp-node-for-debugging';

import { ITiming } from './debug/debug';

import { getClosestBoundaryPoint } from 
	'./mat/closest-boundary-point/get-closest-boundary-point';

import { closestPointOnBezier } from
	'./mat/closest-boundary-point/closest-point-on-bezier';
import { getPathsFromStr } from './get-paths-from-str';	
import { beziersToSvgPathStr } from './beziers-to-svg-path-str';
import { getShapeBounds, getShapesBounds } from './svg/fs/get-shape-bounds';

import { getBoundaryBeziersToNext } from './get-boundary-beziers-to-next';


export { 
	// Data structures
	Mat,
	PointOnShape,
	Curve,
	Loop,
	CpNode,
	Circle,
	ContactPoint,
	BezierPiece,

	// Main functions
	findMats,
	toScaleAxis,
	trimMat,
	traverseVertices,
	traverseEdges,
	getBoundaryBeziersToNext,

	// SVG functions
	beziersToSvgPathStr,
	getPathsFromStr,
	getShapeBounds, 
	getShapesBounds,

	// Other functions
	getClosestBoundaryPoint, 
	closestPointOnBezier,

	// Debug
	MatDebug,
	DebugElemType,
	IDrawElemFunctions,
	CpNodeForDebugging,
	ITiming
}
