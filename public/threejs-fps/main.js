/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/assets/graphics.png":
/*!************************************!*\
  !*** ./client/assets/graphics.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"0e66cc149214e02e316db85016103196.png\";\n\n//# sourceURL=webpack:///./client/assets/graphics.png?");

/***/ }),

/***/ "./client/controller.js":
/*!******************************!*\
  !*** ./client/controller.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\r\n  this.w = false;\r\n  this.a = false;\r\n  this.s = false;\r\n  this.d = false;\r\n  this.mouseButton = false;\r\n  this.space = false;\r\n  this.esc = false;\r\n\r\n  this.handleStateChange = function(keyCode, isPressed) {\r\n    switch (keyCode) {\r\n      case 87:\r\n        this.w = isPressed;\r\n        break;\r\n      case 65:\r\n        this.a = isPressed;\r\n        break;\r\n      case 83:\r\n        this.s = isPressed;\r\n        break;\r\n      case 68:\r\n        this.d = isPressed;\r\n        break;\r\n      case 32:\r\n        this.space = isPressed;\r\n        break;\r\n      case 27:\r\n        this.esc = isPressed;\r\n        break;\r\n    }\r\n  };\r\n});\r\n\n\n//# sourceURL=webpack:///./client/controller.js?");

/***/ }),

/***/ "./client/index.js":
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _twoDRenderer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./twoDRenderer.js */ \"./client/twoDRenderer.js\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.js */ \"./client/player.js\");\n/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map.js */ \"./client/map.js\");\n/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controller.js */ \"./client/controller.js\");\n\r\n\r\n\r\n\r\n\r\nvar PI_2 = Math.PI / 2;\r\n\r\nwindow.onload = function() {\r\n  var havePointerLock =\r\n    \"pointerLockElement\" in document ||\r\n    \"mozPointerLockElement\" in document ||\r\n    \"webkitPointerLockElement\" in document;\r\n\r\n  var canvas = document.getElementById(\"canvas\");\r\n  canvas.width = window.innerWidth;\r\n  canvas.height = window.innerHeight;\r\n  var context = canvas.getContext(\"2d\");\r\n\r\n  // Ask the browser to release the pointer\r\n  // document.exitPointerLock = document.exitPointerLock ||\r\n  // \t\t\t   document.mozExitPointerLock ||\r\n  // \t\t\t   document.webkitExitPointerLock;\r\n  // document.exitPointerLock();\r\n\r\n  var scene = new THREE.Scene();\r\n  var camera = new THREE.PerspectiveCamera(\r\n    80,\r\n    window.innerWidth / window.innerHeight,\r\n    1,\r\n    9000\r\n  );\r\n\r\n  camera.rotation.order = \"YXZ\";\r\n  camera.rotation.set(0, 0, 0);\r\n\r\n  var ctrl = new _controller_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\r\n\r\n  document.addEventListener(\"keydown\", event => {\r\n    ctrl.handleStateChange(event.keyCode, true);\r\n  });\r\n\r\n  document.addEventListener(\"keyup\", event => {\r\n    ctrl.handleStateChange(event.keyCode, false);\r\n  });\r\n\r\n  document.addEventListener(\"mouseup\", event => {\r\n    ctrl.mouseButton = false;\r\n  });\r\n\r\n  var renderer = new THREE.WebGLRenderer();\r\n  renderer.setPixelRatio(window.devicePixelRatio);\r\n  renderer.setSize(window.innerWidth, window.innerHeight);\r\n  renderer.setClearColor(0x4444ff);\r\n  document.body.appendChild(renderer.domElement);\r\n\r\n  var map = new _map_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](scene);\r\n  var player = new _player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](camera, ctrl, map);\r\n\r\n  var twoDRenderer = new _twoDRenderer_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas, context, player);\r\n\r\n  document.addEventListener(\"mousedown\", event => {\r\n    renderer.domElement.requestPointerLock =\r\n      renderer.domElement.requestPointerLock ||\r\n      renderer.domElement.mozRequestPointerLock;\r\n    renderer.domElement.requestPointerLock();\r\n    player.pointerIsLockedFlag = true;\r\n    ctrl.mouseButton = true;\r\n  });\r\n\r\n  document.addEventListener(\"mousemove\", event => {\r\n    player.handleMouseMove(event);\r\n  });\r\n\r\n  function animate() {\r\n    requestAnimationFrame(animate);\r\n    player.update();\r\n    twoDRenderer.render();\r\n    renderer.render(scene, camera);\r\n  }\r\n  animate();\r\n};\r\n\n\n//# sourceURL=webpack:///./client/index.js?");

/***/ }),

/***/ "./client/map.js":
/*!***********************!*\
  !*** ./client/map.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(scene) {\r\n  // make map\r\n  // ground\r\n  var geometry = new THREE.BoxGeometry(100, 1, 100);\r\n  // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });\r\n  var grassTexture = new THREE.ImageUtils.loadTexture(\"./grass.jpg\", function(\r\n    texture\r\n  ) {\r\n    texture.wrapS = THREE.RepeatWrapping;\r\n    texture.wrapT = THREE.RepeatWrapping;\r\n    texture.repeat.x = 10;\r\n    texture.repeat.y = 10;\r\n  });\r\n  var boxMaterial1 = new THREE.MeshBasicMaterial({\r\n    map: grassTexture,\r\n    reflectivity: 0.8\r\n  });\r\n  var ground = new THREE.Mesh(geometry, boxMaterial1);\r\n  ground.position.z = 0;\r\n  ground.position.x = 0;\r\n  ground.position.y = 0;\r\n  scene.add(ground);\r\n\r\n  // boxes\r\n  this.walls = [];\r\n  var brickTexture = new THREE.ImageUtils.loadTexture(\"./brick.png\");\r\n  var brickMaterial = new THREE.MeshBasicMaterial({\r\n    map: brickTexture,\r\n    reflectivity: 0.8\r\n  });\r\n  // var cubeMat = new THREE.MeshBasicMaterial({ color: 0x444444 });\r\n  this.map = [];\r\n  for (var i = 0; i < 10; i++) {\r\n    this.map.push([]);\r\n    for (var j = 0; j < 10; j++) {\r\n      if (i != 9 || j != 9) {\r\n        if (Math.floor(Math.random() * 10) < 3) {\r\n          this.map[i].push(1);\r\n          var cubeGeo = new THREE.BoxGeometry(10, 10, 10);\r\n          // var cube = new THREE.Mesh(cubeGeo, cubeMat);\r\n          var cube = new THREE.Mesh(cubeGeo, brickMaterial);\r\n          cube.position.x = i * 10 - 50 + 5;\r\n          cube.position.z = j * 10 - 50 + 5;\r\n          cube.position.y = 5;\r\n          this.walls.push(cube);\r\n          scene.add(cube);\r\n        } else {\r\n          this.map[i].push(0);\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  this.checkCollision = function(body) {\r\n    var originPoint = body.position.clone();\r\n  };\r\n\r\n  this.getTileAt = function(x, y) {\r\n    var indexI = Math.floor((x + 50) / 10);\r\n    var indexJ = Math.floor((y + 50) / 10);\r\n    // console.log(indexI, indexJ);\r\n    if (indexI >= 0 && indexJ >= 0 && indexI < 10 && indexJ < 10) {\r\n      return this.map[indexI][indexJ];\r\n    }\r\n    return false;\r\n  };\r\n});\r\n\n\n//# sourceURL=webpack:///./client/map.js?");

/***/ }),

/***/ "./client/player.js":
/*!**************************!*\
  !*** ./client/player.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(camera, ctrl, map) {\r\n  this.pointerIsLockedFlag = false;\r\n  this.shooting = false;\r\n  this.lastShot = 0;\r\n  this.jumping = false;\r\n  this.lastJump = 0;\r\n  this.jumpCount = 0;\r\n\r\n  camera.position.z = 50;\r\n  camera.position.x = 50;\r\n\r\n  this.forwardLock = false;\r\n  this.backwardLock = false;\r\n  this.leftLock = false;\r\n  this.rightLock = false;\r\n\r\n  this.downRay = new THREE.Raycaster(\r\n    new THREE.Vector3(),\r\n    new THREE.Vector3(0, -1, 0),\r\n    0,\r\n    2\r\n  );\r\n  this.upRay = new THREE.Raycaster(\r\n    new THREE.Vector3(),\r\n    new THREE.Vector3(0, 1, 0),\r\n    0,\r\n    2\r\n  );\r\n  this.forwardRay = new THREE.Raycaster(\r\n    new THREE.Vector3(),\r\n    new THREE.Vector3(0, 0, -1),\r\n    0,\r\n    2\r\n  );\r\n  this.backwardRay = new THREE.Raycaster(\r\n    new THREE.Vector3(),\r\n    new THREE.Vector3(),\r\n    0,\r\n    2\r\n  );\r\n  this.leftRay = new THREE.Raycaster(\r\n    new THREE.Vector3(),\r\n    new THREE.Vector3(),\r\n    0,\r\n    2\r\n  );\r\n  this.rightRay = new THREE.Raycaster(\r\n    new THREE.Vector3(),\r\n    new THREE.Vector3(),\r\n    0,\r\n    2\r\n  );\r\n  this.rightStrafeRay = new THREE.Raycaster(\r\n    new THREE.Vector3(),\r\n    new THREE.Vector3(),\r\n    0,\r\n    2\r\n  );\r\n  this.leftStrafeRay = new THREE.Raycaster(\r\n    new THREE.Vector3(),\r\n    new THREE.Vector3(),\r\n    0,\r\n    2\r\n  );\r\n  // console.log(\"forwardRay\", this.forwardRay);\r\n\r\n  this.handleMouseMove = function(event) {\r\n    if (this.pointerIsLockedFlag) {\r\n      var movementX =\r\n        event.movementX || event.mozMovementX || event.webkitMovementX || 0;\r\n      var movementY =\r\n        event.movementY || event.mozMovementY || event.webkitMovementY || 0;\r\n\r\n      camera.rotation.y -= movementX * 0.002;\r\n      if (\r\n        camera.rotation.x - movementY * 0.002 < 1.5 &&\r\n        camera.rotation.x - movementY * 0.002 > -1.5\r\n      )\r\n        camera.rotation.x -= movementY * 0.002;\r\n    }\r\n  };\r\n\r\n  this.camDir = camera.getWorldDirection().negate(); //\r\n\r\n  this.updateRaycasters = function() {\r\n    // console.log(this.downRay);\r\n    this.upRay.ray.origin.copy(camera.position);\r\n    this.downRay.ray.origin.copy(camera.position);\r\n    this.forwardRay.ray.set(camera.position, this.camDir);\r\n    this.backwardRay.ray.set(camera.position, this.camDir.negate());\r\n    this.leftRay.ray.set(\r\n      camera.position,\r\n      this.camDir.applyMatrix4(\r\n        new THREE.Matrix4().makeRotationY(-(Math.PI / 2))\r\n      )\r\n    );\r\n    this.rightRay.ray.set(\r\n      camera.position,\r\n      this.camDir.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI))\r\n    );\r\n    this.rightStrafeRay.ray.set(\r\n      camera.position,\r\n      this.camDir.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 4))\r\n    ); // Working\r\n    this.leftStrafeRay.ray.set(\r\n      camera.position,\r\n      this.camDir.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 4))\r\n    );\r\n  };\r\n\r\n  this.downIntersect = this.downRay.intersectObjects(map.walls);\r\n  this.upIntersect = this.upRay.intersectObjects(map.walls);\r\n  this.forwardIntersect = this.forwardRay.intersectObjects(map.walls);\r\n  this.backwardIntersect = this.backwardRay.intersectObjects(map.walls);\r\n  this.leftIntersect = this.leftRay.intersectObjects(map.walls);\r\n  this.rightIntersect = this.rightRay.intersectObjects(map.walls);\r\n  this.rightStrafeIntersect = this.rightStrafeRay.intersectObjects(map.walls);\r\n  this.leftStrafeIntersect = this.leftStrafeRay.intersectObjects(map.walls);\r\n\r\n  // console.log(\"map.walls\", map.walls);\r\n  // console.log(\"forwardIntersect\", this.forwardIntersect);\r\n  this.checkIntersections = function() {\r\n    this.downIntersect = this.downRay.intersectObjects(map.walls);\r\n    this.upIntersect = this.upRay.intersectObjects(map.walls);\r\n    this.forwardIntersect = this.forwardRay.intersectObjects(map.walls);\r\n    this.backwardIntersect = this.backwardRay.intersectObjects(map.walls);\r\n    this.leftIntersect = this.leftRay.intersectObjects(map.walls);\r\n    this.rightIntersect = this.rightRay.intersectObjects(map.walls);\r\n    this.rightStrafeIntersect = this.rightStrafeRay.intersectObjects(map.walls);\r\n    this.leftStrafeIntersect = this.leftStrafeRay.intersectObjects(map.walls);\r\n\r\n    if (this.forwardIntersect.length > 0) this.forwardLock = true;\r\n    if (this.backwardIntersect.length > 0) this.backwardLock = true;\r\n    if (this.leftIntersect.length > 0) this.leftLock = true;\r\n    if (this.rightIntersect.length > 0) this.rightLock = true;\r\n  };\r\n\r\n  this.update = function() {\r\n    this.camDir = camera.getWorldDirection().negate();\r\n    this.forwardLock = false;\r\n    this.backwardLock = false;\r\n    this.leftLock = false;\r\n    this.rightLock = false;\r\n    this.updateRaycasters();\r\n    this.checkIntersections();\r\n    if (this.forwardIntersect.length > 0)\r\n      console.log(this.forwardIntersect[0].distance);\r\n    if (ctrl.mouseButton && Date.now() - this.lastShot > 100) {\r\n      this.shooting = true;\r\n      this.lastShot = Date.now();\r\n    }\r\n\r\n    if (ctrl.space && Date.now() - this.lastJump > 1000) {\r\n      this.lastJump = Date.now();\r\n      this.jumping = true;\r\n      this.jumpCount = 0;\r\n    }\r\n\r\n    if (this.shooting) {\r\n      if (Date.now() - this.lastShot > 50) {\r\n        this.shooting = false;\r\n      }\r\n    }\r\n    camera.position.y = 2;\r\n\r\n    var vx = 0;\r\n    var vz = 0;\r\n    if (ctrl.s && !this.backwardLock) vz = 1;\r\n    if (ctrl.w && !this.forwardLock) vz = -1;\r\n    if (ctrl.a && !this.leftLock) vx = -1;\r\n    if (ctrl.d && !this.rightLock) vx = 1;\r\n    camera.translateZ(0.4 * vz);\r\n    camera.translateX(0.4 * vx);\r\n\r\n    // var nwTile = map.getTileAt(\r\n    //   camera.position.x - 0.6,\r\n    //   camera.position.z - 0.6\r\n    // );\r\n    // var neTile = map.getTileAt(\r\n    //   camera.position.x + 0.6,\r\n    //   camera.position.z - 0.6\r\n    // );\r\n    // var swTile = map.getTileAt(\r\n    //   camera.position.x - 0.6,\r\n    //   camera.position.z + 0.6\r\n    // );\r\n    // var seTile = map.getTileAt(\r\n    //   camera.position.x + 0.6,\r\n    //   camera.position.z + 0.6\r\n    // );\r\n    // // console.log(nwTile == 1 && neTile == 1 && swTile == 1 && seTile == 1);\r\n    // if (nwTile == 1 && neTile == 1 && swTile == 1 && seTile == 1) {\r\n    //   camera.translateZ(0.4 * -vz);\r\n    //   camera.translateX(0.4 * -vx);\r\n    // }\r\n  };\r\n});\r\n\n\n//# sourceURL=webpack:///./client/player.js?");

/***/ }),

/***/ "./client/twoDRenderer.js":
/*!********************************!*\
  !*** ./client/twoDRenderer.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_graphics_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/graphics.png */ \"./client/assets/graphics.png\");\n/* harmony import */ var _assets_graphics_png__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_graphics_png__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(canvas, context, player) {\r\n  var graphics = new Image();\r\n  graphics.src = _assets_graphics_png__WEBPACK_IMPORTED_MODULE_0___default.a;\r\n  this.update = function() {};\r\n\r\n  this.render = function() {\r\n    context.clearRect(0, 0, canvas.width, canvas.height);\r\n    context.fillStyle = \"#ff0000\";\r\n    // context.fillRect(0, 0, canvas.width, canvas.height);\r\n    if (player.shooting) {\r\n      context.drawImage(\r\n        graphics,\r\n        260,\r\n        0,\r\n        70,\r\n        60,\r\n        canvas.width - 450,\r\n        canvas.height - 250,\r\n        164 * 2,\r\n        200\r\n      );\r\n      context.drawImage(\r\n        graphics,\r\n        0,\r\n        0,\r\n        164,\r\n        100,\r\n        canvas.width - 310,\r\n        canvas.height - 100 * 2,\r\n        164 * 2,\r\n        100 * 2\r\n      );\r\n    }\r\n    if (!player.shooting) {\r\n      context.drawImage(\r\n        graphics,\r\n        0,\r\n        0,\r\n        164,\r\n        100,\r\n        canvas.width - 164 * 2,\r\n        canvas.height - 100 * 2,\r\n        164 * 2,\r\n        100 * 2\r\n      );\r\n    }\r\n\r\n    context.drawImage(\r\n      graphics,\r\n      200,\r\n      0,\r\n      28,\r\n      28,\r\n      canvas.width / 2,\r\n      canvas.height / 2,\r\n      28,\r\n      28\r\n    );\r\n  };\r\n});\r\n\n\n//# sourceURL=webpack:///./client/twoDRenderer.js?");

/***/ })

/******/ });