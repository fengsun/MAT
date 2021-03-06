import { ElemType_TwoProng } from '../../mat/elem-type-two-prong';
interface ITwoProngDebugFunctions {
    logδ: (n: number, type?: ElemType_TwoProng) => void;
    log: (n: number, type?: ElemType_TwoProng) => void;
    drawNormal: (n: number, showDelay?: number) => void;
    logδBasic: (n: number) => void;
    logNearest: (p: number[], showDelay?: number) => void;
    traceConvergence: (n: number, finalOnly?: boolean, showDelay?: number, range?: number[], type?: ElemType_TwoProng) => void;
}
declare let twoProngDebugFunctions: ITwoProngDebugFunctions;
export { ITwoProngDebugFunctions, twoProngDebugFunctions };
