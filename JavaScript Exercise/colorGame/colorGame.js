var numSquares = 6;
var colors = generateRandomColors(numSquares);

var pickedColor = pickColor();
var squares = document.querySelectorAll(".square");
var body = document.querySelector("body");
var h1 = document.querySelector("h1");
var colorDisplay = document.getElementById("colorDisplay");
	colorDisplay.textContent = pickedColor;
var messageDisplay = document.querySelector("#message");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");


var resetButton = document.querySelector("#reset");




easyBtn.addEventListener("click",function(){
	numSquares = 3;
	hardBtn.classList.remove("selected");
	easyBtn.classList.add("selected");
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i = 0; i < squares.length; i++){
		if(i < 3){
			// change the color of top squares
			squares[i].style.backgroundColor = colors[i];
		}else{
			// hide bottom squares
			squares[i].style.display = "none";
		}
	}
});

hardBtn.addEventListener("click",function(){
	numSquares = 6;
	easyBtn.classList.remove("selected");
	hardBtn.classList.add("selected");
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
		if(i >= 3){
			squares[i].style.display = "block";
		}
	}
});

resetButton.addEventListener("click",function(){
	//generate new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change displayColor to new pickedColor
	colorDisplay.textContent = pickedColor;
	this.textContent = "New colors";
	//change colors of squares
	for(var i = 0; i < squares.length; i++){
	squares[i].style.backgroundColor = colors[i];
	}
	//reset the backgroundcolor of h1
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";

	resetButton.textContent = "New colors";

});

for(var i = 0; i < squares.length; i++){
	squares[i].style.backgroundColor = colors[i];

	squares[i].addEventListener("click",function(){
		var clickedColor = this.style.backgroundColor;
		if( clickedColor !== pickedColor){ //  whitespace can cause error 
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again";
		}else{
			messageDisplay.textContent = "Correct!";
			changeColors(clickedColor);
			h1.style.backgroundColor = pickedColor;
			resetButton.textContent = "Play Again?"
		}
	});

}


function changeColors(color){
	// loop all square's color
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color; 
	}
	//change color to the square color
}

function pickColor(){
	var random = Math.floor(Math.random()*colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make a array
	var arr = [];
	//add num random colors to array
	for(var i = 0; i < num; i++){
		//get random colors and push into arr
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a red from 0 to 255
	var r = Math.floor(Math.random()*256);
	//pick a green from 0 to 255
	var g = Math.floor(Math.random()*256);
	//pick a blue from 0 to 255
	var b = Math.floor(Math.random()*256);

	return "rgb(" + r +", " + g + ", " + b + ")"
}