var graphics = new Image();
graphics.src = '/clustercluck/graphics.png';
function Renderer() {
	this.init = function(player, background, context, itemManager, chickenManager, foxManager, fx, hud) {
		this.player = player;
		this.background = background;
		this.itemManager = itemManager;
		this.chickenManager = chickenManager;
		this.foxManager = foxManager;
		this.fx = fx;
		this.hud = hud;
	}
	
	var tiles, tile;
	this.render = function(mode) {
		tiles = this.background.data;
		
		var tmpArray = [];
		for (var j = 0; j < tiles.length; j++) {
			for (var i = 0; i < tiles[0].length; i++) {
				var object = {
					x: tiles[j][i].x,
					y: tiles[j][i].y,
					w: tiles[j][i].w,
					h: tiles[j][i].h,
					z: tiles[j][i].z,
					srcx: tiles[j][i].srcx,
					srcy: tiles[j][i].srcy,
					type: tiles[j][i].type,
					flip: 0
				};
				tmpArray.push(tiles[j][i]);
			}
		}
		
		if (mode == 2 && player.status != 3 && player.special == 0) {
				var object = {
				x: this.player.x,
				y: this.player.y,
				w: this.player.w,
				h: this.player.h,
				z: this.player.z,
				srcx: this.player.srcx,
				srcy: this.player.srcy,
				type: 10,
				flip: this.player.face
			};
			tmpArray.push(object);
		}
		
		else if (mode == 2 && player.status != 3 && player.special == 1) {
				var object = {
				x: this.player.x,
				y: this.player.y,
				w: 16,
				h: 21,
				z: this.player.z,
				srcx: this.player.srcx,
				srcy: 285,
				type: 10,
				flip: this.player.face
			};
			tmpArray.push(object);
		}
		
		for (var i = 0; i < this.itemManager.items.length; i++) {
			var item = this.itemManager.items[i];
			if (item.status != 0) {
				if (item.x + item.w > this.player.worldx - CANVAS_W/2 && item.x < this.player.worldx + CANVAS_W/2 && item.y + item.h > this.player.worldy - CANVAS_H/2 && item.y < this.player.worldy + CANVAS_H/2) {
					var drawx = item.x - (this.player.worldx - CANVAS_W/2);
					var drawy = item.y - (this.player.worldy - CANVAS_H/2);
					object = {
						x: drawx,
						y: drawy,
						w: item.w,
						h: item.h,
						srcx: item.srcx,
						srcy: item.srcy,
						z: item.z,
						type: item.type,
						flip: item.face
					};
					tmpArray.push(object);
				}
			}
		}
		
		for (var i = 0; i < this.chickenManager.chickens.length; i++) {
			var chicken = this.chickenManager.chickens[i];
			if (chicken.status != 0) {
				if (chicken.x + chicken.w > this.player.worldx - CANVAS_W/2 && chicken.x < this.player.worldx + CANVAS_W/2 && chicken.y + chicken.h > this.player.worldy - CANVAS_H/2 && chicken.y < this.player.worldy + CANVAS_H/2) {
					var drawx = chicken.x - (this.player.worldx - CANVAS_W/2);
					var drawy = chicken.y - (this.player.worldy - CANVAS_H/2);
					object = {
						x: drawx,
						y: drawy,
						w: chicken.w,
						h: chicken.h,
						srcx: chicken.srcx,
						srcy: chicken.srcy,
						type: 14,
						z: chicken.z,
						flip: chicken.face
					};
					tmpArray.push(object);
				}
			}
		}
		
		for (var i = 0; i < this.foxManager.foxes.length; i++) {
			var fox = this.foxManager.foxes[i];
			if (fox.x + fox.w > this.player.worldx - CANVAS_W/2 && fox.x < this.player.worldx + CANVAS_W/2 && fox.y + fox.h > this.player.worldy - CANVAS_H/2 && fox.y < this.player.worldy + CANVAS_H/2) {
				if (fox.status != 0) {
					var drawx = fox.x - (this.player.worldx - CANVAS_W/2);
					var drawy = fox.y - (this.player.worldy - CANVAS_H/2);
					object = {
						x: drawx,
						y: drawy,
						w: fox.w,
						h: fox.h,
						srcx: fox.srcx,
						srcy: fox.srcy,
						type: 15,
						z: fox.z,
						flip: fox.face
					};
					tmpArray.push(object);
				}
			}
		}
				
		var drawArray = [];
		var first;
		var index = 0;
		while (tmpArray.length > 0) {
			first = tmpArray[0];
			index = 0;
			for (var i = 0; i < tmpArray.length; i++) {
				if (tmpArray[i].z < first.z) {
					first = tmpArray[i];
					index = i;
				}
			}
			drawArray.push(first);
			tmpArray.splice(index, 1);
		}
				
		for (var i = 0; i < drawArray.length; i++) {
			
			obj = drawArray[i];
			if (obj.type == 0) {
				context.fillStyle = "#000000";
				context.fillRect(obj.x, obj.y, obj.w, obj.h);
			}
			else if (obj.type == 1) {
				context.drawImage(graphics, 0, 31, 8, 8, obj.x, obj.y, obj.w, obj.h);
			}
			else if (obj.type == 2) {
				context.drawImage(graphics, 9, 31, 8, 8, obj.x, obj.y, obj.w, obj.h);
			}
			else if (obj.type == 3) {
				context.drawImage(graphics, 18, 31, 8, 8, obj.x, obj.y, obj.w, obj.h);
			}
			else if (obj.type == 4) {
				context.drawImage(graphics, 0, 40, 8, 8, obj.x, obj.y, obj.w, obj.h);
			}
			else if (obj.type == 5) {
				context.drawImage(graphics, 0, 31, 8, 8, obj.x, obj.y, obj.w, obj.h);
				context.drawImage(graphics, 0, 49, 15, 24, obj.x - 4, obj.y - 16, 15, 24);
			}
			else if (obj.type == 6) {
				context.drawImage(graphics, 0, 74, 8, 23, obj.x, obj.y - 15, 8, 23);
			}
			else if (obj.type == 7) {
				context.drawImage(graphics, 8, 74, 8, 23, obj.x, obj.y - 15, 8, 23);
			}
			else if (obj.type == 8) {
				context.drawImage(graphics, 16, 74, 8, 23, obj.x, obj.y - 15, 8, 23);
			}
			else if (obj.type == 9) {
				context.drawImage(graphics, 24, 74, 8, 23, obj.x, obj.y - 15, 8, 23);
			}
			else if (obj.type == 18) {
				context.drawImage(graphics, 0, 130, 7, 6, obj.x, obj.y, 7, 6);
			}
			else if (obj.type == 16) {
				context.drawImage(graphics, 9, 40, 8, 8, obj.x, obj.y, 8, 8);
			}
			else if (obj.type == 17) {
				context.drawImage(graphics, obj.srcx, obj.srcy, obj.w, obj.h, obj.x, obj.y, obj.w, obj.h);
			}
			else if (obj.type == 19) {
				context.drawImage(graphics, 31, 231, 8, 8, obj.x, obj.y, 8, 8);
			}
			else if (obj.type == 30) {
				context.drawImage(graphics, 0, 31, 8, 8, obj.x, obj.y, 8, 8);
				context.drawImage(graphics, 20, 59, 8, 13, obj.x, obj.y - 6, 8, 13);
			}
			else if (obj.type == 31) {
				context.drawImage(graphics, 0, 31, 8, 8, obj.x, obj.y, 8, 8);
				context.drawImage(graphics, 28, 59, 8, 13, obj.x, obj.y - 6, 8, 13);
			}
			else if (obj.type == 10 && player.special == 0) {
				if (player.face == 0) {
					context.drawImage(graphics, obj.srcx, 0, 12, 16, obj.x - obj.w/2 - 3, obj.y - 11, 12, 16);
				}
				else if (player.face == 1) {
					context.save();
					context.translate(CANVAS_W/2, CANVAS_H/2);
					context.scale(-1, 1);
					context.drawImage(graphics, obj.srcx, 0, 12, 16, 0 - obj.w/2 - 3,0- 11, 12, 16);
					context.restore();
				}
				
			}
			else if (obj.type == 10 && player.special == 1) {
					if (obj.flip == 0) {
						context.drawImage(graphics, obj.srcx, obj.srcy, 16, 21, obj.x -6, obj.y - 17, 16, 21);
			
					}
					else {
						context.save();
						context.translate(obj.x, obj.y);
						context.scale(-1, 1);
						context.drawImage(graphics, obj.srcx, obj.srcy, 16, 21, -9, -17, 16, 21);
						context.restore();
					}
			}
			else {
				if (obj.flip == 0) {
					context.drawImage(graphics, obj.srcx, obj.srcy, obj.w, obj.h, obj.x, obj.y, obj.w, obj.h);
				}
				else if (obj.flip == 1) {
					context.save();
					context.translate(obj.x, obj.y);
					context.scale(-1, 1);
					context.drawImage(graphics, obj.srcx, obj.srcy, obj.w, obj.h, -obj.w, 0, obj.w, obj.h);
					context.restore();
				}
			}
			
			//context.fillRect(tile.x - tile.w/2, tile.y - tile.h/2, tile.w - 1, tile.h - 1);

		}
		var bullet, drawx, drawy;
		for (var i = 0; i < this.player.gun.bullets.length; i++) {
			bullet = this.player.gun.bullets[i];
			drawx = bullet.x - (this.player.worldx - CANVAS_W/2);
			drawy = bullet.y - (this.player.worldy - CANVAS_H/2);
			if (bullet.status != 0) {
				context.fillStyle = "#444444";
				context.fillRect(drawx, drawy, bullet.w, bullet.h);
			}
		}
		
		var particle, px, py;
		for (var i = 0; i < this.fx.particles.length; i++) {
			particle = this.fx.particles[i];
			if (particle.status != 0) {
				px = particle.x - (this.player.worldx - CANVAS_W/2);
				py = particle.y - (this.player.worldy - CANVAS_H/2);
				if (particle.type == 0) {
					context.fillStyle = "rgba(255, 0, 0, 0.7)";
				}
				else if (particle.type == 1) {
					context.fillStyle = "#FFFFFF";
				}
				context.fillRect(px, py, 1, 1);
			}
		}
		
		if (mode == 2) {
			// Heads up display
			context.fillStyle = "#000000";
			context.fillRect(this.hud.bar.x, this.hud.bar.y, this.hud.bar.w, this.hud.bar.h);
			for (var i = 0; i < this.hud.money.digits.length; i++) {
				context.drawImage(graphics, this.hud.money.digits[i].srcx, this.hud.money.digits[i].srcy, this.hud.money.digits[i].w, this.hud.money.digits[i].h, this.hud.money.digits[i].x, this.hud.money.digits[i].y, 6, 6);
			}
			context.drawImage(graphics, 77, 118, 6, 7, CANVAS_W - 27, CANVAS_H - 9, 6, 7);
			
			for (var i = 0; i < this.hud.ammo.digits.length; i++) {
				context.drawImage(graphics, this.hud.ammo.digits[i].srcx, this.hud.ammo.digits[i].srcy, this.hud.ammo.digits[i].w, this.hud.ammo.digits[i].h, this.hud.ammo.digits[i].x, this.hud.ammo.digits[i].y, 6, 6);
			}
			context.drawImage(graphics, 0, 140, 4, 4, CANVAS_W - 65, CANVAS_H - 9, 4, 4);
			
			for (var i = 0; i <4; i++) {
				context.drawImage(graphics, 6, 125, 5, 4, 1 + i * 6, CANVAS_H - 8, 5, 4);
			}
			
			for (var i = 0; i <this.player.hp; i++) {
				context.drawImage(graphics, 0, 125, 5, 4, 1 + i * 6, CANVAS_H - 8, 5, 4);
			}
			
			for (var i = 0; i <4; i++) {
				context.drawImage(graphics, 7, 130, 7, 6, 25 + i * 7, CANVAS_H - 8, 7, 6);
			}
			for (var i = 0; i <this.player.food; i++) {
				context.drawImage(graphics, 0, 130, 7, 6, 25 + i * 7, CANVAS_H - 8, 7, 6);
			}
			// shop button
			context.drawImage(graphics, 0, 150, 19, 10, CANVAS_W - 47, CANVAS_H - 10, 19, 10);
			
			// output message
			if (this.hud.message == 1) {
				context.drawImage(graphics, 0, 380, 100, 10, 0, 59, 100, 10);
			}
			else if (this.hud.message == 2) {
				context.drawImage(graphics, 0, 390, 100, 10, 0, 59, 100, 10);
			}
			else if (this.hud.message == 3) {
				context.drawImage(graphics, 0, 400, 100, 10, 0, 59, 100, 10);
			}
			else if (this.hud.message == 4) {
				context.drawImage(graphics, 0, 410, 100, 10, 0, 59, 100, 10);
			}
			else if (this.hud.message == 5) {
				context.drawImage(graphics, 0, 420, 100, 10, 0, 59, 100, 10);
			}
			else if (this.hud.message == 6) {
				context.drawImage(graphics, 0, 430, 100, 10, 0, 59, 100, 10);
			}
			else if (this.hud.message==9) {
				context.drawImage(graphics, 0, 460, 100, 10, 0, 59, 100, 10);
			}
			
			// output message 2
			if (this.hud.message2 == 2) {
				context.drawImage(graphics, 0, 450, 100, 10, 0, 1, 100, 10);
			}
			else if (this.hud.message2 == 1) {
				context.drawImage(graphics, 0, 440, 100, 10, 0, 1, 100, 10);
			}
			else if (this.hud.message2 == 3) {
				context.drawImage(graphics, 0, 470, 100, 10, 0, 1, 100, 10);
			}
			
			// store
			if (this.player.status == 3) {
				context.drawImage(graphics, 0, 240, 60, 40, CANVAS_W/2 - 30, CANVAS_H/2 - 20, 60, 40);
			}
		}
		else if (mode == 0) {
			// title
			context.drawImage(graphics, 0, 180, 61, 40, 30, 0, 61, 40);
			// controls
			context.drawImage(graphics, 3, 314, 111, 56, CANVAS_W/2 - 55, 28, 111, 56);
		}
		
		// game over screen
		else if (mode == 3) {
			context.drawImage(graphics, 62, 180, 61, 40, 30, 0, 61, 40);
		}
		
		if (this.player.status == 4) {
			for (var i = 0; i < this.hud.money.digits.length; i++) {
				context.drawImage(graphics, this.hud.score.digits[i].srcx, this.hud.score.digits[i].srcy, this.hud.score.digits[i].w, this.hud.score.digits[i].h,CANVAS_W/2 - i * 7 + 14, CANVAS_H/2 - 21, 6, 6);
			}
		}
		
	}
}