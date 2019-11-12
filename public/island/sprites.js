function Sprites() {
	this.water1 = {
		srcx: 65,
		srcy: 0,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};

	this.water2 = {
		srcx: 65,
		srcy: 32,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};

	this.water3 = {
		srcx: 65,
		srcy: 64,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};

	this.sand1 = {
		srcx: 160,
		srcy: 0,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};

	this.sand2 = {
		srcx: 160,
		srcy: 32,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};

	this.sand3 = {
		srcx: 160,
		srcy: 64,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};

	this.sand4 = {
		srcx: 160,
		srcy: 96,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};

	this.beachNW = {
		srcx: 160,
		srcy: 128,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};

	this.beachW = {
		srcx: 160,
		srcy: 128 + 32,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};

	this.beachSW = {
		srcx: 160,
		srcy: 128 + 32 * 2,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};

	this.beachN = {
		srcx: 160,
		srcy: 128 + 32 * 3,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};

	this.beachS = {
		srcx: 160,
		srcy: 128 + 32 * 4,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};

	this.beachNE = {
		srcx: 160,
		srcy: 128 + 32 * 5,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};

	this.beachE = {
		srcx: 160,
		srcy: 128 + 32 * 6,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};

	this.beachSE = {
		srcx: 160,
		srcy: 128 + 32 * 7,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};

	this.beachNWE = {
		srcx: 160,
		srcy: 128 + 32 * 8,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};

	this.beachAll= {
		srcx: 160,
		srcy: 128 + 32 * 9,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};

	this.beachSWE = {
		srcx: 160,
		srcy: 128 + 32 * 10,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};

	this.beachNSW = {
		srcx: 160,
		srcy: 128 + 32 * 11,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};

	this.beachNSE = {
		srcx: 160,
		srcy: 128 + 32 * 12,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};
	
	this.beachNS = {
		srcx: 160,
		srcy: 128 + 32 * 13,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};
	
	this.beachEW = {
		srcx: 160,
		srcy: 128 + 32 * 14,
		w: 32,
		h: 32,
		offx: 0,
		offy: 0
	};
	
	this.grass1 = {
		srcx: 224,
		srcy: 0,
		w: 32,
		h: 48,
		offx: 0,
		offy: 0
	};
	
	this.grass2 = {
		srcx: 224,
		srcy: 48,
		w: 32,
		h:48,
		offx: 0,
		offy: 0
	};
	
	this.grass3 = {
		srcx: 224,
		srcy: 48 * 2,
		w: 32,
		h: 48,
		offx: 0,
		offy: 0
	};
	
	this.tree1 = {
		srcx: 0,
		srcy: 440,
		w: 48,
		h: 56,
		offx: 0,
		offy: -8
	}
	
	this.treeTop1 = {
		srcx: 0,
		srcy: 500,
		w: 48,
		h: 56 + 32,
		offx: 0,
		offy: -8
	}
	
	this.tree2 = {
		srcx: 60,
		srcy: 440,
		w: 48,
		h: 56,
		offx: 0,
		offy: -8
	}
	
	this.treeTop2 = {
		srcx: 60,
		srcy: 500,
		w: 48,
		h: 56 + 32,
		offx: 0,
		offy: -8
	}

	this.chest = {
		srcx: 0,
		srcy: 100,
		w: 18,
		h: 14,
		offx: 0,
		offy: -28
	}

	this.chestOpen = {
		srcx: 0,
		srcy: 120,
		w: 18,
		h: 14,
		offx: 0,
		offy: 0
	}

	this.boat = {
		srcx: 129,
		srcy: 53,
		w: 30,
		h: 20,
		offx: 0,
		offy: 0
	}
	
	this.waterSprites = [this.water1, this.water2, this.water3];
	this.sandSprites = [this.sand1, this.sand2, this.sand3, this.sand4];
	this.grassSprites = [this.grass1, this.grass2, this.grass3];
}

/*
function Sprite() {
	this.counters = [];
	this.timelines = [];
	
	this.link = function(game) {
		this.game = game;
	}
	
	this.draw = function(x, y) {
		for (var i = 0; i < this.timelines.length; i++) {
			var frame = this.timelines[i][this.counters[i]];
		}
		for  (var i = 0; i < this.counters.length; i++) {
			this.counters[i]++;
			if (this.counters[i] >= this.timelines[i].length) {
				this.counters[i] = 0;
			}
		}
	}
}
*/
