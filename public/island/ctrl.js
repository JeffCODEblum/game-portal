function initCtrl(ctrl) {
	document.addEventListener("mousemove", function(e) {
		ctrl.mouseX = e.mouseX;
		ctrl.mouseY = e.mouseY;
	});
	document.addEventListener("keydown", function(e) {
		e.preventDefault();
		switch(e.keyCode) {
			case 87:
			ctrl.up = 1;
			break;
			case 83:
			ctrl.down = 1;
			break;
			case 65:
			ctrl.right = 1;
			break;
			case 68:
			ctrl.left = 1;
			break;
			case 74:
			ctrl.j = 1;
			break;
			case 75:
			ctrl.k = 1;
			default:
			//console.log(e.keyCode);
			break;
		}
	});
	document.addEventListener("keyup", function(e) {
		e.preventDefault;
		switch(e.keyCode) {
			case 87:
			ctrl.up = 0;
			break;
			case 83:
			ctrl.down = 0;
			break;
			case 65:
			ctrl.right = 0;
			break;
			case 68:
			ctrl.left = 0;
			break;
			case 74:
			ctrl.j = 0;
			break;
			case 75:
			ctrl.k = 0;
			default:
			//console.log(e.keyCode);
			break;
		}
	});
}

function Ctrl() {
	this.up = 0;
	this.down = 0;
	this.left = 0;
	this.right = 0;
	this.j = 0;
	this.k = 0;
	this.mouseX = 0;
	this.mouseY = 0;
}
