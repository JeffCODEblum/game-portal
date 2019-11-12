
var game = {
	canvas: document.getElementById("canvas"),
	context: canvas.getContext("2d"),
	ws: new WS(),
	bs: new BS(),
	ctrl: new Ctrl(),
	graphics: new Image(),
	state: 0
};

document.getElementById("theme").volume = 0;

game.canvas.style.width = "480px";
game.canvas.style.height = "320px";
game.graphics.src = "../island/graphics.png";

initCtrl(game.ctrl);
game.ws.link(game);

function Run() {
	if (game.state == 0) {
		game.ws.reset();
		game.state = 1;
	}
	else if (game.state == 1) {
		game.ws.update();
	}
	Render();
	setTimeout(Run, 1000/60);
}
Run();

function Render() {
	game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
	if (game.state == 1) {
		game.ws.render();
	}
}