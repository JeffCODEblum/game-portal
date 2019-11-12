var graphics = new Image();
graphics.src = '../crossy-craft/graphics.png';

var Camera = function(ctrl) {
  this.x = 0;
  this.y = 48 * 5;
  this.z = 0;
  this.update = function() {
    if (ctrl.up) {
      this.z += 4;
    }
    if (ctrl.down) {
      this.z -= 4;
    }
    if (ctrl.left) {
      this.x -= 4;
    }
    if (ctrl.right) {
      this.x += 4;
    }
  };
}


var Tile= function(context, camera) {
  this.x = 0;
  this.y = 48 * 6;
  this.z = 0;
  this.type = 0;
  this.solid = false;

  this.render = function() {
    var isoX = ((this.x - camera.x) / 64 - (this.z - camera.z) / 64) * 48 + 750;
    var isoY =
      ((this.x - camera.x) / 64 + (this.z - camera.z) / 64) * 24 +
      250 -
      (this.y - camera.y);
    // outline 0
    if (this.type == 0)
      context.drawImage(graphics, 0, 188, 97, 98, isoX, isoY, 97, 98);
    // grass 1
    if (this.type == 1)
      context.drawImage(graphics, 200, 188, 97, 98, isoX, isoY, 97, 98);
    // dirt 2
    if (this.type == 2)
      context.drawImage(graphics, 400, 188, 97, 98, isoX, isoY, 97, 98);
    // trunk 4
    if (this.type == 4)
      context.drawImage(graphics, 600, 188, 97, 98, isoX, isoY, 97, 98);
    // leaves 5
    if (this.type == 5)
      context.drawImage(graphics, 800, 188, 97, 98, isoX, isoY, 97, 98);
    // blank 6

    // pavement 7
    if (this.type == 7)
      context.drawImage(graphics, 0, 300, 97, 98, isoX, isoY, 97, 98);

    // water 8
    if (this.type == 8)
      context.drawImage(graphics, 200, 300, 97, 98, isoX, isoY, 97, 98);
  };
}

var CURSOR_SPEED = 64;
var CURSOR_SPEED_Y = 48;
var Player = function(context, camera, map, ctrl) {
  this.x = 0;
  this.y = 48 * 5;
  this.z = 0;
  this.vx = 0;
  this.vy = 0;
  this.vz = 0;
  this.lastMove = 0;
  this.state = 0;
  this.lastStateChange = 0;
  this.stepsTaken = 0;
  this.equiptment = 0;
  this.face = 0;

  this.render = function() {
    var isoX = ((this.x - camera.x) / 64 - (this.z - camera.z) / 64) * 48 + 750;
    var isoY =
      ((this.x - camera.x) / 64 + (this.z - camera.z) / 64) * 24 +
      250 -
      (this.y - camera.y);
    switch (this.face) {
      case 0:
        context.drawImage(graphics, 1000, 188, 97, 98, isoX, isoY, 97, 98);
        break;
      case 1:
        context.drawImage(graphics, 1200, 50, 97, 98, isoX, isoY, 97, 98);
        break;
      case 2:
        context.drawImage(graphics, 1000, 50, 97, 98, isoX, isoY, 97, 98);
        break;
      case 3:
        context.drawImage(graphics, 1200, 188, 97, 98, isoX, isoY, 97, 98);
        break;
    }
  };

  this.update = function() {
    if (this.state == 0) {
      var tile = map.getTileAtPosition(this.x, this.y - CURSOR_SPEED_Y, this.z);
      while (!tile.solid) {
        this.y -= CURSOR_SPEED_Y;
        tile = map.getTileAtPosition(this.x, this.y - CURSOR_SPEED_Y, this.z);
      }
      this.state = 1;
    } else if (this.state == 1) {
      var tile = map.getTileAtPosition(this.x, this.y - 2, this.z);
      if (!tile.solid) {
        this.y -= 8;
        camera.y -= 8;
        return;
      }
      if (Date.now() - this.lastStateChange > 100) {
        if (ctrl.key1) {
          this.equiptment = 0;
        }
        if (ctrl.key2) {
          this.equiptment = 1;
        }
        if (ctrl.key3) {
          this.equiptment = 2;
        }
        if (ctrl.key4) {
          this.equiptment = 3;
        }
        if (ctrl.key5) {
          this.equiptment = 4;
        }
        if (ctrl.j) {
          console.log(this.equiptment);
          if (this.equiptment == 0) {
            var tile = map.getTileAtPosition(this.x, this.y - 2, this.z);
            console.log(tile);
            if (tile) {
              console.log("set tile");
              tile.type = 3;
              tile.solid = 0;
              this.state = 1;
              this.lastStateChange = Date.now();
              return;
            }
          } else {
            var tile = map.getTileAtPosition(this.x, this.y, this.z);
            if (tile) {
              switch (this.equiptment) {
                case 1:
                  tile.type = 1;
                  break;
                case 2:
                  tile.type = 2;
                  break;
                case 3:
                  tile.type = 4;
                  break;
                case 4:
                  tile.type = 5;
                  break;
              }
              tile.solid = 1;
              this.state = 1;
              this.lastStateChange = Date.now();
              return;
            }
          }
        }
        if (ctrl.s) {
          this.vz = 1;
          this.vx = 0;
          this.vy = 1;
          this.face = 3;
        } else if (ctrl.w) {
          this.vz = -1;
          this.vx = 0;
          this.vy = 1;
          this.face = 2;
        } else if (ctrl.d) {
          this.vz = 0;
          this.vx = 1;
          this.vy = 1;
          this.face = 1;
        } else if (ctrl.a) {
          this.vz = 0;
          this.vx = -1;
          this.vy = 1;
          this.face = 0;
        }
        if (ctrl.s || ctrl.w || ctrl.d || ctrl.a) {
          var tile = map.getTileAtPosition(
            this.x + this.vx * CURSOR_SPEED,
            this.y,
            this.z + this.vz * CURSOR_SPEED
          );
          if (tile.solid) {
            tile = map.getTileAtPosition(
              tile.x,
              tile.y + CURSOR_SPEED_Y,
              tile.z
            );
            if (tile.solid) {
              this.vz = 0;
              this.vy = 0;
              this.vx = 0;
            } else {
              this.state = 3;
            }
          } else this.state = 2;
        }
      }
    } else if (this.state == 2) {
      this.x += (this.vx * CURSOR_SPEED) / 8;
      this.z += (this.vz * CURSOR_SPEED) / 8;
      camera.x += (this.vx * CURSOR_SPEED) / 8;
      camera.z += (this.vz * CURSOR_SPEED) / 8;
      this.y += this.vy * 8;
      this.stepsTaken++;
      if (this.stepsTaken == 4) {
        this.vy = -1;
      }
      if (this.stepsTaken == 8) {
        this.state = 1;
        this.stepsTaken = 0;
        this.lastStateChange = Date.now();
      }
    } else if (this.state == 3) {
      this.x += (this.vx * CURSOR_SPEED) / 8;
      this.z += (this.vz * CURSOR_SPEED) / 8;
      camera.x += (this.vx * CURSOR_SPEED) / 8;
      camera.z += (this.vz * CURSOR_SPEED) / 8;
      camera.y += CURSOR_SPEED_Y / 8;
      if (this.stepsTaken < 4) {
        this.y += (this.vy * CURSOR_SPEED_Y) / 2;
      } else if (this.stepsTaken >= 4) {
        this.y -= (this.vy * CURSOR_SPEED_Y) / 4;
      }
      this.stepsTaken++;
      if (this.stepsTaken == 8) {
        this.state = 1;
        this.stepsTaken = 0;
        this.lastStateChange = Date.now();
      }
    }

    // if (Date.now() - this.lastMove > 200) {
    //     //console.log(Math.floor(this.x/64), Math.floor(this.y/48), Math.floor(this.z/64));
    //     var tile = map.getTileAtPosition(this.x, this.y, this.z);
    //     this.lastMove = Date.now();
    //     if (ctrl.s) {
    //         this.z += CURSOR_SPEED;
    //         camera.z += CURSOR_SPEED;
    //     }
    //     if (ctrl.w) {
    //         this.z -= CURSOR_SPEED;
    //         camera.z -= CURSOR_SPEED;
    //     }
    //     if (ctrl.d) {
    //         this.x += CURSOR_SPEED;
    //         camera.x += CURSOR_SPEED;
    //     }
    //     if (ctrl.a) {
    //         this.x -= CURSOR_SPEED;
    //         camera.x -= CURSOR_SPEED;
    //     }
    //     if (ctrl.r) {
    //         this.y += CURSOR_SPEED_Y;
    //         camera.y += CURSOR_SPEED_Y;
    //     }
    //     if (ctrl.f) {
    //         this.y -= CURSOR_SPEED_Y;
    //         camera.y -= CURSOR_SPEED_Y;
    //     }
    // }
  };
}



var NpcEngine = function(context, camera, map) {
  this.data = [];

  for (var i = 0; i < 16; i++) {
    var npc = new Npc(context, camera, map);
    this.data.push(npc);
  }

  this.spawn = function() {
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].state == -1) {
        this.data[i].spawn();
      }
    }
  };

  this.spawnAt = function(x, y) {
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].state == -1) {
        this.data[i].spawnAt(x, y);
      }
    }
  };

  this.getRenderData = function() {
    var renderData = [];
    for (var i = 0; i < this.data.length; i++) {
      var npc = this.data[i];
      if (
        npc.state != -1 &&
        npc.x > camera.x - 8 * 64 &&
        npc.x < camera.x + 8 * 64 &&
        npc.y > camera.y - 8 * 64 &&
        npc.y < camera.y + 8 * 64
      ) {
        renderData.push(npc);
      }
    }
    return renderData;
  };

  this.update = function() {
    for (var i = 0; i < this.data.length; i++) {
      this.data[i].update();
    }
  };
}

var CURSOR_SPEED = 64;
var CURSOR_SPEED_Y = 48;
var Npc = function(context, camera, map) {
  this.x = 0;
  this.y = 48 * 5;
  this.z = 0;
  this.vx = 0;
  this.vy = 0;
  this.vz = 0;
  this.state = -1;
  this.lastStateChange = 0;
  this.stepsTaken = 0;
  this.face = 0;

  this.spawn = function() {
    var spawnTile = map.getSpawnTile();
    this.x = spawnTile.x;
    this.y = spawnTile.y + 64;
    this.z = spawnTile.z;
    this.state = 0;
    console.log("spawned at", this.x, this.y, this.z);
  };

  this.render = function() {
    var isoX = ((this.x - camera.x) / 64 - (this.z - camera.z) / 64) * 48 + 750;
    var isoY =
      ((this.x - camera.x) / 64 + (this.z - camera.z) / 64) * 24 +
      250 -
      (this.y - camera.y);
    switch (this.face) {
      case 0:
        context.drawImage(graphics, 1000, 188, 97, 98, isoX, isoY, 97, 98);
        break;
      case 1:
        context.drawImage(graphics, 1200, 50, 97, 98, isoX, isoY, 97, 98);
        break;
      case 2:
        context.drawImage(graphics, 1000, 50, 97, 98, isoX, isoY, 97, 98);
        break;
      case 3:
        context.drawImage(graphics, 1200, 188, 97, 98, isoX, isoY, 97, 98);
        break;
    }
  };

  this.update = function() {
    if (this.state == 0) {
      var tile = map.getTileAtPosition(this.x, this.y - CURSOR_SPEED_Y, this.z);
      while (!tile.solid) {
        this.y -= CURSOR_SPEED_Y;
        tile = map.getTileAtPosition(this.x, this.y - CURSOR_SPEED_Y, this.z);
      }
      this.state = 1;
    } else if (this.state == 1) {
      var tile = map.getTileAtPosition(this.x, this.y - 2, this.z);
      if (!tile.solid) {
        this.y -= 8;
        return;
      }
      if (Date.now() - this.lastStateChange > 100) {
        var rand = Math.floor(Math.random() * 8);
        if (rand == 0) {
          this.vz = 1;
          this.vx = 0;
          this.vy = 1;
          this.face = 3;
        } else if (rand == 1) {
          this.vz = -1;
          this.vx = 0;
          this.vy = 1;
          this.face = 2;
        } else if (rand == 2) {
          this.vz = 0;
          this.vx = 1;
          this.vy = 1;
          this.face = 1;
        } else if (rand == 3) {
          this.vz = 0;
          this.vx = -1;
          this.vy = 1;
          this.face = 0;
        }
        if (rand < 4) {
          var tile = map.getTileAtPosition(
            this.x + this.vx * CURSOR_SPEED,
            this.y,
            this.z + this.vz * CURSOR_SPEED
          );
          if (tile.solid) {
            tile = map.getTileAtPosition(
              tile.x,
              tile.y + CURSOR_SPEED_Y,
              tile.z
            );
            if (tile.solid) {
              this.vz = 0;
              this.vy = 0;
              this.vx = 0;
            } else {
              this.state = 3;
            }
          } else this.state = 2;
        }
      }
    } else if (this.state == 2) {
      this.x += (this.vx * CURSOR_SPEED) / 8;
      this.z += (this.vz * CURSOR_SPEED) / 8;
      this.y += this.vy * 8;
      this.stepsTaken++;
      if (this.stepsTaken == 4) {
        this.vy = -1;
      }
      if (this.stepsTaken == 8) {
        this.state = 1;
        this.stepsTaken = 0;
        this.lastStateChange = Date.now();
      }
    } else if (this.state == 3) {
      this.x += (this.vx * CURSOR_SPEED) / 8;
      this.z += (this.vz * CURSOR_SPEED) / 8;
      if (this.stepsTaken < 4) {
        this.y += (this.vy * CURSOR_SPEED_Y) / 2;
      } else if (this.stepsTaken >= 4) {
        this.y -= (this.vy * CURSOR_SPEED_Y) / 4;
      }
      this.stepsTaken++;
      if (this.stepsTaken == 8) {
        this.state = 1;
        this.stepsTaken = 0;
        this.lastStateChange = Date.now();
      }
    }
  };
}


var MAP_W = 128;
var MAP_D = 128;
var MAP_H = 5;
// outline 0
// grass 1
// dirt 2
// trunk 4
// leaves 5
// blank 6

var Map = function(context, camera) {
  this.data = [];

  this.getTileAtIndex = function(h, i, j) {
    if (h < 0 || i < 0 || j < 0 || h >= MAP_H || i >= MAP_D || j >= MAP_W) {
      return false;
    }
    return this.data[h][i][j];
  };

  this.getSpawnTile = function() {
    for (var i = 0; i < 1000; i++) {
      var randX = Math.floor(Math.random() * MAP_W);
      var randZ = Math.floor(Math.random() * MAP_D);
      if (this.data[1][randZ][randX].type == 1) {
        return this.data[1][randZ][randX];
      }
    }
  };

  this.automate = function(times, y, liveType, deadType) {
    for (var h = 0; h < times; h++) {
      for (var i = 0; i < MAP_D; i++) {
        for (var j = 0; j < MAP_W; j++) {
          if (
            this.data[y][i][j].type == liveType ||
            this.data[y][i][j].type == deadType
          ) {
            var north = this.getTileAtIndex(y, i, j - 1);
            var south = this.getTileAtIndex(y, i, j + 1);
            var east = this.getTileAtIndex(y, i - 1, j);
            var west = this.getTileAtIndex(y, i + 1, j);
            var northWest = this.getTileAtIndex(y, i + 1, j - 1);
            var northEast = this.getTileAtIndex(y, i - 1, j - 1);
            var southWest = this.getTileAtIndex(y, i + 1, j + 1);
            var southEast = this.getTileAtIndex(y, i - 1, j + 1);
            var liveCount = 0;
            if (north != false && north.type == liveType) liveCount++;
            if (south != false && south.type == liveType) liveCount++;
            if (east != false && east.type == liveType) liveCount++;
            if (west != false && west.type == liveType) liveCount++;
            if (northWest != false && northWest.type == liveType) liveCount++;
            if (northEast != false && northEast.type == liveType) liveCount++;
            if (southWest != false && southWest.type == liveType) liveCount++;
            if (southEast != false && southEast.type == liveType) liveCount++;
            if (this.data[y][i][j].type == liveType) liveCount++;

            if (liveCount >= 5) {
              this.data[y][i][j].type = liveType;
            } else {
              this.data[y][i][j].type = deadType;
            }
          }
        }
      }
    }
  };

  for (h = 0; h < MAP_H; h++) {
    this.data.push([]);
    for (var i = 0; i < MAP_D; i++) {
      this.data[h].push([]);
      for (var j = 0; j < MAP_W; j++) {
        var tile = new Tile(context, camera);
        tile.x = j * 64;
        tile.z = i * 64;
        tile.y = h * 48;
        tile.type = 3;
        this.data[h][i].push(tile);
      }
    }
  }

  // make dirt layer
  for (var i = 0; i < MAP_D; i++) {
    for (var j = 0; j < MAP_W; j++) {
      this.data[0][i][j].type = 2;
    }
  }

  // make grass layer
  for (var i = 0; i < MAP_D; i++) {
    for (var j = 0; j < MAP_W; j++) {
      this.data[1][i][j].type = 1;
    }
  }

  // make random water
  for (var i = 0; i < MAP_D; i++) {
    for (var j = 0; j < MAP_W; j++) {
      var rand = Math.floor(Math.random() * 100);
      if (rand < 48) {
        this.data[1][i][j].type = 8;
        //this.data[1][i][j].type = 2;
      }
    }
  }
  this.automate(10, 1, 8, 1);

  // make random elevation
  for (var i = 0; i < MAP_D; i++) {
    for (var j = 0; j < MAP_W; j++) {
      var rand = Math.floor(Math.random() * 100);
      if (rand < 48) {
        this.data[2][i][j].type = 1;
        //this.data[1][i][j].type = 2;
      }
    }
  }
  this.automate(10, 2, 1, 3);

  for (var i = 0; i < MAP_D; i++) {
    for (var j = 0; j < MAP_W; j++) {
      if (this.data[2][i][j].type == 1) {
        var rand = Math.floor(Math.random() * 100);
        if (rand < 15) {
          this.data[3][i][j].type = 1;
          //this.data[1][i][j].type = 2;
        }
      }
    }
  }
  // this.automate(7, 3, 1, 3);

  for (var i = 0; i < MAP_D; i++) {
    for (var j = 0; j < MAP_W; j++) {
      if (this.data[1][i][j].type == 1) {
        var rand = Math.floor(Math.random() * 100);
        if (rand < 42) {
          this.data[2][i][j].type = 4;
        }
      }
    }
  }
  this.automate(2, 2, 4, 3);

  for (var i = 0; i < MAP_D; i++) {
    for (var j = 0; j < MAP_W; j++) {
      if (this.data[2][i][j].type == 4) {
        this.data[3][i][j].type = 5;
        var rand = Math.floor(Math.random() * 100);
        if (rand < 25) {
          this.data[4][i][j].type = 5;
        }
      }
    }
  }

  var randX =
    Math.floor(Math.random() * Math.floor(MAP_W / 4)) + Math.floor(MAP_W / 4);
  var randZ =
    Math.floor(Math.random() * Math.floor(MAP_D / 4)) + Math.floor(MAP_D / 4);
  for (var i = 0; i < 16; i++) {
    this.data[1][randZ + i][randX].type = 7;
    this.data[2][randZ + i][randX].type = 3;
    this.data[3][randZ + i][randX].type = 3;
    this.data[4][randZ + i][randX].type = 3;

    this.data[1][randZ + i][randX + 16].type = 7;
    this.data[2][randZ + i][randX + 16].type = 3;
    this.data[3][randZ + i][randX + 16].type = 3;
    this.data[4][randZ + i][randX + 16].type = 3;

    this.data[1][randZ][randX + i].type = 7;
    this.data[2][randZ][randX + i].type = 3;
    this.data[3][randZ][randX + i].type = 3;
    this.data[4][randZ][randX + i].type = 3;

    this.data[1][randZ + 16][randX + i].type = 7;
    this.data[2][randZ + 16][randX + i].type = 3;
    this.data[3][randZ + 16][randX + i].type = 3;
    this.data[4][randZ + 16][randX + i].type = 3;
  }

  // for (var i = 0; i < MAP_D; i++) {
  //   for (var j = 0; j < MAP_W; j++) {
  //     if (this.data[1][i][j].type == 1) {
  //       var rand = Math.floor(Math.random() * 100);
  //       if (rand < 25) {
  //         this.data[1][i][j].type = 7;
  //       }
  //     }
  //   }
  // }

  // for (h = 2; h < 3; h++) {
  //   for (var i = 0; i < MAP_D; i++) {
  //     for (var j = 0; j < MAP_W; j++) {
  //       this.data[h][i][j].type = Math.floor(Math.random() * 6) == 0 ? 1 : 3;
  //       this.data[h - 1][i][j].type =
  //         this.data[h][i][j].type == 1 ? 2 : this.data[h - 1][i][j].type;
  //     }
  //   }
  // }

  // for (h = 1; h < 2; h++) {
  //   for (var i = 0; i < MAP_D; i++) {
  //     for (var j = 0; j < MAP_W; j++) {
  //       if (
  //         this.data[h][i][j].type == 1 &&
  //         Math.floor(Math.random() * 6) == 0
  //       ) {
  //         this.data[h + 1][i][j].type = 4;
  //         this.data[h + 1][i][j].solid = true;
  //         this.data[h + 2][i][j].type = 5;
  //         this.data[h + 2][i][j].solid = true;
  //       }
  //       //this.data[h][i][j].type = 5;
  //     }
  //   }
  // }

  for (var h = 0; h < this.data.length; h++) {
    for (var i = 0; i < this.data[h].length; i++) {
      for (var j = 0; j < this.data[h][i].length; j++) {
        var tile = this.data[h][i][j];
        if (tile.type == 1) {
          var underTile = this.getTileAtIndex(h - 1, i, j);
          if (underTile != false) {
            underTile.type = 2;
            underTile.solid = true;
          }
        }

        if (
          tile.type == 0 ||
          tile.type == 1 ||
          tile.type == 2 ||
          tile.type == 4 ||
          tile.type == 5 ||
          tile.type == 7
        ) {
          tile.solid = true;
        }
        // else tile.solid = false;
      }
    }
  }

  this.render = function() {
    for (var h = 0; h < this.data.length; h++) {
      for (var i = 0; i < this.data[h].length; i++) {
        for (var j = 0; j < this.data[h][i].length; j++) {
          this.data[h][i][j].render();
        }
      }
    }
  };

  this.getTileAtPosition = function(x, y, z) {
    if (
      x < 0 ||
      y < 0 ||
      z < 0 ||
      x > (MAP_W - 1) * 64 ||
      z > (MAP_D - 1) * 64 ||
      y > (MAP_H - 1) * 48
    )
      return false;
    return this.data[Math.floor(y / 48)][Math.floor(z / 64)][
      Math.floor(x / 64)
    ];
  };

  this.getRenderData = function() {
    var flattenedData = [];
    for (var h = 0; h < this.data.length; h++) {
      //y
      for (
        var i = Math.floor(camera.z / 64) - 8;
        i < Math.floor(camera.z / 64) + 8;
        i++
      ) {
        // z
        for (
          var j = Math.floor(camera.x / 64) - 8;
          j < Math.floor(camera.x / 64) + 8;
          j++
        ) {
          // x
          var target = this.getTileAtIndex(h, i, j);
          if (target != false) {
            flattenedData.push(target);
          }
        }
      }
    }
    return flattenedData;
  };
}

var CURSOR_SPEED = 64;
var CURSOR_SPEED_Y = 48;
var canvas = document.getElementById("canvas");
canvas.style.width = "800px";
canvas.style.height = "600px";
var context = canvas.getContext("2d");

//var cursor = new Cursor();
var ctrl = {
  w: false,
  a: false,
  s: false,
  d: false,
  r: false,
  f: false,
  j: false,
  up: false,
  down: false,
  left: false,
  right: false,
  key1: false,
  key2: false,
  key3: false,
  key4: false,
  key5: false,
  key6: false,
  key7: false,
  key8: false
};
var camera = new Camera(ctrl);
var map = new Map(context, camera);
var player = new Player(context, camera, map, ctrl);
var npcEngine = new NpcEngine(context, camera, map);

for (var i = 0; i < 12; i++) {
  npcEngine.spawn();
}

document.addEventListener("keydown", function(e) {
  console.log(e.keyCode);
  switch (e.keyCode) {
    case 87:
      ctrl.w = true;
      break;
    case 65:
      ctrl.a = true;
      break;
    case 83:
      ctrl.s = true;
      break;
    case 68:
      ctrl.d = true;
      break;
    case 82:
      ctrl.r = true;
      break;
    case 70:
      ctrl.f = true;
      break;
    case 74:
      ctrl.j = true;
      break;
    case 38:
      ctrl.up = true;
      break;
    case 40:
      ctrl.down = true;
      break;
    case 37:
      ctrl.left = true;
      break;
    case 39:
      ctrl.right = true;
      break;
    case 49:
      ctrl.key1 = true;
      break;
    case 50:
      ctrl.key2 = true;
      break;
    case 51:
      ctrl.key3 = true;
      break;
    case 52:
      ctrl.key4 = true;
      break;
    case 53:
      ctrl.key5 = true;
      break;
    case 54:
      ctrl.key6 = true;
      break;
    case 55:
      ctrl.key7 = true;
      break;
    case 56:
      ctrl.key8 = true;
      break;
  }
});

document.addEventListener("keyup", function(e) {
  switch (e.keyCode) {
    case 87:
      ctrl.w = false;
      break;
    case 65:
      ctrl.a = false;
      break;
    case 83:
      ctrl.s = false;
      break;
    case 68:
      ctrl.d = false;
      break;
    case 82:
      ctrl.r = false;
      break;
    case 70:
      ctrl.f = false;
      break;
    case 74:
      ctrl.j = false;
      break;
    case 38:
      ctrl.up = false;
      break;
    case 40:
      ctrl.down = false;
      break;
    case 37:
      ctrl.left = false;
      break;
    case 39:
      ctrl.right = false;
      break;
    case 49:
      ctrl.key1 = false;
      break;
    case 50:
      ctrl.key2 = false;
      break;
    case 51:
      ctrl.key3 = false;
      break;
    case 52:
      ctrl.key4 = false;
      break;
    case 53:
      ctrl.key5 = false;
      break;
    case 54:
      ctrl.key6 = false;
      break;
    case 55:
      ctrl.key7 = false;
      break;
    case 56:
      ctrl.key8 = false;
      break;
  }
});

function Render() {
  var mapRenderData = map.getRenderData();
  var npcRenderData = npcEngine.getRenderData();
  var renderData = [player];
  for (var i = 0; i < mapRenderData.length; i++) {
    renderData.push(mapRenderData[i]);
  }
  for (var i = 0; i < npcRenderData.length; i++) {
    renderData.push(npcRenderData[i]);
  }

  var zBuffer = [];
  while (renderData.length > 0) {
    var lowest = renderData[0];
    for (var j = 0; j < renderData.length; j++) {
      if (
        renderData[j].x + renderData[j].y + renderData[j].z <
        lowest.x + lowest.y + lowest.z
      ) {
        lowest = renderData[j];
      }
    }
    zBuffer.push(lowest);
    renderData.splice(renderData.indexOf(lowest), 1);
  }
  for (var i = 0; i < zBuffer.length; i++) {
    zBuffer[i].render();
  }
  //if (!drewPlayer) player.render();
}

function Run() {
  player.update();
  camera.update();
  npcEngine.update();
  // cursor.update();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#6565ff";
  context.fillRect(0, 0, 1600, 1200);
  // map.render();
  Render();

  setTimeout(Run, 1000 / 60);
}
Run();

function Cursor() {
  this.x = 0;
  this.y = 48 * 5;
  this.z = 0;
  this.lastMove = 0;
  this.lastSelect = 0;

  this.render = function() {
    var isoX = ((this.x - camera.x) / 64 - (this.z - camera.z) / 64) * 48 + 750;
    var isoY =
      ((this.x - camera.x) / 64 + (this.z - camera.z) / 64) * 24 +
      250 -
      (this.y - camera.y);
    context.drawImage(graphics, 0, 188, 97, 98, isoX, isoY, 97, 98);
  };

  this.update = function() {
    var tile = map.getTileAtPosition(this.x, this.y - 2, this.z);
    //while(!tile.solid) {
    //if (!tile.solid) this.y -= CURSOR_SPEED_Y;
    //tile = map.getTileAtPosition(this.x, this.y - 2, this.z);
    //if (!tile)break;
    //}
    if (!tile.solid) this.y -= 8;

    if (Date.now() - this.lastMove > 200) {
      //console.log(Math.floor(this.x/64), Math.floor(this.y/48), Math.floor(this.z/64));
      var tile = map.getTileAtPosition(this.x, this.y, this.z);
      this.lastMove = Date.now();
      if (ctrl.s) {
        this.y = 48 * 6;
        this.z += CURSOR_SPEED;
      }
      if (ctrl.w) {
        this.y = 48 * 6;
        this.z -= CURSOR_SPEED;
      }
      if (ctrl.d) {
        this.y = 48 * 6;
        this.x += CURSOR_SPEED;
      }
      if (ctrl.a) {
        this.y = 48 * 6;
        this.x -= CURSOR_SPEED;
      }
      if (ctrl.r) {
        this.y += CURSOR_SPEED_Y;
      }
      if (ctrl.f) {
        this.y -= CURSOR_SPEED_Y;
      }
    }

    if (Date.now() - this.lastSelect > 200) {
      var tile = map.getTileAtPosition(this.x, this.y - 2, this.z);
      if (ctrl.j) {
        if (tile) {
          tile.type = 6;
          tile.solid = false;
        }
        this.lastSelect = Date.now();
      }
    }
  };
}
