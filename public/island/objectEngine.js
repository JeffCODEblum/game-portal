function ObjectEngine() {
	this.game;
	this.objectSprites = new ObjectSprites();
	this.objects = [];
	for (var i = 0; i < 1; i++) {
		var obj = new Object();
		this.objects.push(obj);
	}
	this.objects[0].type = 1;
	this.objects[0].sprite = this.objectSprites.boat;

	this.link = function(game) {
		this.game = game;
		for (var i = 0; i < this.objects.length; i++) {
			this.objects[i].link(game);
		}
	}

	this.spawn = function(type, spawnTile) {
		if (type == 0) {
			this.objects[0].x = spawnTile.x;
			this.objects[1].y = spawnTile.y;
		}
	}
}

function Object() {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.state = 0;
	this.type = 0;
	this.sprite;
	this.game;
	this.link = function(game) {
		this.game = game;
	}

	this.render = function() {
		var srcx = this.sprites[i].srcx;
		var srcy = this.sprites[i].srcy;
		var w = this.sprites[i].w;
		var h = this.sprites[i].h;
		var x = this.x - this.game.ws.player.viewPort.x - (this.sprites[i].w - this.w)/2;
		var y = this.y - this.game.ws.player.viewPort.y - (this.sprites[i].h - this.h);
		var offx = this.sprites[i].offx;
		var offy = this.sprites[i].offy;

		this.game.context.drawImage(this.game.graphics, srcx, srcy, w, h, x +  offx, y + offy, w, h);
	}
}

function ObjectSprites() {
	this.boat = {
		srcx: 129,
		srcy: 53,
		w: 30,
		h: 20,
		offx: 0,
		offy: 0
	}
}