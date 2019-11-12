var canvas = document.getElementById("canvas");
var context =  canvas.getContext('2d');

canvas.style.width = "480px";
canvas.style.height = "320px";

var player = new Player();
var background = new Background();
var map = new Map();
var itemManager = new ItemManager();
var chickenManager = new ChickenManager();
var foxManager = new FoxManager();
var hud = new Hud();
var fx = new Fx();

var ctrl = {
	up: false,
	down: false,
	left: false,
	right: false,
	drop: false,
	pageX: 0,
	pageY: 0
};

var mode = 0;

player.init(ctrl, background, map, itemManager, foxManager, chickenManager, hud);
var renderer = new Renderer();
renderer.init(player, background, context, itemManager, chickenManager, foxManager, fx, hud);
background.init(player, map);
itemManager.init(player, map, chickenManager);
chickenManager.init(itemManager, map, fx);
foxManager.init(map, chickenManager, fx);
map.init(background, player, itemManager);

chickenManager.spawn(MAP_W / 3 * TILE_W, MAP_H/2 * TILE_H);
chickenManager.spawn(2 * MAP_W / 3 * TILE_W, MAP_H/2 * TILE_H);
chickenManager.spawn(MAP_W / 2 * TILE_W, 2 * MAP_H/3 * TILE_H);

player.spawn(TILE_W * MAP_W / 2, TILE_H * MAP_H / 2);
background.spawn();
background.update(0, 0);

function Run() {
	
	if (mode == 0) {
		chickenManager.update();
		itemManager.update();
		fx.update();
		itemManager.update();
	}
	else if (mode == 1) {
		document.getElementById('powerSound').play();
		chickenManager.reset();
		itemManager.reset();
		foxManager.reset();
		player.spawn(TILE_W * MAP_W / 2, TILE_H * MAP_H / 2);
		background.spawn();
		background.update(0, 0);
		fx.reset();
		map.reset();
		itemManager.spawn(MAP_W / 2 * TILE_H, (MAP_H/2 - 3) * TILE_H, 11);
		itemManager.spawn(MAP_W / 2 * TILE_H, (MAP_H/2 - 4) * TILE_H, 12);
		chickenManager.spawn(MAP_W / 2 * TILE_W, MAP_H/2 * TILE_H);
		mode = 2;
		hud.message = 0;
		hud.message2 = 0;
		hud.time = 0;
	}
	else if (mode == 2) {
		if (hud.message2 != 0 && Date.now() - hud.time > 800) {
			hud.time = 0;
			hud.message2 = 0;
		}
		if (player.status != 3) {
			player.update();
			chickenManager.update();
			foxManager.update();
			itemManager.update();
			map.update();
			fx.update();
			
			if (player.hp <= 0) {
				mode = 3;
				player.status = 4;
				player.lastDeath = Date.now();
				hud.setScore(player.totalEarned);
			}
		}
		hud.setMoney(player.money);
		hud.setAmmo(player.ammo);
	}
	
	else if (mode == 3) {
		player.update();
		chickenManager.update();
		foxManager.update();
		itemManager.update();
		map.update();
		fx.update();
		if (player.status == 5) {
			mode = 1;
		}
	}
	
	Draw();
	setTimeout(Run, 1000/60);
}
Run();

function Draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	renderer.render(mode);
}

