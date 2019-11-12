function Map() {
	this.data = [];
	var z = 0;
	var tile;
	
	this.still = false;
	this.lastStill = 0;
	
	var lastBreak = 0;
	
	for (var j = 0; j < MAP_H; j++) {
		this.data.push([]);
		for (var i = 0; i < MAP_W; i++) {
			tile = new MapTile();
			tile.x = i * TILE_W;
			tile.y = j * TILE_H;
			tile.type = 0;
			tile.z = z;
			this.data[j].push(tile);
			z++;
		}
	}
	
	this.reset = function() {
		this.makeFence();
	}
	
	this.init = function(background, player, itemManager) {
		this.background = background;
		this.player = player;
		this.itemManager = itemManager;
	}
	
	var rand;
	this.createWorld = function() {
		for (var j = 0; j < this.data.length; j++) {
			for (var i = 0; i < this.data[0].length; i++) {
				tile = this.data[j][i];
				rand = Math.floor(Math.random() * 10);
				if (rand == 0) {
					this.setTile(tile, 3);
				}
				else if (rand == 1) {
					this.setTile(tile, 2);
				}
				else {
					this.setTile(tile, 1);
				}
			}
		}
		
		// make fence
		this.makeFence();
		
		//this.setTile(this.data[4][6], 1);
		
		// make treeline
		for (var i = 0; i < MAP_W; i++) {
			this.setTile(this.data[0][i], 5);
			this.setTile(this.data[MAP_H - 1][i], 5);
		}
		for (var i = 0; i < MAP_H; i++) {
			this.setTile(this.data[i][0], 5);
			this.setTile(this.data[i][MAP_W - 1], 5);
		}
		
		// make barn
		var barnx = Math.floor(MAP_W / 2) - 2;
		this.setTile(this.data[2][barnx], 6);
		this.setTile(this.data[2][barnx + 1], 7);
		this.setTile(this.data[2][barnx + 2], 8);
		this.setTile(this.data[2][barnx + 3], 9);
		
	} 
	
	this.makeFence = function() {
		lastBreak = Date.now();
		for (var i = 0 + 4; i < MAP_W - 3; i++) {
			this.setTile(this.data[4][i], 4);
			this.setTile(this.data[MAP_H - 4][i], 4);
			this.data[MAP_H - 4][i].hp = 2;
		}
		for (var i = 1 + 4; i < MAP_H - 4; i++) {
			this.setTile(this.data[i][4], 4);
			this.setTile(this.data[i][MAP_W - 4], 4);
			this.data[i][MAP_W - 4].hp = 2;
		}
	}
	
	this.getOpenings = function() {
		var openings  = [];
		var tile;
		for (var i = 0 + 4; i < MAP_W - 3; i++) {
			tile = this.data[4][i];
			if (tile.type == 16) {
				openings.push(tile);
			}
			tile = this.data[MAP_H - 4][i];
			if (tile.type == 16) {
				openings.push(tile);
			}
		}
		for (var i = 1 + 4; i < MAP_H - 4; i++) {
			tile = this.data[i][4];
			if (tile.type == 16) {
				openings.push(tile);
			}
			tile = this.data[i][MAP_W - 4];
			if (tile.type == 16) {
				openings.push(tile);
			}
		}
		return (openings.length);
	}
	
	//var randx, randy, randSide;
	var rand, randSide;
	this.getFoxSpawn = function() {
		var openings = [];
		var tile, onscreen;
		for (var i = 0 + 4; i < MAP_W - 3; i++) {
			tile = this.data[4][i];
			onscreen = tile.x + tile.w > this.player.worldx - CANVAS_W/2 && tile.x < this.player.worldx + CANVAS_W/2 && tile.y + tile.h > this.player.worldy - CANVAS_H/2 && this.player.worldy < this.player.worldy + CANVAS_H/2;
			if (tile.type == 16 && !onscreen) {
				openings.push(tile);
			}
			tile = this.data[MAP_H - 4][i];
			onscreen = tile.x + tile.w > this.player.worldx - CANVAS_W/2 && tile.x < this.player.worldx + CANVAS_W/2 && tile.y + tile.h > this.player.worldy - CANVAS_H/2 && this.player.worldy < this.player.worldy + CANVAS_H/2;
			if (tile.type == 16 && !onscreen) {
				openings.push(tile);
			}
		}
		for (var i = 1 + 4; i < MAP_H - 4; i++) {
			tile = this.data[i][4];
			onscreen = tile.x + tile.w > this.player.worldx - CANVAS_W/2 && tile.x < this.player.worldx + CANVAS_W/2 && tile.y + tile.h > this.player.worldy - CANVAS_H/2 && this.player.worldy < this.player.worldy + CANVAS_H/2;
			if (tile.type == 16 && !onscreen) {
				openings.push(tile);
			}
			tile = this.data[i][MAP_W - 4];
			onscreen = tile.x + tile.w > this.player.worldx - CANVAS_W/2 && tile.x < this.player.worldx + CANVAS_W/2 && tile.y + tile.h > this.player.worldy - CANVAS_H/2 && this.player.worldy < this.player.worldy + CANVAS_H/2;
			if (tile.type == 16 && !onscreen) {
				openings.push(tile);
			}
		}
		if (openings.length > 0) {
			rand = Math.floor(Math.random() * openings.length);
			return (openings[rand]);
		}
		else {
			return false;
		}
	}
	
	var tile, nw, ne, sw, se, dx, dy, hyp, diff;
	this.hammer = function(x, y) {
		tile = this.getTileAt(x, y);
		dx = this.player.worldx - (tile.x + tile.w/2);
		dy = this.player.worldy - (tile.y + tile.h/2);
		diff = dx * dx - dy * dy;
		if (diff < 0) diff *=  -1;
		hyp = Math.sqrt(diff);
		
		if (hyp < 16) {
			if (tile.type == 16) {
				nw = this.getTileAt(this.player.worldx - this.player.w/2, this.player.worldy - this.player.h/2);
				ne = this.getTileAt(this.player.worldx + this.player.w/2, this.player.worldy -  this.player.h/2);
				sw = this.getTileAt(this.player.worldx - this.player.w/2, this.player.worldy + this.player.h/2);
				se = this.getTileAt(this.player.worldx + this.player.w/2, this.player.worldy +  this.player.h/2);
				if (nw != false && ne != false && sw != false && se != false) {
					if (nw != tile && ne != tile && sw != tile && se != tile) {
						document.getElementById('hammerSound').play();
						tile.fix();
						this.background.setAll();
					}
				}
			}
		}
	}
	
	this.hammerCheck = function(x, y) {
		tile = this.getTileAt(x, y);
		dx = this.player.worldx - (tile.x + tile.w/2);
		dy = this.player.worldy - (tile.y + tile.h/2);
		diff = dx * dx - dy * dy;
		if (diff < 0) diff *=  -1;
		hyp = Math.sqrt(diff);
		if (hyp < 16) {
			if (tile.type == 16) {
				nw = this.getTileAt(this.player.worldx - this.player.w/2, this.player.worldy - this.player.h/2);
				ne = this.getTileAt(this.player.worldx + this.player.w/2, this.player.worldy -  this.player.h/2);
				sw = this.getTileAt(this.player.worldx - this.player.w/2, this.player.worldy + this.player.h/2);
				se = this.getTileAt(this.player.worldx + this.player.w/2, this.player.worldy +  this.player.h/2);
				if (nw != false && ne != false && sw != false && se != false) {
					if (nw != tile && ne != tile && sw != tile && se != tile) {
						return true;
					}
				}
			}
		}
		return false;
	}
	
	this.update = function() {
		var rand, randSide, fencex, fencey;
		if (Date.now() - lastBreak > 1000) {
			rand = Math.floor(Math.random() * 100);
			if (rand < 33) {
				randSide = Math.floor(Math.random() * 4);
				if (randSide == 0) {
					fencex = 4 + Math.floor(Math.random() * 24);
					fencey = 4;
				}
				else if (randSide == 1) {
					fencex = 4 + Math.floor(Math.random() * 24);
					fencey = MAP_H - 4;
				}
				else if (randSide == 2) {
					fencey = 4 + Math.floor(Math.random() * 17);
					fencex = 4;
				}
				else if (randSide == 3) {
					fencey = 4 + Math.floor(Math.random() * 17);
					fencex = MAP_W - 4;
				}
				//console.log(this.data[fencey][fencex].hurt());
				this.data[fencey][fencex].hurt();
				this.background.setAll();
			}
			lastBreak = Date.now();
		}
		
		if (this.still == true && Date.now() - this.lastStill > 30000) {
			// tell item manager to spawn whiskey
			this.itemManager.spawn(14 * TILE_W, 7 * TILE_H, SHINE);
			this.lastStill = Date.now();
		}
	}
	
	this.setTile = function(tile, type) {
		if (type == 1) {
			tile.type = 1;
			tile.walkable = 1;
			tile.srcx = 0;
			tile.srcy = 31;
		}
		else if (type == 2) {
			tile.type = 2;
			tile.walkable = 1;
			tile.srcx = 18;
			tile.srcy = 31;
		}
		else if (type == 3) {
			tile.type = 3;
			tile.walkable = 1;
			tile.srcx = 9;
			tile.srcy = 31;
		}
		else if (type == 4) {
			tile.type = 4;
			tile.walkable = 0;
			tile.srcx = 0;
			tile.srcy = 40;
		}
		else if (type == 5) {
			tile.type = 5;
			tile.walkable = 0;
			tile.srcx = 0;
			tile.srcy = 31;
		}
		else if (type == 6) {
			tile.type = 6;
			tile.walkable = 0;
			tile.srcx = 0;
			tile.srcy = 31;
		}
		else if (type == 7) {
			tile.type = 7;
			tile.walkable = 0;
			tile.srcx = 0;
			tile.srcy = 31;
		}
		else if (type == 8) {
			tile.type = 8;
			tile.walkable = 0;
			tile.srcx = 0;
			tile.srcy = 31;
		}
		else if (type == 9) {
			tile.type = 9;
			tile.walkable = 0;
			tile.srcx = 0;
			tile.srcy = 31;
		}
		else if (type == 16) {
			tile.type = 16;
			tile.walkable = 1;
			tile.srcx = 9;
			tile.srcy = 40;
		}
		else if (type == 17) {
			tile.type = 17;
			tile.walkable = 0;
			tile.srcx = 0;
			tile.srcy = 0;
		}
		else if (type == 19) {
			tile.type = 19;
			tile.walkable = 0;
			tile.srcx = 0;
			tile.srcy = 31;
		}
		else if (type == 30) {
			tile.type = 30;
			tile.walkable = 0;
			tile.srcx = 0;
			tile.srcy = 31;
		}
		else if (type == 31) {
			tile.type = 31;
			tile.walkable = 0;
			tile.srcx = 0;
			tile.srcy = 31;
		}
	}
	
	this.getTileAt = function(x, y) {
		for (var j = 0; j < this.data.length; j++) {
			if (Math.floor(y/TILE_H) == this.data[j][0].y/TILE_H) {
				for (var i = 0; i < this.data[0].length; i++) {
					if (Math.floor(x/TILE_W) == this.data[j][i].x / TILE_W) return this.data[j][i];
				}
			}
		}
		return false;
	}
	
	this.createWorld();
}

function MapTile() {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.walkable = 1;
	this.type = 0;
	this.srcx = 0;
	this.srcy = 0;
	this.hp = 2;
	this.w = 16;
	this.h = 16;
	
	this.hurt = function() {
		this.hp--;
		if (this.hp <= 0) {
			this.hp = 0;
			this.destroy();
		}
	}
	
	this.destroy = function() {
		this.type = 16;
		this.walkable = 1;
		this.srcx = 9;
		this.srcy = 40;
	}
	
	this.fix = function() {
		this.hp = 2;
		this.type = 4;
		this.walkable = 0;
		this.srcx = 0;
		this.srcy = 40;
	}
}