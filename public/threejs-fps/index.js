var Controller = function() {
    this.w = false;
    this.a = false;
    this.s = false;
    this.d = false;
    this.mouseButton = false;
    this.space = false;
    this.esc = false;
  
    this.handleStateChange = function(keyCode, isPressed) {
      switch (keyCode) {
        case 87:
          this.w = isPressed;
          break;
        case 65:
          this.a = isPressed;
          break;
        case 83:
          this.s = isPressed;
          break;
        case 68:
          this.d = isPressed;
          break;
        case 32:
          this.space = isPressed;
          break;
        case 27:
          this.esc = isPressed;
          break;
      }
    };
  }
  
  
  var Map = function(scene) {
    // make map
    // ground
    var geometry = new THREE.BoxGeometry(100, 1, 100);
    // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var grassTexture = new THREE.ImageUtils.loadTexture("../threejs-fps/grass.jpg", function(
      texture
    ) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.x = 10;
      texture.repeat.y = 10;
    });
    var boxMaterial1 = new THREE.MeshBasicMaterial({
      map: grassTexture,
      reflectivity: 0.8
    });
    var ground = new THREE.Mesh(geometry, boxMaterial1);
    ground.position.z = 0;
    ground.position.x = 0;
    ground.position.y = 0;
    scene.add(ground);
  
    // boxes
    this.walls = [];
    var brickTexture = new THREE.ImageUtils.loadTexture("../threejs-fps/brick.png");
    var brickMaterial = new THREE.MeshBasicMaterial({
      map: brickTexture,
      reflectivity: 0.8
    });
    // var cubeMat = new THREE.MeshBasicMaterial({ color: 0x444444 });
    this.map = [];
    for (var i = 0; i < 10; i++) {
      this.map.push([]);
      for (var j = 0; j < 10; j++) {
        if (i != 9 || j != 9) {
          if (Math.floor(Math.random() * 10) < 3) {
            this.map[i].push(1);
            var cubeGeo = new THREE.BoxGeometry(10, 10, 10);
            // var cube = new THREE.Mesh(cubeGeo, cubeMat);
            var cube = new THREE.Mesh(cubeGeo, brickMaterial);
            cube.position.x = i * 10 - 50 + 5;
            cube.position.z = j * 10 - 50 + 5;
            cube.position.y = 5;
            this.walls.push(cube);
            scene.add(cube);
          } else {
            this.map[i].push(0);
          }
        }
      }
    }
  
    this.checkCollision = function(body) {
      var originPoint = body.position.clone();
    };
  
    this.getTileAt = function(x, y) {
      var indexI = Math.floor((x + 50) / 10);
      var indexJ = Math.floor((y + 50) / 10);
      // console.log(indexI, indexJ);
      if (indexI >= 0 && indexJ >= 0 && indexI < 10 && indexJ < 10) {
        return this.map[indexI][indexJ];
      }
      return false;
    };
  }
  
  
  var Player = function(camera, ctrl, map) {
    this.pointerIsLockedFlag = false;
    this.shooting = false;
    this.lastShot = 0;
    this.jumping = false;
    this.lastJump = 0;
    this.jumpCount = 0;
  
    camera.position.z = 50;
    camera.position.x = 50;
  
    this.forwardLock = false;
    this.backwardLock = false;
    this.leftLock = false;
    this.rightLock = false;
  
    this.downRay = new THREE.Raycaster(
      new THREE.Vector3(),
      new THREE.Vector3(0, -1, 0),
      0,
      2
    );
    this.upRay = new THREE.Raycaster(
      new THREE.Vector3(),
      new THREE.Vector3(0, 1, 0),
      0,
      2
    );
    this.forwardRay = new THREE.Raycaster(
      new THREE.Vector3(),
      new THREE.Vector3(0, 0, -1),
      0,
      2
    );
    this.backwardRay = new THREE.Raycaster(
      new THREE.Vector3(),
      new THREE.Vector3(),
      0,
      2
    );
    this.leftRay = new THREE.Raycaster(
      new THREE.Vector3(),
      new THREE.Vector3(),
      0,
      2
    );
    this.rightRay = new THREE.Raycaster(
      new THREE.Vector3(),
      new THREE.Vector3(),
      0,
      2
    );
    this.rightStrafeRay = new THREE.Raycaster(
      new THREE.Vector3(),
      new THREE.Vector3(),
      0,
      2
    );
    this.leftStrafeRay = new THREE.Raycaster(
      new THREE.Vector3(),
      new THREE.Vector3(),
      0,
      2
    );
    // console.log("forwardRay", this.forwardRay);
  
    this.handleMouseMove = function(event) {
      if (this.pointerIsLockedFlag) {
        var movementX =
          event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY =
          event.movementY || event.mozMovementY || event.webkitMovementY || 0;
  
        camera.rotation.y -= movementX * 0.002;
        if (
          camera.rotation.x - movementY * 0.002 < 1.5 &&
          camera.rotation.x - movementY * 0.002 > -1.5
        )
          camera.rotation.x -= movementY * 0.002;
      }
    };
  
    this.camDir = camera.getWorldDirection().negate(); //
  
    this.updateRaycasters = function() {
      // console.log(this.downRay);
      this.upRay.ray.origin.copy(camera.position);
      this.downRay.ray.origin.copy(camera.position);
      this.forwardRay.ray.set(camera.position, this.camDir);
      this.backwardRay.ray.set(camera.position, this.camDir.negate());
      this.leftRay.ray.set(
        camera.position,
        this.camDir.applyMatrix4(
          new THREE.Matrix4().makeRotationY(-(Math.PI / 2))
        )
      );
      this.rightRay.ray.set(
        camera.position,
        this.camDir.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI))
      );
      this.rightStrafeRay.ray.set(
        camera.position,
        this.camDir.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 4))
      ); // Working
      this.leftStrafeRay.ray.set(
        camera.position,
        this.camDir.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 4))
      );
    };
  
    this.downIntersect = this.downRay.intersectObjects(map.walls);
    this.upIntersect = this.upRay.intersectObjects(map.walls);
    this.forwardIntersect = this.forwardRay.intersectObjects(map.walls);
    this.backwardIntersect = this.backwardRay.intersectObjects(map.walls);
    this.leftIntersect = this.leftRay.intersectObjects(map.walls);
    this.rightIntersect = this.rightRay.intersectObjects(map.walls);
    this.rightStrafeIntersect = this.rightStrafeRay.intersectObjects(map.walls);
    this.leftStrafeIntersect = this.leftStrafeRay.intersectObjects(map.walls);
  
    // console.log("map.walls", map.walls);
    // console.log("forwardIntersect", this.forwardIntersect);
    this.checkIntersections = function() {
      this.downIntersect = this.downRay.intersectObjects(map.walls);
      this.upIntersect = this.upRay.intersectObjects(map.walls);
      this.forwardIntersect = this.forwardRay.intersectObjects(map.walls);
      this.backwardIntersect = this.backwardRay.intersectObjects(map.walls);
      this.leftIntersect = this.leftRay.intersectObjects(map.walls);
      this.rightIntersect = this.rightRay.intersectObjects(map.walls);
      this.rightStrafeIntersect = this.rightStrafeRay.intersectObjects(map.walls);
      this.leftStrafeIntersect = this.leftStrafeRay.intersectObjects(map.walls);
  
      // if (this.forwardIntersect.length > 0) this.forwardLock = true;
      // if (this.backwardIntersect.length > 0) this.backwardLock = true;
      // if (this.leftIntersect.length > 0) this.leftLock = true;
      // if (this.rightIntersect.length > 0) this.rightLock = true;
    };
  
    this.update = function() {
      this.camDir = camera.getWorldDirection().negate();
      this.forwardLock = false;
      this.backwardLock = false;
      this.leftLock = false;
      this.rightLock = false;
      this.updateRaycasters();
      this.checkIntersections();
      if (this.forwardIntersect.length > 0)
        console.log(this.forwardIntersect[0].distance);
      if (ctrl.mouseButton && Date.now() - this.lastShot > 100) {
        this.shooting = true;
        this.lastShot = Date.now();
      }
  
      if (ctrl.space && Date.now() - this.lastJump > 1000) {
        this.lastJump = Date.now();
        this.jumping = true;
        this.jumpCount = 0;
      }
  
      if (this.shooting) {
        if (Date.now() - this.lastShot > 50) {
          this.shooting = false;
        }
      }
      camera.position.y = 2;
  
      var vx = 0;
      var vz = 0;
      if (ctrl.s && !this.backwardLock) vz = 1;
      if (ctrl.w && !this.forwardLock) vz = -1;
      if (ctrl.a && !this.leftLock) vx = -1;
      if (ctrl.d && !this.rightLock) vx = 1;
      camera.translateZ(0.4 * vz);
      camera.translateX(0.4 * vx);
  
      // var nwTile = map.getTileAt(
      //   camera.position.x - 0.6,
      //   camera.position.z - 0.6
      // );
      // var neTile = map.getTileAt(
      //   camera.position.x + 0.6,
      //   camera.position.z - 0.6
      // );
      // var swTile = map.getTileAt(
      //   camera.position.x - 0.6,
      //   camera.position.z + 0.6
      // );
      // var seTile = map.getTileAt(
      //   camera.position.x + 0.6,
      //   camera.position.z + 0.6
      // );
      // // console.log(nwTile == 1 && neTile == 1 && swTile == 1 && seTile == 1);
      // if (nwTile == 1 && neTile == 1 && swTile == 1 && seTile == 1) {
      //   camera.translateZ(0.4 * -vz);
      //   camera.translateX(0.4 * -vx);
      // }
    };
  }
  
  var TwoDRenderer = function(canvas, context, player) {
    var graphics = new Image();
    graphics.src = '../threejs-fps/graphics.png';
    this.update = function() {};
  
    this.render = function() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#ff0000";
      // context.fillRect(0, 0, canvas.width, canvas.height);
      if (player.shooting) {
        context.drawImage(
          graphics,
          260,
          0,
          70,
          60,
          canvas.width - 450,
          canvas.height - 250,
          164 * 2,
          200
        );
        context.drawImage(
          graphics,
          0,
          0,
          164,
          100,
          canvas.width - 310,
          canvas.height - 100 * 2,
          164 * 2,
          100 * 2
        );
      }
      if (!player.shooting) {
        context.drawImage(
          graphics,
          0,
          0,
          164,
          100,
          canvas.width - 164 * 2,
          canvas.height - 100 * 2,
          164 * 2,
          100 * 2
        );
      }
  
      context.drawImage(
        graphics,
        200,
        0,
        28,
        28,
        canvas.width / 2,
        canvas.height / 2,
        28,
        28
      );
    };
  }
  
  var PI_2 = Math.PI / 2;
  
  window.onload = function() {
    var havePointerLock =
      "pointerLockElement" in document ||
      "mozPointerLockElement" in document ||
      "webkitPointerLockElement" in document;
  
    var canvas = document.getElementById("canvas");
    canvas.width = 800;
    canvas.height = 600;
    var context = canvas.getContext("2d");
  
    // Ask the browser to release the pointer
    // document.exitPointerLock = document.exitPointerLock ||
    // 			   document.mozExitPointerLock ||
    // 			   document.webkitExitPointerLock;
    // document.exitPointerLock();
  
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      80,
      800 / 600,
      1,
      9000
    );
  
    camera.rotation.order = "YXZ";
    camera.rotation.set(0, 0, 0);
  
    var ctrl = new Controller();
  
    document.addEventListener("keydown", event => {
      ctrl.handleStateChange(event.keyCode, true);
    });
  
    document.addEventListener("keyup", event => {
      ctrl.handleStateChange(event.keyCode, false);
    });
  
    document.addEventListener("mouseup", event => {
      ctrl.mouseButton = false;
    });
  
    console.log("creating renderer");

    var renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(800, 600);
    renderer.setClearColor(0x4444ff);
 $("#game-wrapper").append(renderer.domElement);

    console.log(renderer);
  
    var map = new Map(scene);
    var player = new Player(camera, ctrl, map);
  
    var twoDRenderer = new TwoDRenderer(canvas, context, player);
  
    document.addEventListener("mousedown", event => {
      renderer.domElement.requestPointerLock =
        renderer.domElement.requestPointerLock ||
        renderer.domElement.mozRequestPointerLock;
      renderer.domElement.requestPointerLock();
      player.pointerIsLockedFlag = true;
      ctrl.mouseButton = true;
    });
  
    document.addEventListener("mousemove", event => {
      player.handleMouseMove(event);
    });
  
    function animate() {
      requestAnimationFrame(animate);
      player.update();
      twoDRenderer.render();
      renderer.render(scene, camera);
    }
    animate();
  };