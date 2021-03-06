
import * as Vector from 'flo-vector2d';
import * as Bezier3 from 'flo-bezier3';

import { CpNode       } from '../cp-node';
import { PointOnShape } from '../point-on-shape';
import { Loop         } from '../loop';
import { Mat          } from '../mat';
import { X            } from '../x/x';

import { generalDebugFunctions     } from './functions/general';
import { IGeneralDebugFunctions    } from './functions/general'; 
import { twoProngDebugFunctions    } from './functions/two-prong';
import { ITwoProngDebugFunctions   } from './functions/two-prong';
import { threeProngDebugFunctions  } from './functions/three-prong';
import { IThreeProngDebugFunctions } from './functions/three-prong';
import { drawElemFunctions         } from './functions/draw-elem/draw-elem';
import { IDrawElemFunctions        } from './functions/draw-elem/draw-elem';
import { TwoProngForDebugging      } from './two-prong-for-debugging';
import { ThreeProngForDebugging    } from './three-prong-for-debugging';
import { DebugElemType             } from './debug-elem-types';
import { CpNodeForDebugging        } from './cp-node-for-debugging';
import { Circle } from '../circle';



export type GeneratedElemTypes = {
	[T in DebugElemType]: any;
}


export interface GeneratedElems extends GeneratedElemTypes {
    twoProng_regular     : TwoProngForDebugging[],
    twoProng_failed      : TwoProngForDebugging[],
    twoProng_notAdded    : TwoProngForDebugging[],
    twoProng_deleted     : TwoProngForDebugging[],
    twoProng_holeClosing : TwoProngForDebugging[],
    looseBoundingBox     : number[][][],
    tightBoundingBox     : number[][][],
    oneProng             : PointOnShape[],
    oneProngAtDullCorner : PointOnShape[],
    threeProng           : ThreeProngForDebugging[],
    sharpCorner          : PointOnShape[],
    dullCorner           : PointOnShape[],
    minY                 : PointOnShape[],
    boundingHull         : number[][][],
    mat                  : Mat[],
    sat                  : Mat[],
    cpNode               : CpNodeForDebugging[],
    loop                 : Loop[],
    loops                : Loop[][],
    maxVertex            : CpNode[],
    leaves               : CpNode[][],
    culls                : Circle[][],
    intersection         : X[],    
}


export interface ITiming {
    simplify      : number[];
    holeClosers   : number[];
    oneAnd2Prongs : number[];
    threeProngs   : number[];
    mats          : number[];
    sats          : number[];
}


export interface IGenerated {
    elems  : GeneratedElems;
    timing : ITiming;
}


export class Generated implements IGenerated {
    elems: GeneratedElems;
    timing: ITiming;

    constructor(
            public path: SVGPathElement,
            public g: SVGGElement) {

        this.elems = {
            twoProng_regular     : [],
            twoProng_failed      : [],
            twoProng_notAdded    : [],
            twoProng_deleted     : [],
            twoProng_holeClosing : [],
            looseBoundingBox     : [],
            tightBoundingBox     : [],
            oneProng             : [],
            oneProngAtDullCorner : [],
            sharpCorner          : [],
            dullCorner           : [],
            minY                 : [],
            threeProng           : [],
            boundingHull         : [],
            mat                  : [],
            sat                  : [],
            cpNode               : [],
            loop                 : [],
            loops                : [],
            maxVertex            : [],
            leaves               : [],
            culls                : [],
            intersection         : [],
        };

        this.timing = {
            simplify      : [0,0],
            holeClosers   : [0,0],
            oneAnd2Prongs : [0,0],
            threeProngs   : [0,0],
            mats          : [0,0],
            sats          : [0,0]
        }
    }
}


export interface IDebugFunctions extends IGeneralDebugFunctions {
    draw       : Bezier3.IDrawFunctions,
    twoProng   : ITwoProngDebugFunctions,
    threeProng : IThreeProngDebugFunctions,
    drawElem   : IDrawElemFunctions,
}


export interface IDirectives {
    stopAfterHoleClosers: boolean,
    stopAfterHoleClosersNum: number,
    stopAfterTwoProngs: boolean,
    stopAfterTwoProngsNum: number,
    stopAfterThreeProngs: boolean,
}


class MatDebug {
    /* The current path for which MATs are being found */
    generated: Generated = undefined;

    /* Generated by debug object for later inspection */
    generatedAll  : Map<number[][][][],Generated> = new Map();
    fs            : IDebugFunctions;
    directives    : IDirectives;


    /**
     * @param fs - some useful functions.  
     */
    constructor(draw: Bezier3.IDrawFunctions) {

        // These are included only for quick debugging from console
        (this as any).Bezier3  = Bezier3; 
        (this as any).Vector2d = Vector; 

        this.directives = {
            stopAfterHoleClosers: false,
            stopAfterHoleClosersNum: undefined,
            stopAfterTwoProngs: false,
            stopAfterTwoProngsNum: undefined,
            stopAfterThreeProngs: false,
        }
        
        /**
         * These functions are meant to be used in the console, e.g. in the 
         * console try typing d.fs.twoProng.traceConvergence(0);
         */
        this.fs = { 
            draw,
            ...generalDebugFunctions,
            twoProng   : twoProngDebugFunctions,
            threeProng : threeProngDebugFunctions, 
            drawElem   : drawElemFunctions,
        };
    }


    createNewGenerated(
            bezierLoops: number[][][][],
            path: SVGPathElement,
            g: SVGGElement) {
        
        this.generated = new Generated(path, g);
        this.generatedAll.set(bezierLoops, this.generated);
    }
}


export { MatDebug }
