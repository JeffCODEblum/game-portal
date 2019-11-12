function Player() {
	this.x = 0;
	this.y = 0;
	this.w = 24;
	this.h = 16;
	this.speed = 2;
	this.state = 0;
	this.theta = 0;
	this.accel = 0.25;
	this.velocity = 0;
	this.maxVelocity = 2;
	
	this.state = 1;
	this.action = 0;
	this.lastStateChange = 0;
	this.frame = 0;
	this.lastFrameChange = 0;
	this.direction = 0;
		
	this.link = function(game) {
		this.game = game;
	}
	
	this.viewPort = {
		x: -document.getElementById("canvas").width/2,
		y: -document.getElementById("canvas").height/2,
		w: document.getElementById("canvas").width,
		h: document.getElementById("canvas").height
	};
	
	this.spawn = function(spawnTile) {
		this.x = spawnTile.x;
		this.y = spawnTile.y;
		this.viewPort.x = this.x - this.viewPort.w/2;
		this.viewPort.y = this.y - this.viewPort.h/2;
	}
	
	this.update = function() {
		
		if (Date.now() - this.lastFrameChange > 240) {
			if (this.action == 0) {
				this.frame++;
				if (this.frame >= 3) {
					this.frame = 0;
				}
			}
			else if (this.action == 1) {
				if (this.frame == 0) {
					this.frame = 3;
				}
				else {
					this.frame = 0;
				}
			}
			this.lastFrameChange = Date.now();
		}

		if (this.game.ctrl.k && Date.now() - this.lastStateChange > 500) {
			this.lastStateChange = Date.now();
			if (this.state == 0) {
				this.state = 2;
				return;
			}
			if (this.state == 1) {
				this.state = 3;
				return;
			}
			if (this.state == 2) {
				this.state = 0;
				return;
			}
			if (this.state == 3) {
				this.state = 1;
				return;
			}
		}
		
		if (this.game.ctrl.j && Date.now() - this.lastStateChange > 500) {
			var tile = this.game.ws.map.getTileAt(this.x, this.y);
			if (this.state == 1) {
				if (tile.type == 4) {
					this.state = 0;
					tile.type = 0;
					tile.sprites.splice(tile.sprites.length - 1, 1);
				}
			}
			else if (this.state == 0) {
				if (tile.type == 0) {
					this.state = 1;
					tile.type = 4;
					tile.sprites.push(this.game.ws.sprites.boat);
				}
			}
			this.lastStateChange = Date.now();
		}
		
		// Walk mechanics
		if (this.state == 1) {
			this.w = 18;
			this.h = 8;
			var vx = 0;
			var vy = 0;
			if (this.game.ctrl.up) {
				vy -= this.speed;
			}
			if (this.game.ctrl.down) {
				vy += this.speed;
			}
			if (this.game.ctrl.right) {
				vx -= this.speed;
			}
			if (this.game.ctrl.left) {
				vx += this.speed;
			}
			
			if (vy > 0 && vx == 0) {
				this.direction = 0;
			}
			if (vy > 0 && vx < 0) {
				this.direction = 1;
			}
			if (vy == 0 && vx < 0) {
				this.direction = 2;
			}
			if (vy < 0 && vx < 0) {
				this.direction = 3;
			}
			if (vy < 0 && vx == 0) {
				this.direction = 4;
			}
			if (vy < 0 && vx > 0) {
				this.direction = 5;
			}
			if (vy == 0 && vx > 0) {
				this.direction = 6;
			}
			if (vy > 0 && vx > 0) {
				this.direction = 7;
			}	
			
			var nw = this.game.ws.map.getTileAt(this.x + vx, this.y + vy);
			var ne = this.game.ws.map.getTileAt(this.x + vx + this.w, this.y + vy);
			var sw = this.game.ws.map.getTileAt(this.x + vx, this.y + this.h + vy);
			var se = this.game.ws.map.getTileAt(this.x + this.w + vx, this.y + this.h + vy);
			
			var tileCheckArray = [nw, ne, sw, se];
			var noMove = false;
			for (var i = 0; i < tileCheckArray.length; i++) {
				if (tileCheckArray[i] == false || tileCheckArray[i].type == 3 || tileCheckArray[i].type == 0) {
					noMove = true;
				}
			}
			
			if (noMove == false) {
				this.action = 1;
				this.x += vx;
				this.y += vy;
				this.viewPort.x += vx;
				this.viewPort.y += vy;
				this.z = se.z + 1;
			}
			if (vx == 0 && vy == 0) {
				this.action = 0;
			}
		}
		
		// Boat mechanics
		else if (this.state == 0) {
			this.w = 24;
			this.h = 16;
			if (this.game.ctrl.left) {
				this.theta += 0.1;// * Math.abs(this.velocity/this.maxVelocity);
			}
			if (this.game.ctrl.right) {
				this.theta -= 0.1;// * Math.abs(this.veloity/this.maxVelocity);
			}
			
			if (this.theta > Math.PI * 2) {
				this.theta -= Math.PI * 2;
			}
			if (this.theta < 0) {
				this.theta += Math.PI * 2;
			}
			
			if (this.theta < Math.PI/8 || this.theta > Math.PI * 15/8) {
				this.direction = 2;
			}
			if (this.theta > Math.PI/8 && this.theta < Math.PI * 3/8) {
				this.direction = 3;
			}
			if (this.theta > Math.PI * 3/8 && this.theta < Math.PI * 5/8) {
				this.direction = 4;
			}
			if (this.theta > Math.PI * 5/8 && this.theta < Math.PI * 7/8) {
				this.direction = 5;
			}
			if (this.theta > Math.PI * 7/8 && this.theta < Math.PI * 9/8) {
				this.direction = 6;
			}
			if (this.theta > Math.PI * 9/8 && this.theta < Math.PI * 11/8) {
				this.direction = 7;
			}
			if (this.theta > Math.PI * 11/8 && this.theta < Math.PI * 13/8) {
				this.direction = 0;
			}
			if (this.theta > Math.PI * 13/8 && this.theta < Math.PI * 15/8) {
				this.direction = 1;
			}
			
			if (this.game.ctrl.up) {
				this.velocity += this.accel;
				if (this.velocity > this.maxVelocity) {
					this.velocity = this.maxVelocity;
				}
			}
			/*
			if (this.game.ctrl.down) {
				this.velocity -= this.accel;
				if (this.velocity < -this.maxVelocity) {
					this.velocity = -this.maxVelocity;
				}
			}
			*/
			var vx = Math.floor(Math.cos(this.theta) * this.velocity);
			var vy = Math.floor(Math.sin(this.theta) * this.velocity);
			
			var nw = this.game.ws.map.getTileAt(this.x + vx, this.y + vy);
			var ne = this.game.ws.map.getTileAt(this.x + vx + this.w, this.y + vy);
			var sw = this.game.ws.map.getTileAt(this.x + vx, this.y + this.h + vy);
			var se = this.game.ws.map.getTileAt(this.x + this.w + vx, this.y + this.h + vy);
			
			var tileCheckArray = [nw, ne, sw, se];
			var noMove = false;
			for (var i = 0; i < tileCheckArray.length; i++) {
				if (tileCheckArray[i] != false && tileCheckArray[i].type != 0) {
					noMove = true;
				}
			}
			//noMove = false;
			if (!noMove) {
				this.x += vx;
				this.y += vy;
				this.z = se.z;
				
				this.viewPort.x += vx;
				this.viewPort.y += vy;
				
				this.velocity = this.velocity * 0.98;
				if (this.velocity < 0.05) {
					this.velocity = 0;
				}
			}
			else {
				this.velocity = 0;
			}
		}
	}
	
	this.render = function() {
		// boat drawing
		if (this.state == 0) {
			this.game.context.drawImage(this.game.graphics, 130, 26 * this.direction, 26, 26, this.x - this.viewPort.x - 1, this.y - this.viewPort.y - 8, 26, 26);
		}
		
		// man drawing
		else if (this.state == 1) {
			//this.game.context.fillStyle = "#FF0000";
			//this.game.context.fillRect(this.x - this.viewPort.x, this.y - this.viewPort.y, this.w, this.h);	
			this.game.context.drawImage(this.game.graphics, 400 + 30 * this.frame, 24 * this.direction, 24, 24, this.x - this.viewPort.x - 3, this.y - this.viewPort.y - 16, 24, 24);
		}
	}
	this.link = function(game) {
		this.game = game;
	}
}

