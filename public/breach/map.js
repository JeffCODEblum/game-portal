var WATER = 0;
var SAND = 1;
var GRASS = 2
var BORDER = 19;
var TREE = 3;
var PINE1L = 3;
var PINE1R = 4;
var OAK1L = 5;
var OAK1R = 6;
var PINE2L = 7;
var PINE2R = 8;
var OAK2L = 9;
var OAK2R = 10;
var OAK3L = 17;
var OAK3R = 18;

var CASTLE1 = 11;
var CASTLE2 = 12;
var CASTLE3 = 13;
var CASTLE4 = 14;
var CASTLE5 = 15;
var CASTLE6 = 16;

var RED_CASTLE1 = 21;
var RED_CASTLE2 = 22;
var RED_CASTLE3 = 23;
var RED_CASTLE4 = 24;
var RED_CASTLE5 = 25;
var RED_CASTLE6 = 26;

function Map() {
	this.data = [];
	this.game;
	var z = 0;
	var tile;
	for (var j = 0; j < MAP_H; j++) {
		this.data.push([]);
		for (var i = 0; i < MAP_W; i++) {
			tile = new MapTile();
			tile.x = i * TILE_W;
			tile.y = j * TILE_H;
			tile.type = 0;
			tile.mark = 0;
			tile.solid = 0;
			tile.z = z;
			this.data[j].push(tile);
			z++;
		}
	}

	this.link = function(game) {
		this.game = game;
		var tile;
		for (var j = 0; j < this.data.length; j++) {
			for (var i = 0; i < this.data[0].length; i++) {
				tile = this.data[j][i];
				tile.link(game);
			}
		}
	}
	
	var rand;
	this.createWorld = function() {
		console.log("making water");
		// start with all water
		for (var j = 0; j < this.data.length; j++) {
			for (var i = 0; i < this.data[0].length; i++) {
				this.data[j][i].type = WATER;
				this.data[j][i].mark = 0;
				this.data[j][i].solid = 0;
				this.data[j][i].sprites = [];
			}
		}
		
		console.log("making land");
		// add some sand
		for (var j = 0; j < this.data.length; j++) {
			for (var i = 0; i < this.data[0].length; i++) {
				var tile = this.data[j][i];
				rand = Math.floor(Math.random() * 100);
				if (rand < 58) {
					tile.type = WATER;
				}
				else {
					tile.type = SAND;
				}
			}
		}
		this.automate(WATER, SAND, 2);
	
		console.log("ensuring continuity");
		// ensure land continuity
		var randSand;
		var randx, randy;
		for (var i = 0; i < 100; i++) {
			randx = Math.floor(Math.random() * MAP_W);
			randy = Math.floor(Math.random() * MAP_H);
			randSand = this.data[randy][randx];
			if (randSand.type == SAND) break;
		}
		if (randSand.type == SAND) {
			this.floodFill(randx, randy, SAND, GRASS);
		}
		else {
			return 0;
		}
		// remove disjoint land cells
		this.changeTiles(SAND, WATER);
		if (this.getTileRatio(GRASS) < 0.75) {
			return 0;
		}
		this.changeTiles(GRASS, SAND);
	
		console.log("growing grass");
		// add some grass
		for (var j = 0; j < this.data.length; j++) {
			for (var i = 0; i < this.data[0].length; i++) {
				if (this.data[j][i].type == SAND) {
					rand = Math.floor(Math.random() * 100);
					if (rand < 50) {
						this.data[j][i].type = SAND;
					}
					else {
						this.data[j][i].type = GRASS;
					}
				}
			}
		}
		this.automate(SAND, GRASS, 2);
		
		console.log("planting trees");
		// add some trees
		for (var j = 0; j < this.data.length; j++) {
			for (var i = 0; i < this.data[0].length; i++) {
				if (this.data[j][i].type == GRASS) {
					rand = Math.floor(Math.random() * 100);
					if (rand < 72) {
						this.data[j][i].type = GRASS;
					}
					else {
						this.data[j][i].type = TREE;
					}
				}
			}
		}
		this.automate(GRASS, TREE, 2);
		// vary trees
		for (var j = 0; j < this.data.length; j++) {
			for (var i = 0; i < this.data[0].length; i++) {
				var tile = this.data[j][i];
				if (tile.type == TREE) {
					if (Math.floor(Math.random() * 4) == 1) {
						var rand = Math.floor(Math.random() * 200);
						if (rand < 1) {
							tile.type = OAK3L;
						}
						else if (rand >= 1 && rand < 100) {
							tile.type = OAK2L;
						}
						else {
							tile.type = OAK3L;
						}
					}
					else {
						if (Math.floor(Math.random() * 2) == 1) {
							tile.type = PINE2L;
						}
					}
				}
			}
		}

		console.log("building castles");
		// make castles
		var success = false;
		var castleX, castleY;
		
		//while (success == false) {
		for (var k = 0; k < 100; k++) {
			success = true;
			castleX = Math.floor(Math.random() * (MAP_W - 8));
			castleY = Math.floor(Math.random() * (MAP_H - 3))
			for (var j=0; j<4; j++) {
				for (var i=0; i < 8; i++) {
					if (this.data[castleY + j][castleX + i].type == 0 || this.data[castleY + j][castleX + i].type >= 3) {
						success = false;
						break;
					}
				}
			}
		}
		
		if (success) {
			this.data[castleY + 1][castleX + 1].type = CASTLE1;
			this.data[castleY + 1][castleX + 2].type = CASTLE2;
			this.data[castleY + 1][castleX + 3].type = CASTLE3;
			this.data[castleY + 1][castleX + 4].type = CASTLE4;
			this.data[castleY + 1][castleX + 5].type = CASTLE5;
			this.data[castleY + 1][castleX + 6].type = CASTLE6;

			this.data[castleY][castleX + 1].solid = true;
			this.data[castleY][castleX + 2].solid = true;
			this.data[castleY][castleX + 3].solid = true;
			this.data[castleY][castleX + 4].solid = true;
			this.data[castleY][castleX + 5].solid = true;
			this.data[castleY][castleX + 6].solid = true;

		
		}
		else {
			return 0;
		}

		console.log("finishing map");
		
		// add right halves of trees top whole of map
		for (var j = 0; j < this.data.length; j++) {
			for (var i = 0; i < this.data[0].length; i++) {
				var tile = this.data[j][i];
				if ((tile.type == PINE1L || tile.type == PINE2L || tile.type == OAK1L || tile.type == OAK2L || tile.type == OAK3L) && i + 1 < MAP_W) {
					this.data[j][i + 1].type = tile.type + 1;
				}
			}
		}

		// add solid attribute to tiles
		for (var j = 0; j < this.data.length; j++) {
			for (var i = 0; i < this.data[0].length; i++) {
				var tile = this.data[j][i];
				if (tile.type == WATER || tile.type >= TREE) {
					tile.solid = true;
				}
			}
		}
		
		console.log("checking continuity again");
		if (this.checkContinuity() == false) {
			return 0;
		}
		
		console.log("adding sprites");
		// add sprites based on type
		for (var j = 0; j < this.data.length; j++) {
			for (var i = 0; i < this.data[0].length; i++) {
				var tile = this.data[j][i];
				var rand;
				if (tile.type == WATER) {
					rand = Math.floor(Math.random() * this.game.spriteSet.waterTiles.length);
					tile.sprites.push(this.game.spriteSet.waterTiles[rand]);
				}
				if (tile.type == SAND) {
					rand = Math.floor(Math.random() * this.game.spriteSet.sandTiles.length);
					tile.sprites.push(this.game.spriteSet.sandTiles[rand]);
				}
				else if (tile.type == GRASS) {
					rand = Math.floor(Math.random() * this.game.spriteSet.grassTiles.length);
					tile.sprites.push(this.game.spriteSet.grassTiles[rand]);
				}
				else if (tile.type == PINE1L) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.pine1L);
				}
				else if (tile.type == PINE1R) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.pine1R);
				}
				else if (tile.type == OAK1L) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.oak1L);
				}
				else if (tile.type == OAK1R) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.oak1R);
				}
				else if (tile.type == PINE2L) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.pine2L);

				}
				else if (tile.type == PINE2R) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.pine2R);
				}
				else if (tile.type == OAK2L) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.oak2L);
				}
				else if (tile.type == OAK2R) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.oak2R);
				}
				else if (tile.type == OAK3L) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.oak3L);
				}
				else if (tile.type == OAK3R) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.oak3R);
				}
				else if (tile.type == CASTLE1) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.castle1);
				}
				else if (tile.type == CASTLE2) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.castle2);
				}
				else if (tile.type == CASTLE3) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.castle3);
				}
				else if (tile.type == CASTLE4) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.castle4);
				}
				else if (tile.type == CASTLE5) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.castle5);
				}
				else if (tile.type == CASTLE6) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.castle6);
				}
				else if (tile.type == RED_CASTLE1) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.redCastle1);
				}
				else if (tile.type == RED_CASTLE2) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.redCastle2);
				}
				else if (tile.type == RED_CASTLE3) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.redCastle3);
				}
				else if (tile.type == RED_CASTLE4) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.redCastle4);
				}
				else if (tile.type == RED_CASTLE5) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.redCastle5);
				}
				else if (tile.type == RED_CASTLE6) {
					tile.sprites.push(this.game.spriteSet.grass1);
					tile.sprites.push(this.game.spriteSet.redCastle6);
				}
				else if (tile.type == BORDER) {
					tile.sprites.push(this.game.spriteSet.border);
				}
			}
		}

		return 1;
	}
	
	var map, count, thresh1, thresh2;
	this.automate = function(type1, type2, numTimes) {
		for (var times = 0; times < numTimes; times++) {
			for (var i = 0; i < this.data.length; i++) {
				for (var j = 0; j < this.data[i].length; j++) {
					var tile = this.data[i][j];
					var liveNeighborCount = 0;
					for (var k = i - 1; k < i + 2; k++) {
						for (var l = j - 1; l < j + 2; l++) {
							if (k > 0 
							&& l > 0 
							&& k < this.data.length 
							&& l < this.data[0].length)
							{
								var neighbor = this.data[k][l];
								if (neighbor.type == type2 && (j != k || i != l)) {
									liveNeighborCount++;
								}
							}
						}
					}
					if (tile.type == type1 || tile.type == type2) {
						if (liveNeighborCount > 3) {
							tile.type = type2;
						}
						else {
							tile.type = type1;
						}
					}
				}
			}
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

	this.getTileAtIndex = function(x, y) {
		if (x >= 0 && x < MAP_W && y >= 0 && y < MAP_H) {
			return this.data[y][x];
		}
		return false;
	}

	this.checkContinuity = function() {
		var continuity = true;
		var tile = this.getRandWalkable();
		this.fillWalkable(tile.x/TILE_W, tile.y/TILE_H);
		for (var j = 0; j < this.data.length; j++) {
			for (var i = 0; i < this.data[0].length; i++) {
				var tile = this.data[j][i];
				if (tile.mark == 0 && tile.solid == false) {
					continuity = false;
				}
			}
		}
		return continuity;
	}

	this.fillWalkable = function(x, y) {
		if (x < 0 || y < 0 || x >= this.data[0].length || y >= this.data.length) {
			return;
		}
		var cell = this.data[y][x];
		if (cell.solid == true || cell.mark == true) {
			return;
		}
		cell.mark = true;
		cell.sprites = [];
		this.fillWalkable(x, y - 1);
		this.fillWalkable(x, y + 2);
		this.fillWalkable(x - 1, y);
		this.fillWalkable(x + 1, y);
	}
	
	this.getRandWalkable = function() {
		while (1) {
			var randX = Math.floor(Math.random() * MAP_W * TILE_W);
			var randY = Math.floor(Math.random() * MAP_H * TILE_H);
			var tile = this.getTileAt(randX, randY);
			if (tile.solid == 0) {
				return tile;
			}
		}
	}

	this.getBlueSpawn = function() {
		while (1) {
			var randX = Math.floor(Math.random() * MAP_W);
			var randY = Math.floor(Math.random() * MAP_H);
			var tile = this.getTileAtIndex(randX, randY);
			var tile2 = this.getBlueDoor();
			var dx = tile.x - tile2.x;
			var dy = tile.y - tile2.y;
			var dist = Math.sqrt(dx * dx + dy * dy);
			if (tile.solid == 0 && dist < 64) {
				return tile;
			}
		}
	}

	this.getRedDoor = function() {
		for (var j = 0; j < this.data.length; j++) {
			for (var i = 0; i < this.data[0].length; i++) {
				if (this.data[j][i].type == RED_CASTLE3) {
					return this.data[j][i];
				}
			}
		}
	}

	this.getBlueDoor = function() {
		for (var j = 0; j < this.data.length; j++) {
			for (var i = 0; i < this.data[0].length; i++) {
				if (this.data[j][i].type == CASTLE3) {
					return this.data[j][i];
				}
			}
		}
	}

	this.floodFill = function(x, y, targetType, newType) {
		if (x < 0 || y < 0 || x >= this.data[0].length || y >= this.data.length) {
			return;
		}
		var cell = this.data[y][x];
		if (cell.type != targetType) {
			return;
		}
		cell.type = newType;
		this.floodFill(x, y - 1, targetType, newType);
		this.floodFill(x, y + 2, targetType, newType);
		this.floodFill(x - 1, y, targetType, newType);
		this.floodFill(x + 1, y, targetType, newType);
	}

	this.changeTiles = function(targetType, newType) {
		for (var j = 0; j < this.data.length; j++) {
			for (var i = 0; i < this.data[0].length; i++) {
				if (this.data[j][i].type == targetType) {
					this.data[j][i].type = newType;
				}
			}
		}
	}

	this.getTileRatio = function(type) {
		var count = 0;
		for (var j = 0; j < this.data.length; j++) {
			for (var i = 0; i < this.data[0].length; i++) {
				if (this.data[j][i].type == type) {
					count++;
				}
			}
		}
		return (count / (MAP_W * MAP_H));
	}

	this.getDrawData = function() {
		var drawData = [];

		var startX;
		var startY;
		var width;
		var height;

		if (this.game.player.mapIsUp == 0) {
			startX = Math.floor(this.game.viewport.x / TILE_W);
			startY = Math.floor(this.game.viewport.y / TILE_H);
			width = Math.floor(this.game.viewport.w / TILE_W) + 1;
			height = Math.floor(this.game.viewport.h / TILE_H) + 3;
		}
		else {
			startX = 0;
			startY = 0;
			width = MAP_W;
			height = MAP_H;
		}
		
		for (var i = startY; i < startY + height; i++) {
			for (var j = startX; j < startX + width; j++) {
				if (i >= 0 && j >= 0 && i < this.data.length && j < this.data[0].length) {
					var tile = this.data[i][j];
					drawData.push(tile);
				}
			}
		}
		return(drawData);
	}
}

function MapTile() {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.w = TILE_W;
	this.h = TILE_H;
	this.type = 0;
	this.solid = 0;
	this.game;
	this.sprites = [];
	this.mark = 0;

	this.link = function(game) {
		this.game = game;
	}

	this.draw = function() {
		if (this.game.player.mapIsUp == 1) {
			var color = "";
			switch (this.type) {
				case WATER:
					color = "rgb(0, 0, 255)";
					break;
				case SAND:
					color = "rgb(255, 255, 0)";
					break;
				case GRASS:
					color = "rgb(0, 255, 0)";
					break;
				case 3:
					color = "rgb(0, 100, 0)";
					break;
				case 4:
					color = "rgb(0, 100, 0)";
					break;
				case 5:
					color = "rgb(0, 25, 0)";
					break;
				case 6:
					color = "rgb(0, 25, 0)";
					break;
				case 7:
					color = "rgb(0, 55, 0)";
					break;
				case 8:
					color = "rgb(0, 55, 0)";
					break;
				case 9:
					color = "rgb(0, 25, 0)";
					break;
				case 10:
					color = "rgb(0, 25, 0)";
					break;
				case 17:
					color = "rgb(25, 25, 0)";
					break;
				case 18:
					color = "rgb(25, 25, 0)";
					break;
				default:
					color = "rgb(200, 0, 0)";
			}
			if (this.type >= CASTLE1 && this.type <= CASTLE6) {
				color = "rgb(100, 100, 255)";
			}
			else if (this.type >= RED_CASTLE1 && this.type <= RED_CASTLE6) {
				color = "rgb(255, 100, 100)";
			}
			this.game.context.fillStyle = color;
			this.game.context.fillRect(this.x/this.w, this.y/this.h, 1, 1);
		}
		else {
			for (var i = 0; i < this.sprites.length; i++) {
				var sprite = this.sprites[i];
				this.game.context.drawImage(this.game.graphics, sprite.srcx, sprite.srcy, sprite.w, sprite.h, this.x - this.game.viewport.x, this.y - this.game.viewport.y - (sprite.h - 8), sprite.w, sprite.h);
			}
		}
	}
}