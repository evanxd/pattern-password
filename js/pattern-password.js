'use strict';

const USER_PASSWORD = '6304258';
const CLICK_SOUND = 'data:audio/x-wav;base64,' +
  'UklGRiADAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YfwCAAAW/Fzsqe9O' +
  'AONWB0Pt3Mf1hsS38mJcc0mq9mzpwsIwsChOBxay/ikHV6Tr8ioJNQa0ErvFzbXrw97j' +
  '5C2LQII7aBg77Tr+I+wH0QWp/7xowHegIf0yD1UkhzRRIbUGoeOgJptCHVB+WZg5ehgs' +
  'EcofKwKaAb7+cuzd9doICAx0FZEm+gEq+z//D/yJDtEJx/O73MHkifPK/BoLXwwuBt3p' +
  '5eBq2h3YT/OR+MH/5xDGB7sHowyp9rrrL++06mnt/PpcALcI7RDSCz4GwwWaAXYNVhLw' +
  'D20VYQsvCWUPxApJCVUH3P0jA54EIP0RBUYHVgtlD68KtQWI/9MB4f8Q/Fr4UvLz7nPq' +
  'yOzV9AvzKfEB7azl/+ee6jbrSOw16mjpPepD7d3yT/hL/RIDBAXQAHcDIAZ1BVsPIhAZ' +
  'CT4Ntwc2CJsQnhV+GlYcJR67GF0WaRK5CewGSQdSBboCfgWGBaQACP0e+8f3O/Y4+Yn1' +
  '4e8l9Mf3lvns/eT75fbx9t359/lw+6L+XP+5AdsFSgZECK8LvQlVCWYJ1wetBD8AGALl' +
  'AJUAVAbPBEkDpALfADn/Cv4c/+7+OP/jAAb/7vie+Xr7GvYa9g30rPBc9OL1wveo+3D+' +
  '8/xG+Zn5tPsi/vX/xv4I/Oj5DPaL8mbxmfMM+80AXQbiCisNvhC8Dt4LGwwyDJkNlAxR' +
  'CWYGswcHCn0KyA5cDsQKYgrZB+cFlATlAh4A3P5kAOsAOwLbA+ED8gLAAM/+h/vq+Lb5' +
  'qPgY+GH5i/nE+SX6V/s9+gv69vl89nv33fhc+Zb6nvse/lEA4wMjBrQEugPc/4/8pvux' +
  '+//9Kf9tAGcBXAFxAtgCuwMeBFQE6AQdA4gCGAJiADsAuwC7/53+a/4J/tv88fte+R74' +
  'dPhd+HD5LPmf+If5VPsp/noASALRAbsB+wJ+Ak0CuQPiBAsFpwYTB5wFtgZ/DE4P8AuH' +
  'B4kD3QKPBcAHhgaHBDAEngO6BBcFbwJ2/qD7rPtG/voBwQGU/pn9Lv3T/g==';

window.onload = function(){
  var patternPassword = new PatternPassword();
  patternPassword.init();
};

var PatternPassword = function() {
  var patternCanvas = document.getElementById("patternPassword");
  var patternRender = new PatternRender();
  var pointPosition = [
    	{ x: 60, y: 40  }, { x: 180, y: 40 }, { x: 300, y: 40 },
    	{ x: 60, y: 160 }, { x: 180, y: 160 }, { x: 300, y: 160 },
    	{ x: 60, y: 280 }, { x: 180, y: 280 }, { x: 300, y: 280 }
  ]
  var checkPassword = function(pointArray) {
  	var password = '';
  	var i = 0;
  	var result = false;
  	
  	for(i = 0; i < pointArray.length; i++) {
  	  password += pointArray[i].getIndex().toString();
  	}
  	
  	if(USER_PASSWORD === password) {
  		result = true; 
  	}
  	
  	return result;
  }
  var touchEvent = {
    ongoingTouches: [],
  	
    handleStart: function(evt) {
      evt.preventDefault();
    },
    
    handleMove: function(evt) {
      evt.preventDefault();
      var ctx = patternCanvas.getContext("2d");
      var touches = evt.changedTouches;
      var selectedPointStack = patternRender.getSelectedPoint();
      var lastSelectedPoint;
      var touchX = touches[0].pageX;
      var touchY = touches[0].pageY;
      var i = 0;
      
      for(i = 0; i < pointPosition.length; i++) {
      	if(Math.pow(pointPosition[i].x - touchX, 2) + Math.pow(pointPosition[i].y - touchY, 2) < 400) {
          if(patternRender.getPoints()[i].isSelected() === false) {
            patternRender.addSelectedPoint(patternRender.getPoints()[i]);
            patternRender.getPoints()[i].setSelected(true);
            new Audio(CLICK_SOUND).play();
          }           
      	}
      }
      
      if(selectedPointStack.length !== 0) {
        ctx.clearRect(0, 0, patternCanvas.width, patternCanvas.height); //clear canvas     
     
        ctx.lineWidth = 4;
        ctx.beginPath();
      	lastSelectedPoint = selectedPointStack[selectedPointStack.length-1];
      	ctx.moveTo(lastSelectedPoint.getPosition().x, lastSelectedPoint.getPosition().y);
        ctx.lineTo(touchX, touchY);
        ctx.closePath();
        ctx.stroke();

        patternRender.render(patternCanvas);
      }
    },
  
    handleEnd: function(evt) {
      evt.preventDefault();
      var ctx = patternCanvas.getContext('2d');
      var audio = new Audio();
      
      if(patternRender.getSelectedPoint().length !== 0) {
        if(checkPassword(patternRender.getSelectedPoint())) {
        	  document.getElementById('checkResult').innerHTML = 'Let\'s go!';
          audio.src = "audio/mario02.wav";
          audio.play();
        } else {
      	  document.getElementById('checkResult').innerHTML = 'Woah oah...';
          audio.src = "audio/mario06.wav";
          audio.play();
        }      	
      }
     
      patternRender.removeAllSelectedPoint();
      
      ctx.clearRect(0, 0, patternCanvas.width, patternCanvas.height); //clear canvas
      patternRender.render(patternCanvas);
    }, 
   
    handleCancel: function(evt) {
      evt.preventDefault();
    }
  };	
  
  this.init = function() {
  	var i = 0;
    
    for(i=0; i<pointPosition.length; i++) {
    	  patternRender.addPoint(new PatternPoint(pointPosition[i], i));
    }
    patternRender.render(patternCanvas); 
    
    patternCanvas.addEventListener("touchstart", touchEvent.handleStart, false);
    patternCanvas.addEventListener("touchend", touchEvent.handleEnd, false);
    patternCanvas.addEventListener("touchcancel", touchEvent.handleCancel, false);
    patternCanvas.addEventListener("touchleave", touchEvent.handleEnd, false);
    patternCanvas.addEventListener("touchmove", touchEvent.handleMove, false);    
  }  
};
