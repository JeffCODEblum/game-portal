function FoxManager() {
	this.foxes = [];
	var lastSpawn = 0;
	var fox;
	for (var i = 0; i < MAX_FOXES; i++) {
		fox = new Fox();
		this.foxes.push(fox);
	}
	
	this.init = function(map, chickenManager, fx) {
		for (var i = 0; i < this.foxes.length; i++) {
			this.foxes[i].init(map, chickenManager, fx);
		}
		this.map = map;
	}
	
	this.reset = function() {
			for (var i = 0; i < this.foxes.length; i++) {
				this.foxes[i].reset();
			}
	}
	
	this.spawn = function(x, y, vx, vy) {
		for (var i = 0; i < this.foxes.length; i++) {
			if (this.foxes[i].status == 0) {
				this.foxes[i].x = x;
				this.foxes[i].y = y;
				this.foxes[i].vx = vx;
				this.foxes[i].vy = vy;
				this.foxes[i].status = 3;
				break;
			}
		}
	}
	
	var vx, vy, spawnTile, openings, chance;
	this.update = function() {
		 
		 if (Date.now() - lastSpawn > 9000) {
			 
			 openings = this.map.getOpenings();
			 chance = 84 - openings;
			 
			 var rand = Math.floor(Math.random() * chance);
			 if (rand > 12) {
				 
				 spawnTile = this.map.getFoxSpawn();
				 if (spawnTile.x > MAP_W * TILE_W/2) {
					 vx = -1;
				 }
				 if (spawnTile.x < MAP_W * TILE_W/2) {
					 vx = 1;
				 }
				 if (spawnTile.y > MAP_H * TILE_H/2) {
					 vy = -1;
				 }
				 if (spawnTile.y < MAP_H * TILE_H/2) {
					 vy = 1;
				 }
				 if (spawnTile != false) {
					 this.spawn(spawnTile.x, spawnTile.y, vx, vy);

				 }
			 }
			 lastSpawn = Date.now();
		 }
		 
		for (var i = 0; i < this.foxes.length; i++) {
			if (this.foxes[i].status != 0) {
				this.foxes[i].update();
			}
		}
	}
	
	this.hitCheck = function(x, y) {
		for (var i = 0; i < this.foxes.length; i++) {
			fox = this.foxes[i];
			if (fox.status != 0) {
				if (x > fox.x && y > fox.y && x < fox.x + fox.w && y < fox.y + fox.h) {
					return fox;
				}
			}
		}
		return false;
	}
}

function Fox() {
	this.x = 0;
	this.y = 0;
	this.srcx = 0;
	this.srcy = 24;
	this.w = 17;
	this.h = 6;
	this.z = 1000;
	this.status = 0;
	this.face = 1;
	this.type = 14;
	this.deathTime = 0;
	this.lastChangeFace = 0;
	this.lastKill = 0;
	
	var frame = 0;
	var frame8 = 0;
	var frame4 = 0;
	var standSeq = [0, 1, 2];
	var walkSeq = [3, 4];
	var deadSeq = [2, 5];
	var walkCount = 0;
	var direct = 0;
	var vx = 0;
	var vy = 0;
	this.target;
	this.destination = 0;
	
	this.init = function(map, chickenManager, fx) {
		this.map = map;
		this.chickenManager = chickenManager;
		this.fx = fx;
	}
	
	this.reset = function() {
		this.x = 0;
		this.y = 0;
		this.srcx = 0;
		this.srcy = 24;
		this.w = 17;
		this.h = 6;
		this.z = 1000;
		this.status = 0;
		this.face = 1;
		this.type = 14;
		this.lastChangeFace = 0;
		this.lastKill = 0;
		this.destination = 0;
	}
	
	this.hurt = function() {
		document.getElementById('hurtSound').play();
		this.status = 5;
		this.fx.explode(this.x, this.y, this.z + 3, 0);
		this.deathTime = Date.now();
	}
	
	var nw, ne, sw, se, tile;
	this.move = function() {
		if (vx < 0) {
			this.face = 0;
		}
		if (vx > 0) {
			this.face = 1;
		}
		if (frame%2  == 0) {
			this.x += vx;
			this.y += vy;
			tile = this.map.getTileAt(this.x + this.w/2, this.y + this.h);
			if (tile.walkable != 1) {
				this.x -= vx;
				this.y -= vy;
				// pick a new direction
				this.status = 1;
			}
			this.z = tile.z + 1;
		}
	}
	
	var rand, tile, target;
	this.update = function() {
		frame++;
		if (frame == 8 || frame == 16) {
			frame4++;
			if (frame4 > 2) {
				frame4 = 0;
			}
		}
		if (frame >= 16) {
			frame = 0;
			frame8++;
			if (frame8 > 2) {
				frame8 = 0;
			}
		}
		
		if (this.status  == 1) {
			// Decide weather to move or stand still
			rand = Math.floor(Math.random() * 100);
			walkCount = 0;
			if (rand < 33) {
				// stand still
				this.status = 2;
			}
			else {
				// move
				this.status = 3;
				this.destination = {
					x: Math.floor(Math.random() * MAP_W) * TILE_W,
					y: Math.floor(Math.random() *  MAP_H) * TILE_H
				};
				if (this.x > this.destination.x) {
					vx = -1;
				}
				else {
					vx = 1;
				}
				if (this.y > this.destination.y) {
					vy = -1;
				}
				else {
					vy = 1;
				}
			}
		}
		
		else if (this.status == 2) {
			this.target = this.chickenManager.proxCheck(this.x + this.w/2, this.y + this.h);
			if (target != false) {
				this.status = 4;
			}
			walkCount++;
			if (walkCount >= 32) {
				this.status = 1;
			}
		}
		else if (this.status == 3) {
			this.target = this.chickenManager.proxCheck(this.x + this.w/2, this.y + this.h);
			if (this.target != false) {
				this.status = 4;
			}
			this.move();
			walkCount++;
			if (walkCount >= 32) {
				this.status = 1;
				walkCount = 0;
			}
		}
		
		else if (this.status == 4) {
			this.target = this.chickenManager.proxCheck(this.x + this.w/2, this.y + this.h);
			if (this.target != false) {
				this.status = 4;
				
				if (Date.now() - this.lastFaceChange > 100) {
					if (this.x + this.w/2 < this.target.x) {
						vx = 1;
					}
					if (this.x + this.w/2 > this.target.x) {
						vx = -1;
					}
					if (this.y + this.h < this.target.y) {
						vy = 1;
					}
					if (this.y + this.h > this.target.y) {
						vy = -1;
					}
					this.lastFaceChange = Date.now();
				}
			}
			else {
				this.status = 1;
			}
			this.move();
		}
		
		else if (this.status == 5) {
				// dead
				if (Date.now() - this.deathTime > 1000) {
					this.status = 0;
				}
		}
		
		var victim = this.chickenManager.hitCheck(this.x + this.w/2, this.y + this.h);
		if (victim != false && this.status != 5 && (Date.now() - this.lastKill > 200)) {
			document.getElementById('chickSound').play();
			victim.hurt();
			this.lastKill = Date.now();
			status = 1;
		}
		
		if (this.status != 5) {
			if (vx == 0 && vy == 0) {
				this.srcx = 17 * standSeq[frame8];
			}
			else {
				this.srcx = 17 * standSeq[frame4];
			}
		}
		else {
			this.srcx = 17 * deadSeq[frame4%2];
		}
	}
}