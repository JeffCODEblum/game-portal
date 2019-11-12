function SpriteSet() {
	this.grass1 = {srcx: 0, srcy: 0, w: 8, h: 8};
	this.grass2 = {srcx: 8, srcy: 0, w: 8, h: 8};
	this.grass3 = {srcx: 16, srcy: 0, w: 8, h: 8};
	this.border = {srcx: 24, srcy: 0, w: 8, h: 8};
	this.sand1 = {srcx: 32, srcy: 0, w: 8, h: 8};
	this.sand2 = {srcx: 40, srcy: 0, w: 8, h: 8};
	this.sand3 = {srcx: 48, srcy: 0, w: 8, h: 8};
	this.water1 = {srcx: 56, srcy: 0, w: 8, h: 8};
	this.water2 = {srcx: 64, srcy: 0, w: 8, h: 8};
	this.water3 = {srcx: 72, srcy: 0, w: 8, h: 8};
	
	this.pine1L = {srcx: 80, srcy: 0, w: 8, h: 24};
	this.pine1R = {srcx: 88, srcy: 0, w: 8, h: 24};

	this.oak1L = {srcx: 96, srcy: 0, w: 8, h: 24};
	this.oak1R = {srcx: 104, srcy: 0, w: 8, h: 24};
	
	this.pine2L = {srcx: 112, srcy: 0, w: 8, h: 24};
	this.pine2R = {srcx: 120, srcy: 0, w: 8, h: 24};

	this.oak2L = {srcx: 128, srcy: 0, w: 8, h: 24};
	this.oak2R = {srcx: 136, srcy: 0, w: 8, h: 24};

	this.oak3L = {srcx: 80, srcy: 24, w: 8, h: 24};
	this.oak3R = {srcx: 88, srcy: 24, w: 8, h: 24};

	this.castle1 = {srcx: 8 * 18, srcy: 0, w: 8, h: 24};
	this.castle2 = {srcx: 8 * 19, srcy: 0, w: 8, h: 24};
	this.castle3 = {srcx: 8 * 20, srcy: 0, w: 8, h: 24};
	this.castle4 = {srcx: 8 * 21, srcy: 0, w: 8, h: 24};
	this.castle5 = {srcx: 8 * 22, srcy: 0, w: 8, h: 24};
	this.castle6 = {srcx: 8 * 23, srcy: 0, w: 8, h: 24};

	this.redCastle1 = {srcx: 8 * 24, srcy: 0, w: 8, h: 24};
	this.redCastle2 = {srcx: 8 * 25, srcy: 0, w: 8, h: 24};
	this.redCastle3 = {srcx: 8 * 26, srcy: 0, w: 8, h: 24};
	this.redCastle4 = {srcx: 8 * 27, srcy: 0, w: 8, h: 24};
	this.redCastle5 = {srcx: 8 * 28, srcy: 0, w: 8, h: 24};
	this.redCastle6 = {srcx: 8 * 29, srcy: 0, w: 8, h: 24};

	this.door = {srcx: 0, srcy: 10, w: 13, h: 10};
	this.doorway = {srcx: 0, srcy: 25, w: 13, h: 10};

	this.waterTiles = [this.water1, this.water2, this.water3];
	this.sandTiles = [this.sand1, this.sand2, this.sand3];
	this.grassTiles = [this.grass1, this.grass2, this.grass3];
	
	this.slash1 = {srcx: 0, srcy: 150, w: 8, h: 8};
	this.slash2 = {srcx: 8, srcy: 150, w: 8, h: 8};
	this.slash3 = {srcx: 8 * 2, srcy: 150, w: 8, h: 8};
	this.slash4 = {srcx: 8 * 3, srcy: 150, w: 8, h: 8};
	this.slash5 = {srcx: 8 * 4, srcy: 150, w: 8, h: 8};
	this.slash6 = {srcx: 8 * 5, srcy: 150, w: 8, h: 8};
	this.slash7 = {srcx: 8 * 6, srcy: 150, w: 8, h: 8};
	this.slash8 = {srcx: 8 * 7, srcy: 150, w: 8, h: 8};

	this.arrow1 = {srcx: 0, srcy: 160, w: 8, h: 8};
	this.arrow2 = {srcx: 8, srcy: 160, w: 8, h: 8};
	this.arrow3 = {srcx: 16, srcy: 160, w: 8, h: 8};
	this.arrow4 = {srcx: 24, srcy: 160, w: 8, h: 8};

	this.fire1 = {srcx: 0, srcy: 170, w: 8, h: 8};

	this.knight1 = {srcx: 0, srcy: 100, w: 8, h: 8};
	this.knight2 = {srcx: 8, srcy: 100, w: 8, h: 8};
	this.knight3 = {srcx: 8 * 2, srcy: 100, w: 8, h: 8};
	this.knight4 = {srcx: 8 * 3, srcy: 100, w: 8, h: 8};
	this.knight5 = {srcx: 8 * 4, srcy: 100, w: 8, h: 8};
	this.knight6 = {srcx: 8 * 5, srcy: 100, w: 8, h: 8};
	this.knight7 = {srcx: 8 * 6, srcy: 100, w: 8, h: 8};

	this.wizard1 = {srcx: 0, srcy: 110, w: 8, h: 8};
	this.wizard2 = {srcx: 8, srcy: 110, w: 8, h: 8};
	this.wizard3 = {srcx: 8 * 2, srcy: 110, w: 8, h: 8};
	this.wizard4 = {srcx: 8 * 3, srcy: 110, w: 8, h: 8};
	this.wizard5 = {srcx: 8 * 4, srcy: 110, w: 8, h: 8};
	this.wizard6 = {srcx: 8 * 5, srcy: 110, w: 8, h: 8};
	this.wizard7 = {srcx: 8 * 6, srcy: 110, w: 8, h: 8};

	this.archer1 = {srcx: 0, srcy: 120, w: 8, h: 8};
	this.archer2 = {srcx: 8, srcy: 120, w: 8, h: 8};
	this.archer3 = {srcx: 8 * 2, srcy: 120, w: 8, h: 8};
	this.archer4 = {srcx: 8 * 3, srcy: 120, w: 8, h: 8};
	this.archer5 = {srcx: 8 * 4, srcy: 120, w: 8, h: 8};
	this.archer6 = {srcx: 8 * 5, srcy: 120, w: 8, h: 8};
	this.archer7 = {srcx: 8 * 6, srcy: 120, w: 8, h: 8};


	this.goblin1 = {srcx: 0, srcy: 140, w: 8, h: 8};
	this.goblin2 = {srcx: 8, srcy: 140, w: 8, h: 8};
	this.goblin3 = {srcx: 8 * 2, srcy: 140, w: 8, h: 8};
	this.goblin4 = {srcx: 8 * 3, srcy: 140, w: 8, h: 8};
	this.goblin5 = {srcx: 8 * 4, srcy: 140, w: 8, h: 8};
	this.goblin6 = {srcx: 8 * 5, srcy: 140, w: 8, h: 8};
	this.goblin7 = {srcx: 8 * 6, srcy: 140, w: 8, h: 8};
}