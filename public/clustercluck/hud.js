
function Hud() {
	this.bar = {
		x: 0,
		y: CANVAS_H - 10,
		w: CANVAS_W,
		h: 10
	};
	
	this.money = {
		digits: []
	};
	this.ammo = {
		digits: []
	};
	this.score = {
		digits: []
	}
	this.message = 0;
	this.message2 = 0;
	this.message3 = 0;
	this.time = 0;
	
	for (var i = 0; i < 3; i++) {
		this.money.digits.push(new Digit(CANVAS_W - (i+ 1) * 8 + (i + 1), CANVAS_H - 8));
		this.score.digits.push(new Digit(CANVAS_W - (i+ 1) * 8 + (i + 1), 50));
		this.score.digits[i].srcy = 170;
	}
	var newDig;
	for (var i = 0; i < 2; i++) {
		newDig = new Digit(CANVAS_W - (i+ 7) * 8 + (i + 1) + 2, CANVAS_H - 8);
		newDig.srcy = 170;
		this.ammo.digits.push(newDig);
	}
	
	this.setMessage = function(msg) {
		this.message = msg;
	}
	
	this.setMoney = function(value) {
		if (value < 10) {
			this.money.digits[0].set(value);
			this.money.digits[1].set(0);
			this.money.digits[2].set(0);
		}
		else if (value > 9 && value < 100) {
			
			this.money.digits[0].set(value - Math.floor(value / 10) * 10);
			this.money.digits[1].set(Math.floor(value / 10));
			this.money.digits[2].set(0);
		}
		else if (value > 99) {
			this.money.digits[0].set(value - Math.floor(value / 10) * 10);
			this.money.digits[1].set(Math.floor((value - Math.floor(value / 100) * 100)/10));
			this.money.digits[2].set(Math.floor(value / 100));
		}
	}
	this.setAmmo = function(value) {
		if (value < 10) {
			this.ammo.digits[0].set(value);
			this.ammo.digits[1].set(0);
		}
		else if (value > 9 && value < 100) {
			
			this.ammo.digits[0].set(value - Math.floor(value / 10) * 10);
			this.ammo.digits[1].set(Math.floor(value / 10));
		}
	}
	this.setScore = function(value) {
		if (value < 10) {
			this.score.digits[0].set(value);
			this.score.digits[1].set(0);
			this.score.digits[2].set(0);
		}
		else if (value > 9 && value < 100) {
			
			this.score.digits[0].set(value - Math.floor(value / 10) * 10);
			this.score.digits[1].set(Math.floor(value / 10));
			this.score.digits[2].set(0);
		}
		else if (value > 99) {
			this.score.digits[0].set(value - Math.floor(value / 10) * 10);
			this.score.digits[1].set(Math.floor((value - Math.floor(value / 100) * 100)/10));
			this.score.digits[2].set(Math.floor(value / 100));
		}
	}
}

function Digit(x, y) {
	this.value = 0;
	this.srcx = 0;
	this.srcy = 118;
	this.w = 6;
	this.h = 6;
	this.x = x;
	this.y = y;
	
	this.set = function(value) {
		this.value = value;
		this.srcx = this.value * this.w + this.value;
	}
}