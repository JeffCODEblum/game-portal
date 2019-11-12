function Weapon(owner) {
	this.state = 0;
	this.lastStateChange = 0;
	this.game;
	this.owner = owner;
	this.team;
	this.projectiles = [];
	for (var i = 0; i < 4; i++) {
		var projectile = new Projectile();
		this.projectiles.push(projectile);
	}

	this.link = function(game) {
		this.game = game;
		for (var i = 0;i < this.projectiles.length; i++) {
			this.projectiles[i].link(game, this.owner);
			this.projectiles[i].team = this.team;
		}
	}

	this.reset = function() {
		for (var i = 0;i < this.projectiles.length; i++) {
			this.projectiles[i].state = 0;
		}
	}

	this.update = function() {
		for (var i = 0; i < this.projectiles.length; i++) {
			this.projectiles[i].update();
		}
		if (this.state == 1) {
			if (Date.now() - this.lastStateChange > 400) {
				this.state = 0;
			}
		}
	}

	this.attack = function(x, y) {
		if (x == 0 && y == 0) return false;
		if (this.state == 0) {
			this.state = 1;
			this.lastStateChange = Date.now();
			for (var i = 0; i < this.projectiles.length; i++) {
				if (this.projectiles[i].state == 0) {
					this.projectiles[i].activate(x, y);
					return true;
				}
			}
		}
	}
}

function Projectile() {
	this.x = 0;
	this.y = 0;
	this.w = 8;
	this.h = 8;
	this.vx = 0;
	this.vy = 0;
	this.state = 0;
	this.lastStateChange = 0;
	this.direction = 0;
	this.game;
	this.sprite;
	this.owner;

	this.link = function(game, owner) {
		this.game = game;
		this.sprite = this.game.spriteSet.slash1;
		this.owner = owner;
	}

	this.activate = function(x, y) {
		this.vx = x;
		this.vy = y;
		
		if (this.owner.playerClass == ARCHER) {
			if (x > 0 && y == 0) {
				this.sprite = this.game.spriteSet.arrow3;
				this.x = this.owner.x + 6;
				this.y = this.owner.y;
			}
			else if (x > 0 && y > 0) {
				this.sprite = this.game.spriteSet.arrow4;
				this.x = this.owner.x + 4;
				this.y = this.owner.y + 4;
			}
			else if (x == 0 && y > 0) {
				this.sprite = this.game.spriteSet.arrow1;
				this.x = this.owner.x;
				this.y = this.owner.y + 6;
			}
			else if (x < 0 && y > 0) {
				this.sprite = this.game.spriteSet.arrow2;
				this.x = this.owner.x - 4;
				this.y = this.owner.y + 4;
			}
			else if (x < 0 && y == 0) {
				this.sprite = this.game.spriteSet.arrow3;
				this.x = this.owner.x - 6;
				this.y = this.owner.y;			
			}
			else if (x < 0 && y < 0) {
				this.sprite = this.game.spriteSet.arrow4;
				this.x = this.owner.x - 4;
				this.y = this.owner.y - 4;
			}
			else if (x == 0 && y < 0) {
				this.sprite = this.game.spriteSet.arrow1;
				this.x = this.owner.x;
				this.y = this.owner.y - 6;
			}
			else if (x > 0 && y < 0) {
				this.sprite = this.game.spriteSet.arrow2;
				this.x = this.owner.x + 4;
				this.y = this.owner.y - 4;
			}
		}
		else if (this.owner.playerClass == WIZARD) {
			if (x > 0 && y == 0) {
				this.sprite = this.game.spriteSet.fire1;
				this.x = this.owner.x + 24;
				this.y = this.owner.y;
			}
			else if (x > 0 && y > 0) {
				this.sprite = this.game.spriteSet.fire1;
				this.x = this.owner.x + 20;
				this.y = this.owner.y + 20;
			}
			else if (x == 0 && y > 0) {
				this.sprite = this.game.spriteSet.fire1;
				this.x = this.owner.x;
				this.y = this.owner.y + 24;
			}
			else if (x < 0 && y > 0) {
				this.sprite = this.game.spriteSet.fire1;
				this.x = this.owner.x - 20;
				this.y = this.owner.y + 20;
			}
			else if (x < 0 && y == 0) {
				this.sprite = this.game.spriteSet.fire1;
				this.x = this.owner.x - 24;
				this.y = this.owner.y;			
			}
			else if (x < 0 && y < 0) {
				this.sprite = this.game.spriteSet.fire1;
				this.x = this.owner.x - 20;
				this.y = this.owner.y - 20;
			}
			else if (x == 0 && y < 0) {
				this.sprite = this.game.spriteSet.fire1;
				this.x = this.owner.x;
				this.y = this.owner.y - 24;
			}
			else if (x > 0 && y < 0) {
				this.sprite = this.game.spriteSet.fire1;
				this.x = this.owner.x + 20;
				this.y = this.owner.y - 20;
			}
		}
		else {
			if (x > 0 && y == 0) {
				this.sprite = this.game.spriteSet.slash1;
				this.x = this.owner.x + 6;
				this.y = this.owner.y;
			}
			else if (x > 0 && y > 0) {
				this.sprite = this.game.spriteSet.slash2;
				this.x = this.owner.x + 4;
				this.y = this.owner.y + 4;
			}
			else if (x == 0 && y > 0) {
				this.sprite = this.game.spriteSet.slash3;
				this.x = this.owner.x;
				this.y = this.owner.y + 6;
			}
			else if (x < 0 && y > 0) {
				this.sprite = this.game.spriteSet.slash4;
				this.x = this.owner.x - 4;
				this.y = this.owner.y + 4;
			}
			else if (x < 0 && y == 0) {
				this.sprite = this.game.spriteSet.slash5;
				this.x = this.owner.x - 6;
				this.y = this.owner.y;			
			}
			else if (x < 0 && y < 0) {
				this.sprite = this.game.spriteSet.slash6;
				this.x = this.owner.x - 4;
				this.y = this.owner.y - 4;
			}
			else if (x == 0 && y < 0) {
				this.sprite = this.game.spriteSet.slash7;
				this.x = this.owner.x;
				this.y = this.owner.y - 6;
			}
			else if (x > 0 && y < 0) {
				this.sprite = this.game.spriteSet.slash8;
				this.x = this.owner.x + 4;
				this.y = this.owner.y - 4;
			}
		}
		this.state = 1;
		this.lastStateChange = Date.now();
	}

	this.update = function() {
		if (this.state == 1) {
			if (this.owner.playerClass != ARCHER) {
				if (Date.now() - this.lastStateChange > 200) {
					this.state = 0;
					this.lastStateChange = Date.now();
					return;
				}
			}

			if (this.owner.playerClass == ARCHER) {
				this.x += this.vx * 4;
				this.y += this.vy * 4;
			
				if (this.x < 0 || this.x > MAP_W * TILE_W || this.y < 0 || this.y > MAP_H * TILE_H) {
					this.state = 0;
				}
				var tile = this.game.map.getTileAt(this.x + 4, this.y + 4);
				if (tile == false) {
					this.state = 0;
					return;
				}
				if (tile.solid == 1) {
					this.state = 0;
					return;
				}
			}

			// hit check with player and all npcs
			var checkArray = [];
			checkArray.push(this.game.player);
			checkArray.push(this.game.npcManager.doors[0])
			for (var i = 0; i < this.game.npcManager.npcs.length; i++) {
				checkArray.push(this.game.npcManager.npcs[i]);
			}
			
			for (var i = 0; i < checkArray.length; i++) {
				var thing = checkArray[i];
				if (this.x + 8 > thing.x && this.x < thing.x + 8 && this.y + 8 > thing.y && this.y < thing.y + 8) {
					// a hit
					if (thing != this.owner && this.team != thing.team) {
						thing.damage(this.owner.atk);
						this.state = 2;
						this.lastStateChange = Date.now();
					}
				}
			}
		}
		else if (this.state == 2) {
			if (Date.now() - this.lastStateChange > 50) {
				this.state = 0;
				this.lastStateChange = Date.now();
				return;
			}
		}
	}

	this.draw = function() {
		if (this.state ==1) {
			var sprite = this.sprite;
			this.game.context.drawImage(this.game.graphics, sprite.srcx, sprite.srcy, sprite.w, sprite.h, this.x - this.game.viewport.x - 2, this.y - this.game.viewport.y - 5, sprite.w, sprite.h);
		}
	}
}