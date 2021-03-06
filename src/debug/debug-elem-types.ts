
import { ElemType_TwoProng } from "../mat/elem-type-two-prong";


type DebugElemType = ElemType_TwoProng 
    | 'oneProng'  
    | 'minY'  
    | 'looseBoundingBox' 
    | 'tightBoundingBox' 
    | 'sharpCorner' 
    | 'dullCorner' 
    | 'oneProng' 
    | 'oneProngAtDullCorner' 
    | 'threeProng' 
    | 'boundingHull' 
    | 'mat' 
    | 'sat'
    | 'loop'
    | 'loops'
    | 'maxVertex'
    | 'leaves'
    | 'culls'
    | 'intersection'


export { DebugElemType }
