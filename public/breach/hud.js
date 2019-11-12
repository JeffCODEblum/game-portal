function Hud() {
	this.game;
	this.link = function(game) {
		this.game = game;
	}
	
	this.draw = function() {
		this.game.context.fillStyle = "#FF0000";
		this.game.context.fillRect(0, 0, this.game.player.hp/5, 1);
		this.game.context.fillStyle = "#0000FF";
		this.game.context.fillRect(0, 1, this.game.player.energy/5, 1);
	}
}