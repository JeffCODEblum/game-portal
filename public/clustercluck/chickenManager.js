function ChickenManager() {
	this.chickens = [];
	this.map;
	var chicken;
	for (var i = 0; i < MAX_CHICKENS; i++) {
		chicken = new Chicken();
		this.chickens.push(chicken);
	}
	
	this.init = function(itemManager, map, fx) {
		for (var i = 0; i < this.chickens.length; i++) {
			this.chickens[i].init(itemManager, map, fx);
		}
	}
	
	this.reset = function() {
		for (var i = 0; i < this.chickens.length; i++) {
			this.chickens[i].reset();
		}
	}
	
	this.spawn = function(x, y) {
		for (var i = 0; i < this.chickens.length; i++) {
			chicken = this.chickens[i];
			if (chicken.status == 0) {
				chicken.spawn(x,y);
				return 1;
			}
		}
		return 0;
	}
	
	this.hitCheck = function(x, y) {
		for (var i = 0; i < this.chickens.length; i++) {
			chicken = this.chickens[i];
			if (chicken.status != 0) {
				if (x > chicken.x && y > chicken.y && x < chicken.x + chicken.w && y < chicken.y + chicken.h) {
					return chicken;
				}
			}
		}
		return false;
	}
	
	this.proxCheck = function(x, y) {
		var dx, dy, hyp;
		for (var i = 0; i < this.chickens.length; i++) {
			chicken = this.chickens[i];
			if (chicken.status != 0) {
				dx = x - chicken.x;
				dy = y - chicken.y;
				hyp = Math.sqrt(dx * dx - dy * dy);
				if (hyp < 12) {
					return chicken;
				}
			}
		}
		return false;
	}
	
	this.update = function() {
		for (var i = 0; i < this.chickens.length; i++) {
			if (this.chickens[i].status != 0) {
				this.chickens[i].update();
			}
		}
	}
}

function Chicken() {
	this.x = 0;
	this.y = 0;
	this.status = 0;
	this.srcx = 0;
	this.srcy = 17;
	this.w = 7;
	this.h = 6;
	this.z = 0;
	this.face = 0;
	this.hp = 0;
	var frame =0;
	var frame8 = 0;
	var standSeq = [0, 1, 2];
	var moveTimer = 0;
	var lastEgg = 0;
	var vx = 0;
	var vy = 0;
	
	this.init = function(itemManager, map, fx) {
		this.map = map;
		this.itemManager = itemManager;
		this.fx = fx;
	}
	
	this.reset = function() {
		this.x = 0;
		this.y = 0;
		this.status = 0;
		this.srcx = 0;
		this.srcy = 17;
		this.w = 7;
		this.h = 6;
		this.z = 0;
		this.face = 0;
		this.hp = 0;
		frame = 0;
		frame8 = 0;
		moveTimer = 0;
		lastEgg = 0;
		vx = 0;
		vy = 0;
	}
	
	this.hurt = function() {
		document.getElementById('chickSound').play();
		this.status = 0;
		this.fx.explode(this.x, this.y, this.z, 0);
		this.fx.explode(this.x, this.y, this.z, 1);
	}
	
	var tile;
	this.spawn = function(x, y) {
		this.status = 1;
		this.hp = 100;
		this.x = x;
		this.y = y;
		tile = this.map.getTileAt(this.x + this.w/2, this.y + this.h);
		this.z = tile.z + 1
		this.fx.explode(x, y, this.z, 1);
	}
	
	this.update = function() {
		frame++;
		if (frame >= 16) {
			frame = 0;
			frame8++;
			if (frame8 > 2) {
				frame8 = 0;
			}
		}
		
		if (this.status == 1) {
			vx = Math.floor(Math.random() * 3) - 1;
			vy = Math.floor(Math.random() * 3) - 1;
			
			var rand = Math.floor(Math.random() * 10);
			if (rand > 3) {
				this.status = 3;
			}
			else  {
				this.status = 2;
			}
			moveTimer = 0;
		}
		else if (this.status == 2) {
			this.x += vx;
			this.y += vy;
			
			var tile = this.map.getTileAt(this.x + this.w/2, this.y + this.h);
			if (tile.walkable != 1 || this.x < 4 * TILE_W || this.x > (MAP_W - 4) * TILE_W || this.y < 4 * TILE_H || this.y > (MAP_H  - 5) * TILE_H) {
				this.x -= vx;
				this.y -= vy;
			}
			
			this.x = Math.floor(this.x);
			this.y = Math.floor(this.y);
			
			moveTimer++;
			if (moveTimer >= 4) {
				moveTimer = 0;
				this.status = 3;
			}
		}
		else if (this.status == 3) {
			moveTimer++;
			if (moveTimer >= 32) {
				mobeTimer = 0;
				this.status = 1;
			}
		}
		
		if (Date.now() - lastEgg > 5000) {
			var rand = Math.floor(Math.random() * 100);
			if (rand < 65) {
				// lay egg
				this.itemManager.spawn(this.x, this.y, 13);
			}
			lastEgg = Date.now();
		}
		
		if (vx > 0) {
			this.face = 1;
		}
		if (vx < 0) {
			this.face = 0;
		}
		
		tile = this.map.getTileAt(this.x + this.w/2, this.y + this.h);
		this.z = tile.z + 1;
		
		this.srcx = 7 * standSeq[frame8];
	}
}