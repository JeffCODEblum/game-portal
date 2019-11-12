function ItemManager() {
	this.items = [];
	var item;
	this.eggCount = 0;
	this.legCount = 0;
	this.beerCount = 0;
	this.shineCount = 0;
	for (var i = 0; i < MAX_ITEMS; i++) {
		item = new Item();
		this.items.push(item);
	}
	
	this.init = function(player, map, chickenManager) {
		this.map = map;
		this.player = player;
		for (var i = 0; i < this.items.length; i++) {
			this.items[i].init(player, map, chickenManager, this);
		}
	}
	
	this.reset = function() {
		for (var i = 0; i < this.items.length; i++) {
			this.items[i].reset();
		}
		this.eggCount = 0;
		this.legCount = 0;
		this.beerCount = 0;
		this.shineCount = 0;
	}
	
	var tile;
	this.spawn = function(x, y, type) {
		if (type == EGG) {
			if (this.eggCount < MAX_EGGS) {
				for (var i = 0; i < this.items.length; i++) {
					item = this.items[i];
					if (item.status == 0) {
						this.setType(item, type);
						item.status = 1;
						item.x = x;
						item.y = y;
						tile = this.map.getTileAt(x + item.w, y + item.h);
						item.z = tile.z + 1;
						item.spawn = Date.now();
						this.eggCount++;
						return true;
					}
				}
				return false;
			}
			else {
				return false;
			}
		}
		else if (type == LEG) {
			if (this.legCount < MAX_LEGS) {
				for (var i = 0; i < this.items.length; i++) {
					item = this.items[i];
					if (item.status == 0) {
						this.setType(item, type);
						item.status = 1;
						item.x = x;
						item.y = y;
						tile = this.map.getTileAt(x + item.w, y + item.h);
						item.z = tile.z + 1;
						item.spawn = Date.now();
						this.legCount++;
						return true;
					}
				}
				return false;
			}
			else {
				return false;
			}
		}
		else if (type == BEER) {
			if (this.beerCount < MAX_BEERS) {
				for (var i = 0; i < this.items.length; i++) {
					item = this.items[i];
					if (item.status == 0) {
						this.setType(item, type);
						item.status = 1;
						item.x = x;
						item.y = y;
						tile = this.map.getTileAt(x + item.w, y + item.h);
						item.z = tile.z + 1;
						item.spawn = Date.now();
						this.beerCount++;
						return true;
					}
				}
				return false;
			}
			else {
				return false;
			}
		}
		else if (type == SHINE) {
			if (this.shineCount < MAX_SHINE) {
				for (var i = 0; i < this.items.length; i++) {
					item = this.items[i];
					if (item.status == 0) {
						this.setType(item, type);
						item.status = 1;
						item.x = x;
						item.y = y;
						tile = this.map.getTileAt(x + item.w, y + item.h);
						item.z = tile.z + 1;
						item.spawn = Date.now();
						this.shineCount++;
						return true;
					}
				}
				return false;
			}
			else {
				return false;
			}
		}
		else {
			for (var i = 0; i < this.items.length; i++) {
				item = this.items[i];
				if (item.status == 0) {
					this.setType(item, type);
					item.status = 1;
					item.x = x;
					item.y = y;
					tile = this.map.getTileAt(x + item.w, y + item.h);
					item.z = tile.z + 1;
					item.spawn = Date.now();
					return true;
				}
			}
			return false;
		}
	}
	
	this.update = function() {
		for (var i = 0; i < this.items.length; i++) {
			if (this.items[i].status != 0) {
				this.items[i].update();
			}
		}
	}
	
	this.drop = function() {
		for (var i = 0; i < this.items.length; i++) {
			item = this.items[i];
			if (item.status == 2) {
				item.status = 1;
				item.y += 4;
			}
		}
	}
	
	var dx, dy, hyp, diff;
	this.hitCheck = function(x, y) {
		for (var i = 0; i < this.items.length; i++) {
			item = this.items[i];
			if (x > item.x && x < item.x + item.w && y > item.y && y < item.y + item.h) {
				dx = this.player.worldx - (item.x + item.w/2);
				dy = this.player.worldy - (item.y + item.h/2);
				diff = dx * dx - dy * dy;
				if (diff < 0) diff *=  -1;
				hyp = Math.sqrt(diff);
				if (hyp < 16) {
					//item.status = 2;
					return item;
				}
			}
		}
		return false;
	}
	
	this.setType = function(item, type) {
		if (type == GUN) {
			item.type = 11;
			item.srcx = 0;
			item.srcy = 100;
			item.w = 16;
			item.h = 5;
		}
		else if (type == HAMMER) {
			item.type = 12;
			item.srcx = 0;
			item.srcy = 106;
			item.w = 8;
			item.h = 6;
		}
		else if (type == EGG) {
			item.type = 13;
			item.srcx = 0;
			item.srcy = 113;
			item.w = 4;
			item.h = 4;
		}
		else if (type == LEG) {
			item.type = 18;
			item.srcx = 0;
			item.srcy = 130;
			item.w = 7;
			item.h = 6;
		}
		else if (type == BEER) {
			item.type = 19;
			item.srcx = 31;
			item.srcy = 231;
			item.w = 8;
			item.h = 8;
		}
		else if (type == SHINE) {
			item.type = 20;
			item.srcx = 15;
			item.srcy = 140;
			item.w = 8;
			item.h = 8;
		}
	}
}

function Item() {
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.z = 0;
	this.srcx = 0;
	this.srcy = 0;
	this.type = 0;
	this.face = 0;
	this.status = 0;
	this.spawn = 0;
	
	this.init =  function(player, map, chickenHandler, itemManager) {
		this.player = player;
		this.map = map;
		this.chickenHandler = chickenHandler;
		this.itemManager = itemManager;
	}
	
	this.reset = function() {
		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.h = 0;
		this.z = 0;
		this.srcx = 0;
		this.srcy = 0;
		this.type = 0;
		this.face = 0;
		this.status = 0;
		this.spawn = 0
	}
	
	var hatch;
	this.update = function() {
		if (this.status == 1) {
			
			tile = this.map.getTileAt(this.x + this.w, this.y + this.h);
			this.z = tile.z + 1;
			
			if (this.type == EGG) {
				if (Date.now() - this.spawn > 4000) {
					var rand = Math.floor(Math.random() * 100);
					if (rand < 35) {
						//document.getElementById('crackSound').play();
						hatch = this.chickenHandler.spawn(this.x, this.y);
						if (hatch == 1) {
							this.status = 0;
							this.itemManager.eggCount--;
						}
					}
					this.spawn = Date.now();
				}
			}
		}
		else if (this.status == 2) {
			this.face = this.player.face;
			if (this.face == 0) {
				this.x = this.player.worldx - 5;
				this.y = this.player.worldy - 3;
			}
			else if (this.face == 1) {
				this.x = this.player.worldx - 9;
				this.y = this.player.worldy - 3
			}
			if (this.type == BEER || this.type == SHINE) {
				this.y -= 2;
			}
			if (this.player.special == 1) {
				this.y -= 2;
			}
			this.z = this.player.z + 1;
		}
	}
}