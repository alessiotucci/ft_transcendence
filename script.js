// this is JavaScript, we will change it to typescript later on
//first make it work
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

// player 
let playerWidth = 10;
let playerHeight = 50;
// the velocity of the player, starting at zero (doesn't move)
let playerVelocityY = 0;
// variables to keep the score
let player1Score = 0;
let player2Score = 0;
// ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {
	x : boardWidth / 2,
	y : boardHeight / 2,
	width : ballWidth,
	height : ballHeight,
	velocityX : 1,
	velocityY : 2
}
let player1 = {
	x : 10,
	y : boardHeight / 2,
	width : playerWidth,
	height : playerHeight,
	velocityY : playerVelocityY

}
let player2 = {
	x :  boardWidth - 10 - playerWidth,
	y : boardHeight / 2,
	width : playerWidth,
	height : playerHeight,
	velocityY : playerVelocityY

}
window.onload = () => {
	board = document.getElementById("board");
	board.width = boardWidth;
	board.height = boardHeight;
	context = board.getContext("2d");



	requestAnimationFrame(update);
	document.addEventListener("keyup", movePlayer);
}

function update()
{
	requestAnimationFrame(update);
	// clear up the canvas
	context.clearRect(0, 0, board.width, board.height);
	// draw the first player
	context.fillStyle = "lightgray";
	let newPlayer1Y = player1.y + player1.velocityY;
	if (outOfBounds(newPlayer1Y) == false)
	{
		player1.y = newPlayer1Y;
	}
	context.fillRect(player1.x, player1.y, player1.width, player1.height);
	// second player
	
	let newPlayer2Y = player2.y + player2.velocityY;
	if (outOfBounds(newPlayer2Y) == false)
	{
		player2.y = newPlayer2Y;
	}
	context.fillRect(player2.x, player2.y, player2.width, player2.height);

	// draw the ball
	context.fillStyle = "yellow";
	ball.x += ball.velocityX;
	ball.y += ball.velocityY;
	context.fillRect(ball.x, ball.y, ball.width, ball.height);
	
	if (ball.y <= 0 || (ball.y + ball.height >= boardHeight))
	{
		ball.velocityY *= -1; // reverse the direction;
	}

	if (detectCollision(ball, player1))
	{
		if (ball.x <= player1.x + player1.width)
		{
			ball.velocityX *= -1;
		}
		
	}
	else if (detectCollision(ball, player2))
	{
		if (ball.x + ballWidth >= player2.x)
		{
			ball.velocityX *= -1;
		}
	}

	if (ball.x < 0)
	{
		player2Score++;
		resetGame(1);
	}
	else if (ball.x + ballWidth > boardWidth)
	{
		player1Score++;
		resetGame(-1);
	}
	context.font = "45px sans-serif";
	context.fillText(player1Score, boardWidth / 5, 45);

	context.fillText(player2Score, boardWidth * 4/5 - 45, 45);

	for (i = 10; i < board.height; i += 25)
	{
		context.fillRect(board.width / 2 - 10, i, 5, 5);
	}

}

function outOfBounds(yPosition)
{
	return(yPosition < 0 || yPosition + playerHeight > boardHeight);
}
function movePlayer(event)
{
	// first player
	if (event.code == "KeyW")
	{
		player1.velocityY = -2;
	}
	else if (event.code == "KeyS")
	{
		player1.velocityY = 2;
	}

	if (event.code == "ArrowUp")
	{
		player2.velocityY = -2;
	}
	else if (event.code == "ArrowDown")
	{
		player2.velocityY = 2;
	}
}

// both of those are rectangle, probably I need to visualize better this collision 
function detectCollision(a, b)
{
	return (a.x < b.x  + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y);
}


function resetGame(direction)
{
	ball = {
		x : boardWidth / 2,
		y : boardHeight / 2,
		width : ballWidth,
		height : ballHeight,
		velocityX : direction,
		velocityY : 2
	}
}