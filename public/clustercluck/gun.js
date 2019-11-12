function Gun () {
	this.bullets = [];
	var bullet;
	for (var i = 0; i < MAX_BULLETS; i++) {
		bullet = new Bullet();
		this.bullets.push(bullet);
	}
	
	this.init = function(foxManager, chickenManager, itemManager) {
		for (var i = 0; i < this.bullets.length; i++) {
			this.bullets[i].init(foxManager, chickenManager, itemManager);
		}
	}
	
	this.shoot = function(x, y, vx, vy) {
		for (var i = 0; i < this.bullets.length; i++) {
			bullet = this.bullets[i];
			if (bullet.status == 0) {
				document.getElementById("shootSound").pause();
				document.getElementById("shootSound").play();
				bullet.x = x;
				bullet.y = y;
				bullet.vx = vx;
				bullet.vy = vy;
				bullet.status = 1;
				break;
			}
		}
	}
	
	this.update = function() {
		for (var i = 0; i < this.bullets.length; i++) {
			if(this.bullets[i].status != 0) {
				this.bullets[i].update();
			}
		}
	}
}

function Bullet() {
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
	this.w = 1;
	this.h = 1;
	this.status = 0;
	this.foxManager;
	
	this.init = function(foxManager, chickenManager, itemManager) {
		this.foxManager = foxManager;
		this.chickenManager = chickenManager;
		this.itemManager = itemManager;
	}
	
	this.update = function() {
		this.x += this.vx;
		this.y += this.vy;
		
		var hit = this.foxManager.hitCheck(this.x, this.y);
		if (hit != false && hit.status != 5) {
			hit.hurt();
			this.status = 0;
			this.x = 0;
			this.y = 0;
		}
		else {
			var chicken = this.chickenManager.hitCheck(this.x, this.y);
			if (chicken != false) {
				chicken.hurt();
				if (chicken.status == 0) {
					this.itemManager.spawn(this.x, this.y, LEG);
				}
				this.status = 0;
			}
		}
		
		if (this.x < 0 || this.x + this.w > MAP_W * TILE_W || this.y < 0 ||this.y + this.h > MAP_H * TILE_H) {
			this.status = 0;
			this.x = 0;
			this.y = 0;
		}
	}
}