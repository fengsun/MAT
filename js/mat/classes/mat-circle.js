'use strict'

let Circle = require('../../geometry/classes/circle.js');

/**
 * Medial (or Scale) Axis Transform (MAT) maximal contact circle class, 
 * i.e. a representative data point of the MAT.
 * 
 * @constructor
 * @param {Circle} circle - If null we consider it a virtual circle.
 * @param {ListNode<ContactPoint>[]} cpNodes - The contact points of this circle on the shape.
 */
let MatCircle = function(circle, cpNodes) {
	this.circle = circle;
	this.cpNodes = cpNodes;
	this.visited = 0; // TODO - does not belong inside the class
}
	
	
MatCircle.copy = function(matCircle) {
	return new MatCircle(
			matCircle.circle,
			matCircle.cpNodes
	)
}


/** 
 * MatCircle creator.
 * @param {Circle} circle 
 * @param {ListNode<ContactPoint>[]} cpNodes An array of 'orphaned' 
 *        (i.e. without belonging to a MatCircle) contact points.
 * Notes: Due to the mutual dependency between the matCircle and 
 * contactPoints fields, a normal constructor can not instantiate a
 * MatCircle in one step - hence this creator.
 */  
MatCircle.create = function(circle, cpNodes) {
	let matCircle = new MatCircle(circle, undefined);
		
	for (let i=0; i<cpNodes.length; i++) {
		cpNodes[i].item.matCircle = matCircle; 
	}
	matCircle.cpNodes = cpNodes;
	
	return matCircle;
}


module.exports = MatCircle;

	

