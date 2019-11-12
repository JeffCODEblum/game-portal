function initCtrl(type) {
	if (type == "keys") {
		ctrl.type = "keys";
		document.addEventListener('keydown', function(e) {
			e.preventDefault();
			if (e.keyCode == 65) {
				ctrl.left = true;
			}
			else if (e.keyCode == 68) {
				ctrl.right = true;
			}
			else if (e.keyCode == 87) {
				ctrl.up = true;
			}
			else if (e.keyCode == 83) {
				ctrl.down = true;
			}
			else if (e.keyCode == 74) {
				ctrl.j = true;
			}
			else if (e.keyCode == 38) {
				ctrl.up2 = true;
			}
			else if (e.keyCode == 40) {
				ctrl.down2 = true;
			}
			else if (e.keyCode == 37) {
				ctrl.left2 = true;
			}
			else if (e.keyCode == 39) {
				ctrl.right2 = true;
			}
			else if (e.keyCode == 20) {
				ctrl.caps = true;
			}
			else if (e.keyCode == 16) {
				ctrl.shift = true;
			}
			else {
				console.log(e.keyCode);
			}
			
		});
		document.addEventListener('keyup', function(e) {
			e.preventDefault();
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
			if (e.keyCode == 74) {
				ctrl.j = false;
			}
			if (e.keyCode == 38) {
				ctrl.up2 = false;
			}
			if (e.keyCode == 40) {
				ctrl.down2 = false;
			}
			if (e.keyCode == 37) {
				ctrl.left2 = false;
			}
			if (e.keyCode == 39) {
				ctrl.right2 = false;
			}
			else if (e.keyCode == 16) {
				ctrl.shift = false;
			}
			if (e.keyCode == 20) {
				ctrl.caps = false;
			}
		});
	}
	
	else if (type == "touch") {
		ctrl.init("touch");
		
		document.addEventListener('touchstart', function(e) {
			e.preventDefault();
			var touch;
			for (var i = 0; i < e.changedTouches.length; i++) {
				touch = convertTouch(e.changedTouches[i]);
				ctrl.virtualController.touch(touch);
			}
		});
		
		document.addEventListener('touchmove', function(e) {
			e.preventDefault();
			var touch;
			for (var i = 0; i < e.changedTouches.length; i++) {
				touch = convertTouch(e.changedTouches[i]);
				ctrl.virtualController.moveTouch(touch);
			}
		});
		
		document.addEventListener('touchend', function(e) {
			e.preventDefault();
			var touch;
			for (var i = 0; i < e.changedTouches.length; i++) {
				touch = convertTouch(e.changedTouches[i]);
				ctrl.virtualController.endTouch(touch);
			}
		});
	}
	
	else if (type == "pad") {
		
	}
}

function convertTouch(touch) {
	var canvas = document.getElementById("canvas");
	var rect = canvas.getBoundingClientRect();
	var x = touch.pageX - rect.left;
	var y = touch.pageY - rect.top;
	var xConversionRatio = canvas.width / parseInt(canvas.style.width);
	var yConversionRatio = canvas.height / parseInt(canvas.style.height);
	x = x * xConversionRatio;
	y = y * yConversionRatio;
	return ({
		id: touch.identifier,
		x: x,
		y: y
	});
}

function Controller() {
	this.up = false;
	this.down = false;
	this.left = false;
	this.right = false;
	this.j = false;
	
	this.up2 = false;
	this.down2 = false;
	this.left2 = false;
	this.right2 = false;
	
	this.type = "";
	this.virtualController;
	this.touches = [];
	
	this.init = function(type) {
		this.type = type;
		if (type == "touch") {
			this.virtualController = new VirtualController();
		}
	}
	
	this.update = function () {
		if (this.type == "touch") {
			this.virtualController.update();
			var values = this.virtualController.getValues();
			this.up = values.up;
			this.down = values.down;
			this.left = values.left;
			this.right = values.right;
			this.j = values.j;
		}
	}
}

function VirtualController() {
	this.touches = [];
	this.stick = new Stick();
	this.button = new Button();
	this.button.x = CANVAS_W - CANVAS_W/7;
	this.button.y = CANVAS_H - CANVAS_H/7;
	
	this.touch = function(touch) {
		this.touches.push(touch);
		this.button.touch(this.touches);
		this.stick.touch(this.touches);
	}
	
	this.moveTouch = function(touch) {
		var existingTouch = this.getTouch(touch.id);
		if (existingTouch != false) {
			existingTouch.x = touch.x;
			existingTouch.y = touch.y;
		}
		this.button.touch(this.touches);
		this.stick.touch(this.touches);
	}
	
	this.endTouch = function(touch) {
		var existingTouch = this.getTouch(touch.id);
		if (existingTouch != false) {
			this.touches.splice(this.touches.indexOf(existingTouch), 1);
		}
		this.button.touch(this.touches);
		this.stick.touch(this.touches);
	}
	
	this.update = function() {
		//this.stick.update();
		
		//this.button.touch(this.touches);
		this.stick.update();
	}
	
	this.getTouch = function(id) {
		for (var i = 0; i < this.touches.length; i++) {
			if (id == this.touches[i].id) return (this.touches[i]);
		}
		return false;
	}
	
	this.getValues = function() {
		var values = {
			up: false,
			down: false,
			left: false,
			right: false,
			j: false
		};
		if (this.stick.x > this.stick.centerX + 5) {
			values.right = true;
		}
		if (this.stick.x < this.stick.centerX - 5) {
			values.left = true;
		}
		if (this.stick.y < this.stick.centerY - 5) {
			values.up = true;
		}
		if (this.stick.y > this.stick.centerY + 5) {
			values.down = true;
		}
		if (this.stick.x == this.stick.centerX) {
			values.right = false;
			values.left = false;
		}
		if (this.stick.y == this.stick.centerY) {
			values.up = false;
			values.down = false;
		}
		return (values);
	}
	
	this.draw = function(canvas) {
		this.stick.draw(canvas);
		this.button.draw(canvas);
	}
}

function Stick() {
	this.centerX = CANVAS_W/7;
	this.centerY = CANVAS_H - CANVAS_H/5;
	this.x = CANVAS_W/7;
	this.y = CANVAS_H - CANVAS_H/5;
	this.outerRadius = 20;
	this.innerRadius = 7;
	this.touched = false;
	this.held = false;
	this.myTouchId = -1;
	
	this.touch = function(touches) {
		this.held = false;
		this.touched = false;
		for (var i = 0; i < touches.length; i++) {
			var touch = touches[i];
			var dx = Math.abs(this.centerX - touch.x);
			var dy = Math.abs(this.centerY - touch.y);
			var dist = Math.sqrt(dx*dx + dy*dy);
			
			if (dist < 16) {
				this.touched = true;
				this.move(touch.x, touch.y);
				this.myTouchId = touch.id;
			}
			else {
				this.touched = false;
				if (touch.id == this.myTouchId) {
					this.held = true;
				}
			}
		}
	}
	
	this.move = function(x, y) {
		this.x = x;
		this.y = y;
	}
	
	this.update = function() {
		if (!this.touched && !this.held) {
			this.x = this.centerX;
			this.y = this.centerY;
		}
	}
	
	this.draw = function(canvas) {
		var context = canvas.getContext('2d');
		context.strokeStyle = "rgba(128, 128, 128, 1)";
		context.beginPath();
		context.arc(this.centerX, this.centerY, this.outerRadius, 0, 2 * Math.PI);
		context.stroke();
		
		context.beginPath();
		context.arc(this.x, this.y, this.innerRadius, 0, 2*Math.PI);
		context.stroke();
		if (this.touched) {
			context.fillStyle = "rgba(128, 128, 128, 0.5)";
			context.fill();
		}
	}
}

function Button() {
	this.x = 0;
	this.y = 0;
	this.pressed = false;
	this.radius = 10;
	
	this.draw = function(canvas) {
		var context = canvas.getContext('2d');
		context.strokeStyle = "rgba(128, 128, 128, 1)";
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		context.stroke();
		if (this.pressed) {
			context.fillStyle = "rgba(128, 128, 128, 0.5)";
			context.fill();
		}
	}
	
	this.touch = function(touches) {
		var touch;
		this.pressed = false;
		for (var i = 0; i < touches.length; i++) {
			touch = touches[i];
			if (touch.x > this.x - this.radius && touch.x < this.x + this.radius && touch.y > this.y - this.radius && touch.y < this.y + this.radius) {
				this.pressed = true;
			}
		}
	}
}
