function Viewport() {
	this.x = 0;
	this.y = 0;
	this.w = CANVAS_W;
	this.h = CANVAS_H;
	this.vx = 0;
	this.vy = 0;
	this.game;

	this.link = function(game) {
		this.game = game;
	}
	
	this.pan = {
		vx: 0,
		vy: 0,
		speed: 1
	};
	
	this.shaker = {
		length: 0,
		speed: 0,
		times: 0,
		plusx: 0,
		minusx: 0,
		direction: 0,
		lastShake: 0,
		shake: function(length, speed, times) {
			if (Date.now() - this.lastShake > 400) {
				this.lastShake = Date.now();
				if (this.times == 0) {
					this.length = length;
					this.speed = speed;
					this.times = times;
					this.direction = 1;
				}
			}
		}
	};
	
	this.spawn = function() {
		this.x = this.game.player.x - ((this.game.viewport.w / TILE_W) / 2) * TILE_W;
		this.y = this.game.player.y - ((this.game.viewport.h / TILE_H) / 2) * TILE_H;
	}
	 
	this.update = function() {
		this.vx = 0;
		this.vy = 0;
		
		if (this.shaker.times > 0) {
			this.pan.vx += this.shaker.direction * this.shaker.speed;
			if (this.shaker.direction == 1) {
				this.shaker.plusx++;
			}
			else {
				this.shaker.minusx++;
			}
			if (this.shaker.plusx >= this.shaker.length) {
				this.shaker.direction = -1;
				this.shaker.plusx = 0;
				this.shaker.minusx = -this.shaker.length;
			}
			if (this.shaker.minusx >= this.shaker.length) {
				this.shaker.direction = 1;
				this.shaker.minusx = 0;
				this.shaker.plusx = -this.shaker.length;
				this.shaker.times--;
			}
		}
		/*
		if (this.game.player.vx > 0 && this.game.player.x - this.x > CANVAS_W/3) {
			this.pan.vx += this.pan.speed;
		}
		if (this.game.player.vx < 0 && this.game.player.x - this.x < CANVAS_W - (CANVAS_W/3)) {
			this.pan.vx -=  this.pan.speed;
		}
		if (this.game.player.vy > 0 && this.game.player.y - this.y > CANVAS_H/3) {
			this.pan.vy +=  this.pan.speed;
		}
		if (this.game.player.vy < 0 && this.game.player.y - this.y < CANVAS_H - (CANVAS_H/3)) {
			this.pan.vy -=  this.pan.speed;
		}
		*/

		if (this.game.player.vx == 0) {
			if (this.game.player.x - this.x > CANVAS_W/2) {
				this.pan.vx +=  this.pan.speed;
			}
			if (this.game.player.x - this.x < CANVAS_W/2) {
				this.pan.vx -=  this.pan.speed;
			}
		}
		if (this.game.player.vy == 0) {
			if (this.game.player.y - this.y > CANVAS_H/2) {
				this.pan.vy +=  this.pan.speed;
			}
			if (this.game.player.y - this.y < CANVAS_H/2) {
				this.pan.vy -=  this.pan.speed;
			}
		}
		

		this.vx += this.pan.vx;
		this.vy += this.pan.vy;
		
		if (this.game.player.x - this.x < TILE_W * 3 || this.game.player.x - this.x > CANVAS_W - TILE_W * 3) {
			this.vx = this.game.player.vx;
		}
		if (this.game.player.y + this.game.player.vy - this.y < TILE_H * 3 || this.game.player.y + this.game.player.vy - this.y > CANVAS_H - TILE_H * 3) {
			this.vy = this.game.player.vy;
		}
		
	
		/*
		if (this.game.player.vx > 0) {
			if (this.game.player.x - this.x > TILE_W * 2) {
				this.vx += 2;
			}
		}
		if (this.game.player.vx < 0) {
			if (this.game.player.x - this.x < (MAP_W - 2) * TILE_W) {
				this.vx -= 2;
			}
		}
		if (this.game.player.vy > 0) {
			if (this.game.player.y - this.y > TILE_H * 2) {
				this.vy += 2;
			}
		}
		if (this.game.player.vy < 0) {
			if (this.game.player.y - this.y < (MAP_H - 2) * TILE_H) {
				this.vy -= 2;
			}
		}
		*/
	
		this.x += this.vx;
		this.y += this.vy;
		
		this.pan.vx = 0;
		this.pan.vy = 0;
	}
}