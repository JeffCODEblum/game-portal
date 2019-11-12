function Fx() {
	var particle;
	this.particles = [];
	for (var i = 0; i < MAX_PARTICLES; i++) {
		particle = new Particle();
		this.particles.push(particle);
	}
	
	this.reset = function() {
		for (var i = 0; i < this.particles.length; i++) {
			this.particles[i].reset();
		}
	}
	
	var rand;
	this.explode = function(x, y, z, type) {
		rand = Math.floor(Math.random() * 4) + 4;
		for (var i = 0; i < rand; i++) {
			for (var j = 0; j < this.particles.length; j++) {
				if (this.particles[i].status == 0) {
					this.particles[i].spawn(x, y, z, type);
					break;
				}
			}
		}
	}
	
	this.update = function() {
		for (var i = 0; i < this.particles.length; i++) {
			if(this.particles[i].status != 0) {
				this.particles[i].update();
			}
		}
	}
}

function Particle() {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.srcx = 9;
	this.srcy = 106;
	this.w = 2;
	this.h = 2;
	var vx;
	var vy;
	this.status = 0;
	this.type = 0;
	var rand;
	this.theta;
	var spawnTime;
	var grav = 0;
	var weight = 0;
	this.spawn = function(x, y, z, type) {
		this.status = 1;
		this.x = x;
		this.y = y;
		this.type = type;
		rand = Math.floor(Math.random() * 100);
		this.theta = Math.PI/ 12 * rand;
		vx = Math.sin(this.theta) * 1;
		vy = Math.cos(this.theta) * 1;
		spawnTime = Date.now();
		grav = 0;
		weight = Math.floor(Math.random() * 5) * 0.1;
	}
	
	this.reset = function() {
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.srcx = 9;
		this.srcy = 106;
		this.w = 2;
		this.h = 2;
		this.status = 0;
		this.type = 0;
		this.theta = 0;
		vx = 0;
		vy = 0;
		rand = 0;
		spawnTime = 0;
		grav = 0;
		weight = 0;
	}
	
	this.update = function() {
		if (Date.now() - spawnTime > 200) {
			this.status = 0;
		}
		this.x += vx;
		this.y += vy;
		if (this.type == 0) {
			grav += weight;
			vy += grav;
		}
		
	}
	
}