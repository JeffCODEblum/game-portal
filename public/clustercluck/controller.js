document.addEventListener('keydown', function(e) {
	e.preventDefault();
	e.stopPropagation(); 
	
	if (e.keyCode == 69) {
		ctrl.drop = true;
	}
	if (e.keyCode == 65) {
		ctrl.left = true;
	}
	if (e.keyCode == 68) {
		ctrl.right = true;
	}
	if (e.keyCode == 87) {
		ctrl.up = true;
	}
	if (e.keyCode == 83) {
		ctrl.down = true;
	}
});

document.addEventListener('keyup', function(e) {
	e.preventDefault();
	e.stopPropagation(); 
	
	if (e.keyCode == 69) {
		ctrl.drop = false;
	}
	if (e.keyCode == 65) {
		ctrl.left = false;
	}
	if (e.keyCode == 68) {
		ctrl.right = false;
	}
	if (e.keyCode == 87) {
		ctrl.up = false;
	}
	if (e.keyCode == 83) {
		ctrl.down = false;
	}
});

var canvas = document.getElementById('canvas');
canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('mousedown', onMouseDown, false);

function onMouseDown(event) {
	event.preventDefault(); 
	event.stopPropagation(); 
	event.target.style.cursor = 'default';
	if (mode == 0) {
		mode = 1;
	}
	else if (mode == 2 || mode == 3) {
		var rect = canvas.getBoundingClientRect();
		touchX = (event.pageX - rect.left)/4;
		touchY = (event.pageY - rect.top)/4;
		player.click(touchX, touchY);
	}
	
}

function onMouseMove(event) {
	window.focus(); 
	event.preventDefault(); 
	event.stopPropagation(); 
	event.target.style.cursor = 'default';
	var rect = canvas.getBoundingClientRect();
	touchX = (event.pageX - rect.left)/4;
	touchY = (event.pageY - rect.top)/4;
	ctrl.pageX = touchX;
	ctrl.pageY = touchY;
}