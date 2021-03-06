
import { CpNode } from '../cp-node';

import { traverseEdges } from '../traverse-edges';


function getEdgesAsArray(cpNode: CpNode) {	
	let cpNodes: CpNode[] = [];
	
	traverseEdges(
		cpNode, 
		function(cpNode) { cpNodes.push(cpNode) }
	);
	
	return cpNodes;
}


export { getEdgesAsArray };
