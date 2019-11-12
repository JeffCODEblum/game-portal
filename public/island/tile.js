
function Tile() {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.w = 32;
	this.h = 32;
	this.type = 0;
	this.subType = 0;
	this.subType2 = 0;
	this.subType3 = 0;
	this.sprites = [];
	this.marked = false;
	this.discovered = 0;
	
	this.link = function(game) {
		this.game = game;
	}
	
	this.render = function() {
		if (this.discovered == 0) {
			this.discovered = 1;
		}
		if (this.type == 4) {
			var x = this.x - this.game.ws.player.viewPort.x;
			var y = this.y - this.game.ws.player.viewPort.y;
			this.game.context.fillStyle = "#AAAAAA";
			this.game.context.fillRect(x, y, this.w, this.h);
		}
		for (var i = 0; i < this.sprites.length; i++) {
	
			var srcx = this.sprites[i].srcx;
			var srcy = this.sprites[i].srcy;
			var w = this.sprites[i].w;
			var h = this.sprites[i].h;
			var x = this.x - this.game.ws.player.viewPort.x - (this.sprites[i].w - this.w)/2;
			var y = this.y - this.game.ws.player.viewPort.y - (this.sprites[i].h - this.h);
			var offx = this.sprites[i].offx;
			var offy = this.sprites[i].offy;

			this.game.context.drawImage(this.game.graphics,srcx, srcy, w, h, x +  offx, y + offy, w, h);
			
			if (this.type == 0 && this.sprites[0] != this.game.ws.sprites.waterSprites[2]) {
				this.sprites[0] = this.game.ws.sprites.waterSprites[this.game.ws.map.frame];
			}
		}
	}
}