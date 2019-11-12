function Map() {
	var tileSize = 32;
	var mapSize = 128;
	var WATER = 0;
	var SAND = 1;
	var GRASS = 2;
	var TREE = 3;
	var TREASURE = 33;
		
	this.data = [];
	this.frame = 0;
	this.lastChange = 0;
	this.game;

	for (var i = 0; i < mapSize; i++) {
		this.data.push([]);
		for (var j = 0; j < mapSize; j++) {
			this.data[i].push(new Tile());
		}
	}
	
	this.link = function(game) {
		this.game = game;
		for (var i = 0; i < this.data.length; i++) {
			for (var j = 0; j < this.data[i].length; j++) {
				this.data[i][j].link(game);
			}
		}
	}

	this.getTileAtIndex = function(i, j) {
		if (i < 0 || i >= this.data.length || j < 0 || j >= this.data[0].length) {
			return false;
		}
		return this.data[i][j];
	}
	
	this.getTileAt = function(x, y) {
		var xIndex = Math.floor(x / 32);
		var yIndex =  Math.floor(y / 32);
		if (xIndex >= 0 && yIndex >= 0 && xIndex < this.data[0].length && yIndex < this.data.length) {
			return (this.data[yIndex][xIndex]);
		}
		return (false);
	}
	
	this.getRenderData = function() {
		if (Date.now() - this.lastChange > 500) {
			this.frame++;
			if (this.frame > 1) {
				this.frame = 0;
			}
			this.lastChange = Date.now();
		}
		var startx = Math.floor(this.game.ws.player.viewPort.x/32)  - 1;
		var starty = Math.floor(this.game.ws.player.viewPort.y/32) - 1;
		var width = Math.floor(this.game.ws.player.viewPort.w/32) + 3;
		var height = Math.floor(this.game.ws.player.viewPort.h/32) + 4;
		
		var drawData = [];
		for (var i = starty; i < starty + height; i++) {
			for (var j = startx; j < startx + width; j++) {
				
				if (i > 0 && j > 0 && i < this.data.length && j < this.data[0].length) {
					var tile = this.data[i][j];
					drawData.push(tile);
				}
			}
		}
		return (drawData);
	}
	
	// Draw mini map
	this.renderMiniMap = function() {
		var offset = 50;
		var offsetY = 8;
		this.game.context.drawImage(this.game.graphics, 0, 200, 24, 24, offset, offsetY, 24, 24);
		this.game.context.drawImage(this.game.graphics, 48, 200, 24, 24, offset + 24 * 5, offsetY, 24, 24);
		this.game.context.drawImage(this.game.graphics, 0, 248, 24, 24, offset, offsetY + 24 * 5, 24, 24);
		this.game.context.drawImage(this.game.graphics, 48, 248, 24, 24, offset + 24 * 5, offsetY + 24 * 5, 24, 24);
		for (var i = 0; i < 4; i++) {
			this.game.context.drawImage(this.game.graphics, 0, 224, 24, 24, offset, offsetY + 24 + 24 * i, 24, 24);
			this.game.context.drawImage(this.game.graphics, 48, 224, 24, 24, offset + 24*5, offsetY + 24 + 24 * i, 24, 24);
			this.game.context.drawImage(this.game.graphics, 24, 200, 24, 24, offset + 24 + 24*i, offsetY, 24, 24);
			this.game.context.drawImage(this.game.graphics, 24, 248, 24, 24, offset + 24 + 24*i, offsetY + 24*5, 24, 24);
		}
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				this.game.context.drawImage(this.game.graphics, 24, 224, 24, 24, offset + 24 + 24 * i, offsetY + 24 + 24 * j, 24, 24);
			}
		}
		for (var i = 0; i < this.data.length; i++) {
			for (var j = 0; j < this.data[i].length; j++) {
				var tile = this.data[i][j];
				if (tile.discovered == 1) {
					if (tile.type == 1 || tile.type == 2) {
						this.game.context.fillStyle = "rgba(255, 255, 0, 1)";
					}
					else if (tile.type == 0) {
						this.game.context.fillStyle = "rgba(64, 128, 255, 1)";
					}
					else if (tile.type == 3) {
						this.game.context.fillStyle = "rgba(0, 255, 0, 1)";
					}
					else if (tile.type == 4) {
						this.game.context.fillStyle = "rgba(255, 255, 255, 1)";
					}
					this.game.context.fillRect(offset + 8 + tile.x/32, offsetY + 6 + tile.y/32, 1, 1);
				}
			}
		}
		this.game.context.fillStyle = "#FF0000";
		this.game.context.fillRect(offset + 8 + this.game.ws.player.x/32, offsetY + 8 + this.game.ws.player.y/32, 2, 2);
	}
	
	this.clean = function() {
		var zCounter = 0;
		for (var i = 0; i < this.data.length; i++) {
			for (var j = 0; j < this.data[i].length; j++) {
				var tile = this.data[i][j];
				tile.type = 0;
				tile.sprite = this.game.ws.sprites.water1;
				tile.x = j * tile.w;
				tile.y = i * tile.h;
				tile.z = zCounter;
				zCounter++;
			}
		}
	}
	
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
	
	this.getPlayerSpawn = function() {
		for (var count = 0; count < 2000; count++) {
			var randX = Math.floor(Math.random() * mapSize);
			var randY = Math.floor(Math.random() * mapSize);
			var tile = this.getTileAt(randX * tileSize, randY * tileSize);
			
			var spawnOk = true;
			for (var i = randY - 1; i < randY + 2; i++) {
				for (var j = randX - 1; j < randX + 2; j++) {
					var neighborTile = this.getTileAt(j * tileSize, i * tileSize);
					if (neighborTile.type == 0 || neighborTile.type == 3) {
						spawnOk = false;
					}
				}
			}
			if(spawnOk) {
				// flood fill spawn island and pick a bordering water to spawn the boat
				this.floodFill(randX, randY, [SAND, GRASS]);
				for (var i = 0; i < this.data.length; i++) {
					for (var j = 0; j < this.data[i].length; j++) {
						if (this.data[i][j].marked) {
							var n = this.getTileAtIndex(i-1, j);
							var s = this.getTileAtIndex(i+1, j);
							var w = this.getTileAtIndex(i, j-1);
							var e = this.getTileAtIndex(i, j+1);
							var neighbors = [n, s, w, e];
							for (var k = 0; k < neighbors.length; k++) {
								if (neighbors[k] != false && neighbors[k].type == WATER) {
									neighbors[k].type = 4;
									neighbors[k].sprites.push(this.game.ws.sprites.boat);
									return ([tile, neighbors[k]]);
								}
							}
						}
					}
				}
			}
		}
		return false;
	}
	
	this.newWorld = function() {
		// set all tiles to water or sand
		for (var i = 2; i < this.data.length - 2; i++) {
			for (var j = 2; j < this.data[i].length - 2; j++) {
				var tile = this.data[i][j];
				var dice = Math.floor(Math.random() * 100);
				if (dice < 27) {
					tile.type = SAND;
				}
				else {
					tile.type = WATER;
				}
			}
		}
		this.automate(0, 1, 1);
		
		for (var i = 0; i < this.data.length; i++) {
			for (var j = 0; j < this.data[i].length; j++) {
				var tile = this.data[i][j];
				if (tile.type == WATER) {
					tile.sprites.push(this.game.ws.sprites.waterSprites[Math.floor(Math.random() * this.game.ws.sprites.waterSprites.length)]);
				}
				else if (tile.type == SAND) {
					tile.sprites.push(this.game.ws.sprites.sandSprites[Math.floor(Math.random() * this.game.ws.sprites.sandSprites.length)]);
				}
			}
		}

		// create beaches on borders between sand and water
		for (var i = 0; i < this.data.length; i++) {
			for (var j = 0; j < this.data[i].length; j++) {
				var tile = this.data[i][j];
				// make our beaches
				if (tile.type == SAND) {
					var n, s, e, w;
					n = this.getTileAt(tile.x, tile.y - tile.h);
					s = this.getTileAt(tile.x, tile.y + tile.h);
					w = this.getTileAt(tile.x - tile.w, tile.y);
					e = this.getTileAt(tile.x + tile.w, tile.y);
					if (n != false && n.type == 0 && w != false && w.type == 0 && (s == false || s.type != 0) && (e == false || e.type != 0)) {
						tile.sprites.push(this.game.ws.sprites.beachNW);
						tile.subType = 1;
					}
					else if ((n == false || n.type != 0) && w !=false && w.type == 0 && (s == false || s.type != 0) && (e == false || e.type != 0)) {
						tile.sprites.push(this.game.ws.sprites.beachW);
						tile.subType = 1;
					}
					else if ((n == false || n.type != 0) && w != false && w.type == 0 && s != false && s.type == 0 && (e == false || e.type != 0)) {
						tile.sprites.push(this.game.ws.sprites.beachSW);
						tile.subType = 1;
					}
					else if (n != false && n.type == 0 && (w == false || w.type != 0) && (s == false || s.type != 0) && (e == false || e.type != 0)) {
						tile.sprites.push( this.game.ws.sprites.beachN);
						tile.subType = 1;
					}
					else if (s != false && s.type == 0 && (w == false || w.type != 0) && (n == false || n.type != 0) && (e == false || e.type != 0)) {
						tile.sprites.push(this.game.ws.sprites.beachS);
						tile.subType = 1;
					}
					else if (n != false && n.type == 0 && (w == false || w.type != 0) && (s == false || s.type != 0) && e != false && e.type == 0) {
						tile.sprites.push(this.game.ws.sprites.beachNE);
						tile.subType = 1;
					}
					else if ((n == false || n.type != 0) && (w == false || w.type != 0) && (s == false || s.type != 0) && e != false && e.type == 0) {
						tile.sprites.push(this.game.ws.sprites.beachE);
						tile.subType = 1;
					}
					else if ((n == false || n.type != 0) && (w == false || w.type != 0) && s != false && s.type == 0 && e != false && e.type == 0) {
						tile.sprites.push(this.game.ws.sprites.beachSE);
						tile.subType = 1;
					}
					else if (n != false && n.type == 0 && w != false && w.type == 0 && (s == false || s.type != 0) && e != false && e.type == 0) {
						tile.sprites.push(this.game.ws.sprites.beachNWE);
						tile.subType = 1;
					}
					else if (n != false && n.type == 0 && w != false && w.type == 0 && s != false && s.type == 0 && e != false && e.type == 0) {
						tile.sprites.push(this.game.ws.sprites.beachAll);
						tile.subType = 1;
					}
					else if ((n == false || n.type != 0) && w != false && w.type == 0 && s != false && s.type == 0 && e != false && e.type == 0) {
						tile.sprites.push(this.game.ws.sprites.beachSWE);
						tile.subType = 1;
					}
					else if (n != false && n.type == 0 && w != false && w.type == 0 && s != false && s.type == 0 && (e == false || e.type != 0)) {
						tile.sprites.push(this.game.ws.sprites.beachNSW);
						tile.subType = 1;
					}
					else if (n != false && n.type == 0 && e != false && e.type == 0 && s != false && s.type == 0 && (w == false || w.type != 0)) {
						tile.sprites.push(this.game.ws.sprites.beachNSE);
						tile.subType = 1;
					}
					else if (n != false && n.type == 0 && (e == false || e.type != 0) && s != false && s.type == 0 && (w == false || w.type != 0)) {
						tile.sprites.push(this.game.ws.sprites.beachNS);
					}
					else if (e != false && e.type == 0 && (n == false || n.type != 0) && w != false && w.type == 0 && (s == false || s.type != 0)) {
						tile.sprites.push(this.game.ws.sprites.beachEW);
					}
				}
			}
		}
		
		// make grass tiles on some non-costal sand tiles
		for (var i = 0; i < this.data.length; i++) {
			for (var j = 0; j < this.data[i].length; j++) {
				var tile = this.data[i][j];
				if (tile.type == SAND && tile.subType == 0) {
					var dice = Math.floor(Math.random() * 100);
					if (dice < 40) {
						tile.type = GRASS;
						tile.sprites.push(this.game.ws.sprites.grassSprites[Math.floor(Math.random() * this.game.ws.sprites.grassSprites.length)]);
					}
					else {
						tile.type = SAND;
					}
				}
			}
		}
		this.automate(1, 2, 2);
		
		// make trees on some grass tiles
		for (var i = 0; i < this.data.length; i++) {
			for (var j = 0; j < this.data[i].length; j++) {
				var tile = this.data[i][j];
				if (tile.type == GRASS) {
					var dice = Math.floor(Math.random() * 100);
					if (dice < 45) {
						tile.type = TREE;
						if (dice < 22) {
							tile.sprites.push(this.game.ws.sprites.tree1);
							if (i + 1 < this.data.length) {
								this.data[i + 1][j].sprites.push(this.game.ws.sprites.treeTop1);
							}
						}
						else {
							tile.sprites.push(this.game.ws.sprites.tree2);
							if (i + 1 < this.data.length) {
								this.data[i + 1][j].sprites.push(this.game.ws.sprites.treeTop2);
							}
						}
					}
					else {
						tile.type = GRASS;
					}
				}
			}
		}
	
		// check for unreachable areas
		var randX;
		var randY;
		while (1) {
			randX = Math.floor(Math.random() * this.data[0].length);
			randY = Math.floor(Math.random() * this.data.length);
			var startTile = this.data[randY][randX];
			var type = startTile.type;
			if (type == WATER || type == SAND || type == GRASS) {
				break;
			}
		}

		this.floodFill(randX, randY, [WATER, SAND, GRASS]);

		// check for any sand or grass
		// they are disjointed/unreachable
		// turn them into trees
		for (var i = 0; i < this.data.length; i++) {
			for (var j = 0; j < this.data[i].length; j++) {
				var tile = this.data[j][i];
				if (!tile.marked && (tile.type == 1 || tile.type == 2)) {
					tile.type = 3;
					var rand = Math.floor(Math.random() * 2);
					if (rand == 0) {
						tile.sprites.push(this.game.ws.sprites.tree1);
					}
					else {
						tile.sprites.push(this.game.ws.sprites.tree2);
					}
				}
			}
		}

		for (var i = 0; i < this.data.length; i++) {
			for (var j = 0; j < this.data[i].length; j++) {
				this.data[j][i].marked = 0;
			}
		}

		// make treasures
		var treasureCount = 0;
		for (var i = 0; i < 1000; i++) {
			randX = Math.floor(Math.random() * this.data[0].length);
			randY = Math.floor(Math.random() * this.data.length);
			var tile = this.data[randY][randX];
			if (tile.type == GRASS || tile.type == SAND) {
				tile.type = TREASURE;
				tile.sprites.push(this.game.ws.sprites.chest);
				treasureCount++;
			}
			if (treasureCount >= 200) {
				break;
			}
		}
		
	}

	this.floodFill = function(startX, startY, targetTypes) {
		if (startX >= 0 && startY >= 0 && startX < this.data[0].length && startY < this.data.length) {
			var startTile = this.data[startY][startX];
			var type = startTile.type;
			if (startTile.marked || targetTypes.indexOf(type) == -1) {
				return;
			}
			startTile.marked = true;
			//startTile.sprites = [];
			this.floodFill(startX, startY + 1, targetTypes);
			this.floodFill(startX, startY - 1, targetTypes);
			this.floodFill(startX + 1, startY, targetTypes);
			this.floodFill(startX - 1, startY, targetTypes);
			return;
		}
		else {
			return;
		}
	}
}
