'use strict';

var PatternPoint = function(pos, i) {
  var position = { x: 0, y: 0 };
  var selected = false;
  var index = -1;
  
  if(pos !== null) {
  	position.x = pos.x;
  	position.y = pos.y;
  }
  
  if(i !== null) {
  	index = i;
  }

  this.setIndex = function(i) {
  	index = i;
  }
  
  this.getIndex = function() {
  	return index;
  }

  this.setPosition = function(pos) {
  	position.x = pos.x;
  	position.y = pos.y;
  };
  
  this.getPosition = function() {
  	return position;
  };

  this.setSelected = function(isSelected) {
  	selected = isSelected;
  }  
  
  this.isSelected = function() {
  	return selected;
  }
  
  this.render = function(canvas) {
  	if(!selected) {
  	  var ctx = canvas.getContext("2d");
  	  
  	  ctx.lineWidth = 4; 
      ctx.fillStyle = '#FFA500';
      ctx.strokeStyle = '#FFA500';
  	  ctx.beginPath();
      ctx.arc(position.x, position.y, 10, 0, 2*Math.PI);
      ctx.stroke();
  	} else {
  	  var ctx = canvas.getContext("2d");
  	  
  	  ctx.lineWidth = 10;
  	  ctx.beginPath();
      ctx.arc(position.x, position.y, 10, 0, 2*Math.PI);
      ctx.stroke();  		
  	}
  }
};
