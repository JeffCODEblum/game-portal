var canvas = document.getElementById("canvas");
var context =  canvas.getContext('2d');

canvas.style.width = "640px";
canvas.style.height = "640px";

var player = new Player();
var map = new Map();
var renderer = new Renderer();
var npcManager = new NpcManager();
var hud = new Hud();
var viewport = new Viewport;
var spriteSet = new SpriteSet();

var ctrl = new Controller();
initCtrl("keys");

var game = {
	player: player,
	map: map,
	renderer: renderer,
	npcManager: npcManager,
	hud: hud,
	viewport: viewport,
	ctrl: ctrl,
	canvas: canvas,
	context: context,
	graphics: new Image(),
	spriteSet: spriteSet
};

game.graphics.src = "./newGraphics.png";

map.link(game);
player.link(game);
renderer.link(game);
npcManager.link(game);
viewport.link(game);
hud.link(game);

var success = false;
while (!success) {
	success = map.createWorld();
}
npcManager.setDoors();
player.spawn();
viewport.spawn();

function Run() {
	npcManager.update();
	player.update();
	viewport.update();
	ctrl.update();
	Draw();
	setTimeout(Run, 1000/30);
}
Run();

function Draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	renderer.render();
	if (ctrl.type == "touch") {
		ctrl.virtualController.draw(canvas);
	}
}

