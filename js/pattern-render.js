'use strict';

var PatternRender = function() {
  var pointStack = [];
  var selectedPointStack = [];
  
  this.addPoint = function(point) {
  	pointStack.push(point);
  };
  
  this.getPoints = function() {
  	return pointStack;
  }
  
  this.addSelectedPoint = function(point) {
  	selectedPointStack.push(point);
  }
  
  this.getSelectedPoint = function() {
  	return selectedPointStack;
  }
  
  this.removeAllSelectedPoint = function() {
  	var i = 0;
  	
  	for(i = 0; i < selectedPointStack.length; i++) {
  	  selectedPointStack[i].setSelected(false);
  	}
  	selectedPointStack = [];
  }  
  
  this.render = function(canvas) {
  	var ctx = canvas.getContext("2d");
  	var i = 0;
  	
  	// draw points
  	for(i=0; i<pointStack.length; i++) {
  		pointStack[i].render(canvas);
  	}
  	
  	// draw lines between point to point
  	for(i=1; i<selectedPointStack.length; i++) {
  		ctx.lineWidth = 4; 
  		ctx.moveTo(selectedPointStack[i-1].getPosition().x, selectedPointStack[i-1].getPosition().y);
        ctx.lineTo(selectedPointStack[i].getPosition().x, selectedPointStack[i].getPosition().y);
        ctx.stroke();
  	}
  };
};
