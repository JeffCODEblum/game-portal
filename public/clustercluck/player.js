function Player() {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.w = PLAYER_W;
	this.h = PLAYER_H;
	
	this.srcx = 0;
	this.srcy = 0;
	
	this.worldx = 0;
	this.worldy = 0;
	
	this.speed = 1;
	
	this.vx = 0;
	this.vy = 0;
	
	this.hp = 4;
	this.food = 4;
	this.ammo = 8;
	
	this.lastShot = 0;
	this.lastFoodDecrease = 0;
	this.lastDeath = 0;
		
	var standSeq = [0, 1, 2];
	var walkSeq = [3, 4, 5, 6];
	var frame = 0;
	var frame16 = 0;
	var frame8 = 0;
	this.status = 0;
	this.face = 0;
	this.holding = false;
	this.money = 0;
	this.totalEarned = 0;
	
	this.special = 0;
	
	this.gun = new Gun();
	
	this.init = function(ctrl, background, map, itemManager, foxManager, chickenManager, hud) {
		this.ctrl = ctrl;
		this.background = background;
		this.map = map;
		this.itemManager = itemManager;
		this.hud = hud;
		this.gun.init(foxManager, chickenManager, itemManager);
	}
	
	this.reset = function() {
		this.status = 1;
		this.vx = 0;
		this.vy = 0;
		this.hp = 4;
		this.food = 4;
		this.ammo = 8;
		this.face = 0;
		this.holding = false;
		this.money = 0;
		this.totalEarned = 0;
		this.lastFoodDecrease = Date.now();
		//this.special = 0;
	}
	
	this.spawn = function(x, y) {
		this.x = CANVAS_W/2;
		this.y = CANVAS_H/2;
		this.status = 1;
		this.vx = 0;
		this.vy = 0;
		this.hp = 4;
		this.food = 4;
		this.ammo = 8;
		this.face = 0;
		this.holding = false;
		this.money = 0;
		this.totalEarned = 0;
		this.lastFoodDecrease = Date.now();
		
		this.special = 0;
		
		this.worldx = x;
		this.worldy = y;
	}
	
	var dx, dy, hyp, theta, success;
	this.click = function(ex, ey) {
		var clickx = this.worldx - CANVAS_W/2 + ex;
		var clicky = this.worldy - CANVAS_H/2 + ey;
		
		if (ex > 74 && ex < 90 && ey > 71 && ey <80) {
			this.status = 3;
			return;
		}
		
		if (this.status == 4 && Date.now() - this.lastDeath > 1000) {
			this.status = 5;
		}
		
		if (this.status == 3) {
			if (ex > 80 && ex < 85 && ey > 24 && ey < 28) {
				this.status = 1;
			}
			else if (ex >33 && ex < 40 && ey > 30 && ey < 37) {
				if (this.money >= 1) {
					// buy egg
					success = this.itemManager.spawn(this.worldx, this.worldy, EGG);
					if (success == true) {
						this.status = 1;
						this.money -= 1;
					}
					else {
						// maxed out already
						this.hud.message2 = 3;
						this.hud.time = Date.now();
					}
				}
				else {
					// not enough money
					this.hud.message2 = 1;
					this.hud.time = Date.now();
				}
			}
			else if (ex >42 && ex < 50 && ey > 30 && ey < 37) {
				if (this.money >= 2) {
					success = this.itemManager.spawn(this.worldx, this.worldy, LEG);
					if (success == true) {
						this.status = 1;
						this.money -= 2;
					}
					else {
						// maxed out already
						this.hud.message2 = 3;
						this.hud.time = Date.now();
					}
				}
				else {
					// not enough money
					this.hud.message2 = 1;
					this.hud.time = Date.now();
				}
			}
			else if (ex >50 && ex < 59 && ey > 30 && ey < 37) {
				if (this.money >= 4) {
					if (this.ammo < 99) {
						this.ammo += 8;
						if (this.ammo > 99) {
							this.ammo = 99;
						}
						this.status = 1;
						this.money -= 4;
					}
					else {
						// maxed out already
						this.hud.message2 = 3;
						this.hud.time = Date.now();
					}
				}
				else {
					// not enough money;
					this.hud.message2 = 1;
					this.hud.time = Date.now();
				}
			}
			else if (ex > 62 && ex < 71 && ey > 30 && ey < 37) {
				if (this.money >= 4) {
					success = this.itemManager.spawn(this.worldx, this.worldy, BEER);
					if (success == true) {
						this.status = 1;
						this.money -= 4;
					}
					else {
						// maxed out already
						this.hud.message2 = 3;
						this.hud.time = Date.now();
					}
				}
				else {
					// not enough money
					this.hud.message2 = 1;
					this.hud.time = Date.now();
				}
			}
			else if (ex > 68 && ex < 76 && ey > 30 && ey < 37) {
				if (this.money >= 10) {
					success = this.itemManager.spawn(this.worldx, this.worldy, SHINE);
					if (success == true) {
						this.status = 1;
						this.money -= 10;
					}
					else {
						// maxed out already
						this.hud.message2 = 3;
						this.hud.time = Date.now();
					}
				}
				else {
					// not enough money
					this.hud.message2 = 1;
					this.hud.time = Date.now();
				}
			}
			
			else if (ex > 42 && ex < 49 && ey > 43 && ey < 50) {
				if (this.money >= 20) {
					this.status = 1;
					this.money -= 20;
					this.map.makeFence();
					this.background.setAll();
				}
				else {
					this.hud.message2 = 1;
					this.hud.time = Date.now();
				}
			}
			
			else if (ex > 51 && ex < 58 && ey > 43 && ey < 50) {
				if (this.money >= 50) {
					this.status = 1;
					this.makeStill();
					this.background.setAll();
					this.money -= 50;
				}
				else {
					this.hud.message2 = 1;
					this.hud.time = Date.now();
				}
			}
			
			else if (ex > 60 && ex < 67 && ey > 43 && ey < 50) {
				if (this.money >= 100) {
					this.status = 1;
					this.special = 1;
					this.money -= 100;
				}
				else {
					this.hud.message2 = 1;
					this.hud.time = Date.now();
				}
			}
			
			else if (ex >33 && ex < 40 && ey > 43 && ey < 50) {
				if (this.money >= 12) {
					if (this.ammo < 99) {
						this.ammo += 32;
						if (this.ammo > 99) {
							this.ammo = 99;
						}
						this.status = 1;
						this.money -= 12;
					}
					else {
						// maxed out already
						this.hud.message2 = 3;
						this.hud.time = Date.now();
					}
				}
				else {
					// not enough money;
					this.hud.message2 = 1;
					this.hud.time = Date.now();
				}
			}
		}
		
		if (this.holding == false) {
			var check = this.itemManager.hitCheck(clickx, clicky);
			if (check != false) {
				this.holding = check;
				check.status = 2;
			}
			else {
				this.holding = false;
			}
		}
		
		else if (this.holding.type == 11) {

			if (this.ammo > 0 && Date.now() - this.lastShot > 400) {
				dx = ex - CANVAS_W/2;
				dy = ey - CANVAS_H/2;
				
				hyp = Math.sqrt(Math.abs(dx * dx - dy * dy));
				
				if (dx > 0 && dy <= 0) {
					theta = Math.atan(-dy / dx);
				}
				else if (dx <= 0 && dy <= 0) {
					theta = Math.atan(dx / dy) + Math.PI / 2;
				}
				else if (dx <= 0 && dy > 0) {
					theta = Math.atan(-dy / dx) + Math.PI;
				}
				else if (dx > 0 && dy > 0) {
					theta = Math.atan(dx / dy) + 3 * Math.PI/2;
				}
				var deg = theta * 180 / Math.PI;
			
				var vy = -Math.sin(theta) * 2;
				var vx = Math.cos(theta) * 2;
				
				this.lastShot = Date.now();
				this.gun.shoot(this.worldx, this.worldy, vx, vy);
				this.ammo--;
			}
			else {
				// no ammo
				this.hud.message = 6;
			}
		}
		else if (this.holding.type == 12) {
			map.hammer(clickx, clicky);
		}
		else if (this.holding.type == EGG) {
			document.getElementById('coinSound').play();
			this.money++;
			this.holding.status = 0;
			this.holding = false;
			this.itemManager.eggCount--;
			this.totalEarned++;
		}
		else if (this.holding.type == LEG) {
			document.getElementById('powerSound').play();
			this.food += 2;
			if (this.food > 4) {
				this.food = 4;
			}
			this.holding.status = 0;
			this.lastFoodDecrease = Date.now();
			this.itemManager.legCount--;
			this.holding = false;
		}
		else if (this.holding.type == BEER) {
			document.getElementById('powerSound').play();
			this.hp += 1;
			if (this.hp > 4) {
				this.hp = 4;
			}
			this.holding.status = 0;
			this.itemManager.beerCount--;
			this.holding = false;
		}
		else if (this.holding.type == SHINE) {
			document.getElementById('powerSound').play();
			this.hp += 4;
			if (this.hp > 4) {
				this.hp = 4;
			}
			this.holding.status = 0;
			this.itemManager.shineCount--;
			this.holding = false;
		}
	}
	
	this.makeStill = function() {
		var tile = this.map.getTileAt(13 * TILE_W, 7 * TILE_H);
		this.map.setTile(tile, 31);
		tile = this.map.getTileAt(12 * TILE_W, 7 * TILE_H);
		this.map.setTile(tile, 30);
		this.map.still = true;
	}
	
	
	//****************
	// UPDATE
	//****************
	var top, btm, left, right, nw, ne, sw, se;
	this.update = function() {
		frame++;
		if (frame % 8 == 0) {
			frame8++;
			if (frame8 >= 4) {
				frame8 = 0;
			}
		}
		
		if (frame >= 16) {
			frame = 0;
			frame16++;
			if (frame16 >= 3) {
				frame16 = 0;
			}
		}
		
		if (this.money > 999) {
			this.money = 999;
		}
		if (this.money < 0) {
			this.money = 0;
		}
		if (this.ammo > 99) {
			this.ammo = 99;
		}
		if (this.ammo < 0) {
			this.ammo = 0;
		}
		
		if (this.status == 1 || this.status == 2) {
			if (Date.now() - this.lastFoodDecrease > 12000) {
				if (this.food > 0) {
					this.food--;
				}
				else {
					document.getElementById('hurtSound2').play();
					this.hp--;
					this.hud.message2 = 2;
					this.hud.time = Date.now();
					if (this.hp <= 0) {
						this.hp = 0;
					}
				}
				this.lastFoodDecrease = Date.now();
			}
			
			this.gun.update();
			
			if (this.status == 1 && this.special == 0) {
				this.srcx = 12 * standSeq[frame16];
				this.srcy = 0;
			}
			else if (this.status == 2 && this.special == 0) {
				this.srcx = 12 * walkSeq[frame8];
				this.srcy = 0;
			}
			
			if (this.status == 1 && this.special == 1) {
				this.srcx = 16 * standSeq[frame16];
				this.srcy = 285;
			}
			else if (this.status == 2 && this.special == 1) {
				this.srcx = 16 * walkSeq[frame8];
				this.srcy = 285;
			}
			
			if (this.food > 0 && this.hud.message == 8) {
				this.hud.message = 0;
			}
			
			if (this.ctrl.drop) {
				this.itemManager.drop();
				this.holding = 0;
			}
			
			if (this.holding == 0 && (this.hud.message >= 1 && this.hud.message <= 6)) {
				this.hud.message = 0;
			}
			
			if (this.holding == 0) {
				var mx = this.worldx - CANVAS_W/2 + this.ctrl.pageX;
				var my = this.worldy - CANVAS_H/2 + this.ctrl.pageY;
				var item = this.itemManager.hitCheck(mx, my);
				if (item != false) {
					this.hud.message = 1;
				}
			}
			
			else if (this.holding.type == 11) {
				if (this.ammo > 0)this.hud.message = 5;
				else this.hud.message = 6;
			}
			else if (this.holding.type == 12) {
				// check for fence repair
				var mx = this.worldx - CANVAS_W/2 + this.ctrl.pageX;
				var my = this.worldy - CANVAS_H/2 + this.ctrl.pageY;
				var hole = this.map.hammerCheck(mx, my);
				if (hole == true) {
					this.hud.message = 9;
				}
				else {
					this.hud.message = 0;
				}
			}
			else if (this.holding.type == LEG) {
				this.hud.message = 2;
			}
			else if (this.holding.type == EGG) {
				this.hud.message = 3;
			}
			else if (this.holding.type == BEER) {
				this.hud.message = 4;
			}
			else if (this.holding.type == SHINE) {
				this.hud.message = 4;
			}
			
			this.vx = 0;
			this.vy = 0;
			
			this.background.scrollx = false;
			this.background.scrolly = false;
			
			this.status = 1;
			if (this.ctrl.left) {
				this.vx = -this.speed;
				this.status = 2;
			}
			if (this.ctrl.right) {
				this.vx = this.speed;
				this.status = 2;
			}
			if (this.ctrl.up) {
				this.vy = -this.speed;
				this.status = 2;
			}
			if (this.ctrl.down) {
				this.vy = this.speed;
				this.status = 2;
			}
			
			if (this.ctrl.pageX < CANVAS_W/2) {
				this.face = 1;
			}
			else {
				this.face = 0;
			}
			
			this.worldx += this.vx;
			this.worldy += this.vy;
			
			top = this.worldy + this.h - 4;
			btm = this.worldy + this.h  - 4;
			left = this.worldx - this.w/2 + 2;
			right = this.worldx + this.w/2 - 2;
			
			nw = this.map.getTileAt(left, top);
			ne = this.map.getTileAt(right, top);
			sw = this.map.getTileAt(left, btm);
			se = this.map.getTileAt(right, btm);
			
			var stand = this.map.getTileAt(this.worldx + this.w/2, this.worldy + this.h - 5);
			
			this.z = stand.z + 1;
			
			if (nw.walkable == 0 || ne.walkable == 0 || sw.walkable == 0 || se.walkable == 0) {
				this.worldx -= this.vx;
				this.worldy -= this.vy;
			}
			else {
				this.background.update(this.vx, this.vy);
			}
		}
	}
}