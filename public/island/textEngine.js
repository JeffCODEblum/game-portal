function TextBox() {
	this.x = 40;
	this.y = 40;
	this.w = 150;
	this.h = 60;

	var blipSound = document.getElementById("blipSound");
	blipSound.volume = 0.1;

	this.state = 0;
	this.lastStateChange = 0;
	
	this.rawText = "";
	this.formattedText = [];
	this.paragraphLength = 0;
	this.paragraphIndex = 0;

	this.cursorIndex = 0;
	this.lastCursorMove = 0;
	this.showCursor = false;
	this.game;
	var context;

	this.link =  function(game) {
		this.game = game;
		context = this.game.context;
	}

	this.update = function() {
		this.paragraphLength = this.getParagraphLength(this.formattedText[this.paragraphIndex]);
		if (this.state == 1 && Date.now() - this.lastCursorMove > 35) {
			if (this.cursorIndex < this.paragraphLength) {
				blipSound.play();
				this.cursorIndex++;
				this.lastCursorMove = Date.now();
				this.showCursor = false;
			}
			else {
				this.state = 2;
				this.lastStateChange = Date.now();
			}
		}
		
		if (this.state == 2) {
			if (Date.now() - this.lastCursorMove > 250) {
				this.showCursor = !this.showCursor;
				this.lastCursorMove = Date.now();
			}
			if (this.game.ctrl.j) {
				if(this.paragraphIndex < this.formattedText.length - 1) {
					this.paragraphIndex++;
					this.cursorIndex = 0;
					this.state = 1;
				}
				else {
					this.paragraphIndex = 0;
					this.cursorIndex = 0;
					this.state = 0;
				}
			}
		}
	}

	this.getParagraphLength = function(paragraph) {
		var length = 0;
		for (var i = 0; i < paragraph.length; i++) {
			length += paragraph[i].length;
		}
		return length;
	}

	this.setText = function(text) {
		this.rawText = text;
		this.formattedText = this.formatText(text);
		this.cursorIndex = 0;
		this.state = 1;
	}

	this.formatText = function (text) {
		var words =[];
		var word = "";
		var index = 0;
		while (index < text.length) {
			if (text[index] != ' ') {
				word += text[index];
			}
			if (text[index] == ' ' || index == text.length -1) {
				words.push(word);
				word = "";
			}
			index++;
		}

		var formattedLines = [];
		var line = "";
		index = 0;
		while (index < words.length) {
			var lineHasRoom = line.length + words[index].length < this.w/5;
			if (words[index].length > this.w/5) {
				index++;
			}
			if (lineHasRoom) {
				line += words[index] + " ";
				index++;
			}
			if (!lineHasRoom || index == words.length) {
				formattedLines.push(line);
				line = "";
			}
		}
		
		var finalText = [];
		index = 0;
		finalText.push([]);
		while (formattedLines.length > 0) {
			if (finalText[index].length < 4) {
				finalText[index].push(formattedLines[0]);
				formattedLines.splice(0, 1);
			}
			else {
				finalText.push([]);
				index++;
			}
		}
		
		return finalText;
	}

	this.render = function() {
		var text = this.formattedText[this.paragraphIndex];
		context.fillStyle = "#000000";
		context.fillRect(this.x - 19, this.y - 21, this.w + 19 + 9, this.h + 19 + 9);
		context.fillStyle = "#FFFFFF";
		context.fillRect(this.x - 18, this.y - 20, this.w + 18 + 8, this.h + 18 + 8);
		context.fillStyle = "#000000";
		context.fillRect(this.x - 11, this.y - 13, this.w + 12, this.h + 12);
		context.fillStyle = "#4444FF";
		context.fillRect(this.x - 10, this.y - 12, this.w + 10, this.h + 10);
		
		var writtenLength = 0;
		for (var i = 0; i < text.length; i++) {
			var textLine = text[i];
			var writeLine = "";
			
			for (var j = 0; j < this.cursorIndex - writtenLength; j++) {
				if (j >= textLine.length) break;
				writeLine += textLine[j];
			}
			writtenLength += writeLine.length;
			//writeLine = textLine;
			context.fillStyle = "#000000";
			context.fillText(writeLine, this.x + 1, this.y + 1 + 14 * i);
			context.fillStyle = "#FFFFFF";
			context.fillText(writeLine, this.x, this.y + 14 * i);
		}
		if (this.showCursor) {
			context.fillStyle = "#FFFFFF";
			context.fillRect(this.x + writeLine.length * 4.5 + 2, this.y + 14 * (text.length - 1) + 2, 8, -12);
		}
	}
}