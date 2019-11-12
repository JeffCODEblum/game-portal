function Renderer() {
	var graphics = new Image();
	graphics.src = "./graphics.png";
	this.game;
	
	this.link = function(game) {
		this.game = game;
	}
	
	this.render = function() {
		var npcs = this.game.npcManager.getDrawData();
		var tiles = this.game.map.getDrawData();
		var projectiles = [];
		var doors = [];
		var drawArray = [];
		
		for (var i = 0; i < this.game.player.weapon.projectiles.length; i++) {
			projectiles.push(this.game.player.weapon.projectiles[i]);
		}
		for (var i = 0; i < this.game.npcManager.npcs.length; i++) {
			var npc = this.game.npcManager.npcs[i];
			for (var j = 0; j < npc.weapon.projectiles.length; j++) {
				projectiles.push(npc.weapon.projectiles[j]);
			}
		}
		for (var i = 0; i < this.game.npcManager.doors.length; i++) {
			doors.push(this.game.npcManager.doors[i]);
		}
		
		for (var i = 0; i < npcs.length; i++) {
			drawArray.push(npcs[i]);
		}
		for (var i = 0; i < tiles.length; i++) {
			drawArray.push(tiles[i]);
		}
		for (var i = 0; i < projectiles.length; i++) {
			drawArray.push(projectiles[i]);
		}
		for (var i = 0; i < doors.length; i++) {
			drawArray.push(doors[i]);
		}
		drawArray.push(player);
			
		if (!this.game.player.mapIsUp) {
			var sorted = zSort(drawArray);
		}
		else {
			var sorted = drawArray;
		}
		for (var i = 0; i < sorted.length; i++) {
			sorted[i].draw();
		}
		this.game.hud.draw();

		if (this.game.player.state == 7) {
			console.log("draw game over screen");
			this.game.context.drawImage(this.game.graphics, 0, 270, 64, 64, 0, 0, 64, 64);
		}
	}
	
	var zSort = function(drawArray) {
		var sorted = [];
		var farthest;
		while (drawArray.length > 0) {
			farthest = drawArray[0];
			for (var i = 0; i < drawArray.length; i++) {
				if (farthest.z > drawArray[i].z) {
					farthest = drawArray[i];
				}
			}
			sorted.push(farthest);
			drawArray.splice(drawArray.indexOf(farthest), 1);
		}
		return (sorted);
	}
}