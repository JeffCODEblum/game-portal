function NpcManager() {
	this.game;
	this.npcs = [];
	this.lastSpawn = 0;
	for (var i = 0; i < MAX_NPCS; i++) {
		this.npcs.push(new Npc());
	}

	this.doors = [];	
	var blueDoor = new Door();
	blueDoor.team = 0;
	this.doors.push(blueDoor);

	this.spawnInterval = 10000;
	this.lastSpawnIntervalChange = Date.now();
	
	this.link = function(game) {
		this.game = game;
		for (var i = 0; i < this.npcs.length; i++) {
			this.npcs[i].link(game);
		}
		for (var i = 0; i < this.doors.length; i++) {
			this.doors[i].link(game);
		}
	}
	
	this.setDoors = function() {
		for (var i = 0; i < this.doors.length; i++) {
			this.doors[i].set();
		}
	}
	
	this.update = function() {
		for (var i = 0; i < this.npcs.length; i++) {
			this.npcs[i].update();
		}
		for (var i = 0; i < this.doors.length; i++) {
			this.doors[i].update();
		}
		if (Date.now() - this.lastSpawn > this.spawnInterval) {
			this.spawnRand();
			this.lastSpawn = Date.now();
		}
		if (Date.now() - this.lastSpawnIntervalChange > 4000) {
			this.spawnInterval -= 100;
			this.lastSpawnIntervalChange = Date.now();
			if (this.spawnInterval < 4000) {
				this.spawnInterval = 4000;
			}
		}
	}
	
	this.spawnRand = function() {
		var tile = this.game.map.getRandWalkable();
		if (tile == false) {
			return;
		}
		if (this.spawn(tile.x, tile.y)) this.lastSpawn = Date.now();
	}
	
	this.spawn = function(x, y) {
		var npc;
		for (var i = 0; i < this.npcs.length; i++) {
			npc = this.npcs[i];
			if (npc.state == 0) {
				var tile;
				var success = false;
				while(!success) {
					tile = this.game.map.getRandWalkable();
					var dx = tile.x - this.game.player.x;
					var dy = tile.y - this.game.player.y;
					var dist = Math.sqrt(dx * dx + dy * dy);
					if (dist > 16 && dist < 64) {
						success = true;
					}
					var check = this.game.map.getBlueDoor();
					dx = tile.x - check.x;
					dy = tile.y - check.y;
					dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < 64) {
						success = true;
					}
				}
				
				npc.spawn(tile.x, tile.y);
				return true;
			}
		}
		return false;
	}
	
	this.getDrawData = function() {
		var data = [];
		var npc;
		for (var i = 0; i < this.npcs.length; i++) {
			npc = this.npcs[i];
			
			var inBound = (
				npc.state != 0 && 
				npc.x > this.game.viewport.x - npc.w && 
				npc.x < this.game.viewport.x + this.game.viewport.w && 
				npc.y > this.game.viewport.y - npc.h && 
				npc.y < this.game.viewport.y + this.game.viewport.h
			);
			if (inBound) {
				data.push(npc);
			}
		}
		return (data);
	}
	
	this.hitCheck = function(top, bottom, left, right) {
		var npc;
		for (var i = 0; i < this.npcs.length; i++) {
			npc = this.npcs[i];
			if (npc.state != 0 && npc.x + npc.w > left && npc.x < right && npc.y + npc.h > top && npc.y < bottom) {
				return npc;
			}
		}
		return false;
	}
}

function Npc() {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.vx = 0;
	this.vy = 0;
	this.speed = 1;
	this.w = PLAYER_W;
	this.h = PLAYER_H;
	this.state = 0;
	this.game;
	this.frame = 0;
	this.lastFrameChange = 0;
	this.weapon = new Weapon(this);
	this.weapon.team = 2;
	this.team = 2;
	this.weapon.team = 2;
	this.hp = 100;
	this.atk = 10;

	this.ai = new GoblinAI(this);
	
	this.link = function(game) {
		this.weapon.link(game);
		this.game = game;
		this.standCycle = [this.game.spriteSet.goblin1, this.game.spriteSet.goblin2, this.game.spriteSet.goblin3];
		this.walkCycle = [this.game.spriteSet.goblin4, this.game.spriteSet.goblin5];
		this.hurtCycle = [this.game.spriteSet.goblin6];
		this.deadCycle = [this.game.spriteSet.goblin7];
		this.animation = this.standCycle;
	}
	
	this.spawn = function(x, y) {
		this.x = x;
		this.y = y;
		this.z = 0;
		this.vx = 0;
		this.vy = 0;
		this.state = 1;
		this.hp = 100;
		this.state = 2;
		this.frame = 0;
		this.lastStateChange = Date.now();
	}

	this.damage = function(damage) {
		if (this.state != 0 && this.state !== 3) {;
			this.animation = this.hurtCycle;
			this.state = 2;
			this.frame = 0;
			this.ai.state = 4;
			this.lastStateChange = Date.now();
			this.hp -= damage;
			if (this.hp <= 0) {
				this.state = 3;
				this.lastStateChange = Date.now();
				this.weapon.reset();
			}
		}
	}
	
	this.update = function() {
		if (this.state == 1) {
			if (Date.now() - this.lastFrameChange > 200) {
				this.lastFrameChange = Date.now();
				this.frame++;
			}

			this.animation = this.standCycle;
			if (this.frame >= this.animation.length) {
				this.frame = 0;
			}

			this.ai.update();

			var tile = this.game.map.getTileAt(this.x + this.w, this.y + this.h);
			if (tile != false) {
				this.z = tile.z + 1;
			}
			if (!this.move(this.vx, this.vy)) {
				this.ai.bump();
			}
		}
		// hurt
		else if (this.state == 2) {
			if (Date.now() - this.lastStateChange > 50) {
				this.state = 1;
				this.animation = this.standCycle;
				this.frame = 0;
			}
		}
		// dead
		else if (this.state == 3) {
			this.animation = this.deadCycle;
			this.weapon.state = 0;
			this.frame = 0;
			if (Date.now() - this.lastStateChange > 800) {
				this.state = 0;
				this.lastStateChange = Date.now();
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

		var hitPlayer = this.game.player.hitCheck(top, btm, left, right);

		var npc = this.game.npcManager.hitCheck(top, btm, left, right);
		if (npc == this) npc = false;
		var noMove = hitPlayer != false || npc !=false || !nw || !ne || !sw || !se || nw.solid == 1 || ne.solid == 1 || sw.solid == 1 || se.solid == 1;
		if (!noMove) {
			this.animation = this.walkCycle;
			if (this.frame >= this.animation.length) {
				this.frame = 0;
			}

			this.x += this.vx;
			this.y += this.vy;
			this.z = se.z + 1;
			return true;
		}
		else {
			return false;
		}
	}
	
	this.draw = function() {
		var sprite = this.animation[this.frame];
		this.game.context.drawImage(this.game.graphics, sprite.srcx, sprite.srcy, sprite.w, sprite.h, this.x - this.game.viewport.x - 2, this.y - this.game.viewport.y - 5, sprite.w, sprite.h);
	}
}

function GoblinAI (body) {
	this.state = 0;
	this.lastStateChange = 0;
	this.body = body;

	this.update = function() {
		this.body.weapon.update();
		if (this.state == 0) {
			this.state = 1 + Math.floor(Math.random() * 2);
			this.lastStateChange = Date.now();
		}
		else if (this.state == 1) {
			this.body.vx = 0;
			this.body.vy = 0;
			var player = this.body.game.player;
			var dx = player.x - this.x;
			var dy = player.y - this.y;
			var distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < 24) {
				this.state = 4;
			}

			var door = this.body.game.map.getBlueDoor();
			dx = (door.x + door.w/2) - (this.body.x + this.body.w/2);
			dy = door.y - this.body.y;
			distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < 100) {
				this.state = 6;
			}
			
			if (Date.now() - this.lastStateChange > 1000) {
				this.state = 1;
				this.lastStateChange = Date.now();
			}

			if (Date.now() - this.lastStateChange > 1000) {
				this.state = 0;
				this.lastStateChange = Date.now();
			}
		}
		// random direction
		else if (this.state == 2) {
			this.body.vx = Math.floor(Math.random() * 3) - 1;
			this.body.vy = Math.floor(Math.random() * 3) - 1;
			this.body.vx *= this.body.speed;
			this.body.vy *= this.body.speed;
			this.state = 3;
			this.lastStateChange = Date.now();
		}
		// walking now
		else if (this.state == 3) {
			var player = this.body.game.player;
			var dx = (player.x + player.w/2) - (this.body.x + this.body.w/2);
			var dy = player.y - this.body.y;
			var distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < 24) {
				this.state = 4;
			}
			var door = this.body.game.map.getBlueDoor();
			var dx = (door.x + door.w/2) - (this.body.x + this.body.w/2);
			var dy = door.y - this.body.y;
			var distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < 100) {
				this.state = 6;
			}
			
			if (Date.now() - this.lastStateChange > 1000) {
				this.state = 1;
				this.lastStateChange = Date.now();
			}
		}
		// chasing player now
		else if (this.state == 4) {
			var player = this.body.game.player;
			var dx = (player.x + player.w/2) - (this.body.x + this.body.w/2);
			var dy = player.y - this.body.y;
			var distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < 24) {
				if (player.x > this.body.x) {
					this.body.vx = this.body.speed;
				}
				else if (player.x < this.body.x) {
					this.body.vx = -this.body.speed;
				}
				if (player.y > this.body.y) {
					this.body.vy = this.body.speed;
				}
				else if (player.y < this.body.y) {
					this.body.vy = -this.body.speed;
				}
			}
			if (distance < 10) {
				this.body.weapon.attack(this.body.vx, this.body.vy);
				this.state = 5;
				
			}
			else if (distance > 58) {
				this.state = 2;
				this.lastStateChange = Date.now();
			}
		}
		// attacking now
		else if (this.state == 5) {
			this.body.vx = 0;
			this.body.vy = 0;
			if (Date.now() - this.lastStateChange > 200) {
				this.lastStateChange = Date.now();
				this.state = 2;
			}
		}
		// chasing door now
		else if (this.state == 6) {
			var door = this.body.game.map.getBlueDoor();
			var dx = (door.x) - (this.body.x + this.body.w/2);
			var dy = door.y - this.body.y;
			var distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < 100) {
				if (door.x > this.body.x) {
					this.body.vx = this.body.speed;
				}
				else if (door.x < this.body.x) {
					this.body.vx = -this.body.speed;
				}
				if (door.y > this.body.y) {
					this.body.vy = this.body.speed;
				}
				else if (door.y < this.body.y) {
					this.body.vy = -this.body.speed;
				}
			}
			if (distance < 10) {
				this.body.weapon.attack(this.body.vx, this.body.vy);
				this.state = 5;
				this.lastStateChange = Date.now();
			}
			if (distance > 100) {
				this.state = 0;
				this.lastStateChange = Date.now();
			}
		}
	}

	this.bump = function() {
		if (this.state != 4) {
			this.state = 2;
		}
	}
}

function Door() {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.w = 13;
	this.h = 10;
	this.team = 0;
	this.hp = 0;
	this.state = 0;
	this.lastStateChange = 0;
	this.game;
	this.sprite;
	this.hp = 1000;


	this.link = function(game) {
		this.game = game;
		this.sprite = this.game.spriteSet.door;
	}

	this.set = function() {
		if (this.team == 0) {
			var tile = this.game.map.getBlueDoor();
			this.x = tile.x + 1;
			this.y = tile.y - 2;
			this.z = tile.z + 1;
		}
	}
	
	this.damage = function(dmg) {
		this.state = 2;
		this.lastStateChange = Date.now();
		this.hp -= dmg;
		if (this.hp <= 0) {
			this.hp = 0;
			this.state = 3;
			this.sprite = this.game.spriteSet.doorway;
			this.game.player.state = 7;
			this.state = 3;
		}
	}

	this.update = function() {
		if (this.state == 2) {
			if (Date.now() - this.lastStateChange > 50) {
				this.state = 0;
				this.lastStateChange = Date.now();
			}
		}
	}
	
	this.draw = function() {
		if (this.state == 2 || this.state == 3) {
			this.game.context.drawImage(this.game.graphics, this.sprite.srcx, this.sprite.srcy, this.sprite.w, this.sprite.h, this.x - this.game.viewport.x, this.y - this.game.viewport.y, this.sprite.w, this.sprite.h);
		}
	}
}