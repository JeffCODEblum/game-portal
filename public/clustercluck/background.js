var tile, gridw, gridh;
function Background() {
	this.scrollx = false;
	this.scrolly = false;
	this.data = [];
	gridh = Math.floor(CANVAS_H / TILE_H) + 2;
	gridw = Math.floor(CANVAS_W / TILE_W) + 2;
	for (var j = 0; j < gridh; j++) {
		this.data.push([]);
		for (var i = 0; i < gridw; i++) {
			tile = new Tile();
			tile.x = i * TILE_W;
			tile.y = j * TILE_H;
			tile.worldx = tile.x;
			tile.worldy = tile.y;
			this.data[j].push(tile);
		}
	}
	
	this.init = function(player, map) {
		this.player = player;
		this.map = map;
	}
	
	this.spawn = function() {
		for (var j = 0; j < this.data.length; j++) {
			for (var i = 0; i < this.data[0].length; i++) {
				this.data[j][i].x = i * TILE_W + CANVAS_W/2;
				this.data[j][i].y = j * TILE_H + CANVAS_H/2;
				this.data[j][i].worldx = this.player.worldx + i  * TILE_W;
				this.data[j][i].worldy = this.player.worldy + j * TILE_H;
				this.setTile(this.data[j][i]);
			}
		}
	}
	
	var tile, slot;
	this.setAll = function() {
		for (var j = 0; j < this.data.length; j++) {
			for (var i = 0; i < this.data[0].length; i++) {
				this.setTile(this.data[j][i]);
			}
		}
	}
	
	var mapTile;
	this.setTile = function(tile) {
		mapTile = this.map.getTileAt(tile.worldx, tile.worldy);
		if (mapTile != false) {
			tile.type = mapTile.type;
			tile.z = mapTile.z;
		}
		else {
			tile.type = 0;
			tile.z = 0;
		}
	}
	
	this.update = function(vx, vy) {
		for (var j = 0; j < this.data.length; j++) {
			for (var i = 0; i < this.data[0].length; i++) {
				tile = this.data[j][i];
				tile.x -= vx;
				tile.y -= vy;
				
				if  (tile.x < -tile.w) {
					tile.x += gridw * tile.w;
					tile.worldx += gridw * tile.w;
					this.setTile(tile);
				}
				if (tile.y < -tile.h) {
					tile.y += gridh * tile.h;
					tile.worldy += gridh * tile.h;
					this.setTile(tile);
				}
				if (tile.x > (gridw-1) * tile.w) {
					tile.x -= gridw * tile.w;
					tile.worldx -= gridw * tile.w;
					this.setTile(tile);
				}
				if (tile.y > (gridh - 1) * tile.h) {
					tile.y -= gridh * tile.h;
					tile.worldy -= gridh * tile.h;
					this.setTile(tile);
				}
			}
		}
	}
}

function Tile() {
	this.x = 0;
	this.y = 0;
	this.w = TILE_W;
	this.h = TILE_H;
	this.z = 0;
	this.type = 0;
}