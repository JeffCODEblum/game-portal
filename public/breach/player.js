
function Player() {
	this.w = PLAYER_W;
	this.h = PLAYER_H;
	this.x = 0;
	this.y = 0;
	this.speed = 1;
	this.vx = 0;
	this.vy = 0;
	this.game;
	this.state = 0;
	this.flip = 0;

	this.weapon = new Weapon(this);
	this.weapon.team = 0;
	this.team = 0;
	
	this.mapIsUp = false;
	this.lastMapChange = 0;

	this.frame = 0;
	this.lastFrameChange = 0;

	this.playerClass = PEASANT;
	this.lastStateChange = 0;
	
	this.hp = 100;
	this.energy = 100;
	this.lastHpChange = 0;
	this.lastEnergyChange = 0;
	this.atk = 25;

	this.link = function(game) {
		this.game = game;
		this.weapon.link(game);
		this.standCycle = [this.game.spriteSet.knight1,  this.game.spriteSet.knight2, this.game.spriteSet.knight3];
		this.walkCycle = [this.game.spriteSet.knight4, this.game.spriteSet.knight5];
		this.hurtCycle = [this.game.spriteSet.knight6];
		this.deadCycle = [this.game.spriteSet.knight7];
		this.animation = this.standCycle;
		this.setPlayerClass(KNIGHT);
	}

	this.damage = function(damage) {
		if (this.state == 4) return;
		this.state = 3;
		this.hp -= damage;
		if (this.hp <= 0) {
			//dead
			this.hp = 0;
			this.state = 4;
			this.lastStateChange = Date.now();
			this.animation = this.deadCycle;
			this.frame = 0;
		}
		this.lastHpChange = Date.now();
		this.lastStateChange = Date.now();
		this.game.viewport.shaker.shake(2, 1, 1);
	}

	this.setPlayerClass = function(newClass) {
		this.playerClass = newClass;
		if (this.playerClass == PEASANT) {
			this.standCycle = [this.game.spriteSet.knight1,  this.game.spriteSet.knight2, this.game.spriteSet.knight3];
			this.walkCycle = [this.game.spriteSet.knight4, this.game.spriteSet.knight5];
			this.animation = this.standCycle;
		}
		else if (this.playerClass == KNIGHT) {
			this.standCycle = [this.game.spriteSet.knight1,  this.game.spriteSet.knight2, this.game.spriteSet.knight3];
			this.walkCycle = [this.game.spriteSet.knight4, this.game.spriteSet.knight5];
			this.hurtCycle = [this.game.spriteSet.knight6];
			this.deadCycle = [this.game.spriteSet.knight7];
			this.animation = this.standCycle;
		}
		else if (this.playerClass == ARCHER) {
			this.standCycle = [this.game.spriteSet.archer1,  this.game.spriteSet.archer2, this.game.spriteSet.archer3];
			this.walkCycle = [this.game.spriteSet.archer4, this.game.spriteSet.archer5];
			this.hurtCycle = [this.game.spriteSet.archer6];
			this.deadCycle = [this.game.spriteSet.archer7];
			this.animation = this.standCycle;
		}
		else if (this.playerClass == WIZARD) {
			this.standCycle = [this.game.spriteSet.wizard1,  this.game.spriteSet.wizard2, this.game.spriteSet.wizard3];
			this.walkCycle = [this.game.spriteSet.wizard4, this.game.spriteSet.wizard5];
			this.hurtCycle = [this.game.spriteSet.wizard6];
			this.deadCycle = [this.game.spriteSet.wizard7];
			this.animation = this.standCycle;
		}
	}
	
	this.spawn = function() {
		this.state = 1;
		
		var tile = this.game.map.getBlueSpawn();
	
		
		this.x = tile.x;
		this.y = tile.y;
		this.z = tile.z + 1;
		this.vx = 0;
		this.vy = 0;
		this.frame = 0;
		this.animation = this.standCycle;
		this.mapIsUp = false;
		this.hp = 100;
		this.energy = 100;
		this.lastStateChange = Date.now();
		this.lastHpChange = Date.now();
		this.lastEnergyChange = Date.now();
		this.lastFrameChange = Date.now();
		this.lastClassChange = 0;
		this.game.viewport.spawn();
	}
	
	var top, btm, left, right, nw, ne, sw, se;
	this.update = function() {
		if (Date.now() - this.lastFrameChange > 400) {
			this.frame++;
			this.lastFrameChange = Date.now();
			if (this.frame == this.animation.length) {
				this.frame = 0;
			}
		}
		this.weapon.update();
		if (this.state == 1) {
			this.vx = 0;
			this.vy = 0;

			if (this.game.ctrl.j && Date.now() - this.lastClassChange > 200) {
				this.lastClassChange = Date.now();
				if (this.playerClass == KNIGHT) {
					this.setPlayerClass(ARCHER);
				}
				else if (this.playerClass == ARCHER) {
					this.setPlayerClass(WIZARD);
				}
				else if (this.playerClass == WIZARD) {
					this.setPlayerClass(KNIGHT);
				}
			}
			
			// map stuff
			if (this.game.ctrl.caps && Date.now() - this.lastMapChange > 200) {
				this.mapIsUp = !this.mapIsUp;
				this.lastMapChange = Date.now();
			}

			if (Date.now() - this.lastEnergyChange > 800 && this.energy < 100) {
				this.energy += 10;
				if (this.energy > 100) this.energy = 100;
				this.lastEnergyChange = Date.now();
			}

			if (Date.now() - this.lastHpChange > 800 && this.hp < 100) {
				this.hp += 5;
				if (this.hp > 100) this.hp = 100;
				this.lastHpChange = Date.now();
			}

			// attack stuff
			var aVX = 0;
			var aVY = 0;
			var willAttack = false;
			if (this.game.ctrl.up2) {
				aVY -= 1;
				willAttack = true;
			}
			if (this.game.ctrl.down2) {
				aVY += 1;
				willAttack = true;
			}
			if (this.game.ctrl.left2) {
				this.flip = 1;
				aVX -= 1;
				willAttack = true;
			}
			if (this.game.ctrl.right2) {
				this.flip = 0;
				aVX += 1;
				willAttack = true;
			}
			if (willAttack) {
				if (this.energy >= 5) {
					var success = this.weapon.attack(aVX, aVY);
					if (success) {
						this.energy -= 5;
						this.state = 2;
						this.lastStateChange = Date.now();
						this.lastEnergyChange = Date.now();
					}
				}
			}
	
			// move stuff
			if (this.game.ctrl.shift && this.energy >= 1) {
				this.energy--;
				if (this.energy < 0) {
					this.energy = 0;
				}
				this.lastEnergyChange = Date.now();
				this.speed = 2;
			}
			else {
				this.speed = 1;
			}
			if (this.game.ctrl.left) {
				this.vx = -this.speed;
			}
			if (this.game.ctrl.right) {
				this.vx = this.speed;
			}
			if (this.game.ctrl.up) {
				this.vy = -this.speed;
			}
			if (this.game.ctrl.down) {
				this.vy = this.speed;
			}
			
			if (this.vx != 0 || this.vy != 0) {
				this.animation = this.walkCycle;
			}
			else {
				this.animation = this.standCycle;
			}
			if (this.frame >= this.animation.length) {
				this.frame = 0;
			}
			this.move(this.vx, this.vy);
		}
		else if (this.state == 2) {
			if (Date.now() - this.lastStateChange >= 200) {
				this.state = 1;
				this.lastStateChange = Date.now();
			}

			if (this.playerClass == WIZARD) {
				// move stuff
			if (this.game.ctrl.shift) {
				this.speed = 2;
			}
			else {
				this.speed = 1;
			}
			if (this.game.ctrl.left) {
				this.vx = -this.speed;
			}
			if (this.game.ctrl.right) {
				this.vx = this.speed;
			}
			if (this.game.ctrl.up) {
				this.vy = -this.speed;
			}
			if (this.game.ctrl.down) {
				this.vy = this.speed;
			}
			
			if (this.vx != 0 || this.vy != 0) {
				this.animation = this.walkCycle;
			}
			else {
				this.animation = this.standCycle;
			}
			if (this.frame >= this.animation.length) {
				this.frame = 0;
			}
			this.move(this.vx, this.vy);
			}
		}
		// hurt
		else if (this.state == 3) {
			if (Date.now() - this.lastStateChange >= 50) {
				this.state = 1;
				this.lastStateChange = Date.now();
				this.animation = this.walkCycle;
			}
			this.animation = this.hurtCycle;
			this.frame = 0;
		}
		// dead
		else if (this.state == 4) {
			if (Date.now() - this.lastStateChange >= 4000) {
				// respawn
				this.spawn();
			}
		}
	}
	
	this.move = function(vx, vy) {
		if (vx == 0 && vy == 0) return true;
		var top = this.y + this.vy;
		var btm = this.y + this.h + this.vy;
		var left = this.x + this.vx;
		var right = this.x + this.w + this.vx;
		
		nw = this.game.map.getTileAt(left, top);
		ne = this.game.map.getTileAt(right, top);
		sw = this.game.map.getTileAt(left, btm);
		se = this.game.map.getTileAt(right, btm);

		var npc = this.game.npcManager.hitCheck(top, btm, left, right);
		var noMove = npc !=false || !nw || !ne || !sw || !se || nw.solid == 1 || ne.solid == 1 || sw.solid == 1 || se.solid == 1;
		if (!noMove) {
			this.x += this.vx;
			this.y += this.vy;
			this.z = se.z + 1;
			return true;
		}
		else {
			this.vx = 0;
			this.vy = 0;
			return false;
		}
	}

	this.hitCheck = function(top, bottom, left, right) {
		if (this.x + this.w > left && this.x < right && this.y + this.h > top && this.y < bottom) {
			return true;
		}
		return false;
	}
	
	this.draw = function() {
		if (this.mapIsUp) {
			this.game.context.fillStyle = 'rgb(0, 0, 255)';
			this.game.context.fillRect(this.x/8, this.y/8, 1, 1);
		}
		else {
			var sprite = this.animation[this.frame];
			if (this.flip == 0) {
				this.game.context.drawImage(this.game.graphics, sprite.srcx, sprite.srcy, sprite.w, sprite.h, this.x - this.game.viewport.x - 2, this.y - this.game.viewport.y - 5, sprite.w, sprite.h);
			}
			else if (this.flip == 1) {
				var shiftX = this.x - this.game.viewport.x;
				var shiftY = this.y - this.game.viewport.y;
				this.game.context.translate(shiftX, shiftY);
				this.game.context.scale(-1, 1);
				this.game.context.drawImage(this.game.graphics, sprite.srcx, sprite.srcy, sprite.w, sprite.h, -4, -5, sprite.w, sprite.h);
				this.game.context.scale(-1, 1);
				this.game.context.translate(-shiftX, -shiftY);
			}
		}
	}
}