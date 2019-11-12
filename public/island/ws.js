function WS() {
	this.player = new Player();
	this.map = new Map();
	this.objectEngine = new ObjectEngine();
	this.sprites = new Sprites();
	this.textEngine = new TextBox();
	this.link = function(game) {
		this.game = game;
		this.player.link(game);
		this.objectEngine.link(game);
		this.map.link(game);
		this.textEngine.link(game);
	}
	
	this.update = function() {
		if (this.textEngine.state != 0) {
			this.textEngine.update();
		}
		else {
			this.player.update();
		}
	}
	
	this.reset = function() {
		this.map.clean();
		this.map.newWorld();
		
		var spawnTiles = this.map.getPlayerSpawn();
		if (spawnTiles != false) {
			this.player.spawn(spawnTiles[0]);
		}

		this.textEngine.setText("Welcome to Super Island World! This place is full of adventure. Have fun! :)");
	}
	
	this.render = function() {
		var renderData = this.map.getRenderData();
		renderData.push(this.player);
		var sorted = this.zSort(renderData);
		for (var i = 0; i < sorted.length; i++) {
			sorted[i].render();
		}
		
		if (this.player.state == 2 || this.player.state == 3) {
			this.map.renderMiniMap();
		}
	
		if (this.textEngine.state != 0) {
			this.textEngine.render();
		}
		//this.game.context.fillStyle = "#FF0000";
		//this.game.context.font = "12px Arial";
		//this.game.context.fillText("hello world", 100, 100);
	}
	
	this.zSort = function(renderData) {
		var renderData = renderData;
		var sorted = [];
		while(renderData.length > 0) {
			var farthest = renderData[0];
			var index;
			for(var i = 0; i < renderData.length; i++) {
				if (farthest.z > renderData[i].z) {
					farthest = renderData[i];
					index = i;
				}
			}
			sorted.push(farthest);
			renderData.splice(renderData.indexOf(farthest), 1);
		}
		return (sorted);
	}
}
