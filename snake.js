const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const start = document.getElementById('start')
const over = document.getElementById('over')
const upBtn = document.getElementById('up')
const downBtn = document.getElementById('down')
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')
const intro = document.getElementById('intro')
const main = document.getElementById('main')
const head = document.getElementById('head')

var bleep = new Audio();
bleep.src = "sound/jump.wav";
var gameOver = new Audio();
gameOver.src = "sound/over.wav";
var eat = new Audio();
eat.src= "sound/eat.wav"
console.log(gameOver)
var levelup = new Audio();
levelup.src="sound/levelup.wav"
var startMusic = new Audio();
startMusic.src = "sound/start.mp3";


let squares = [];
let currentSnake = [2,1,0]
let direction = 1;
let width = 15;
let appleIndex = 0
let score = 0;
let interval = 1000;
let speed = 0.9;
let timerId = 0;



intro.addEventListener('click' , function(){

		main.style.display = "block"
		head.style.display = "none";
		intro.style.display = "none";
})



function createGrid(){

			for(i = 0 ; i < width*width ; i++){
				let square = document.createElement('div');
				square.classList.add('square');
				grid.append(square)
				squares.push(square)

			}

}

createGrid();

currentSnake.forEach(index => squares[index].classList.add('snake'))


function move(){


			if(

				(currentSnake[0] - width < 0 && direction === -width)||
				(currentSnake[0] + width >= width*width && direction === +width)||
				(currentSnake[0] % width === 0 && direction === -1)||
				(currentSnake[0] % width === width - 1 && direction === 1)||
				squares[currentSnake[0] + direction].classList.contains('snake')


				)
			{	
				startMusic.pause();
				gameOver.play();
				over.style.display = "block";
				return clearInterval(timerId)	

			}	
			
				let tail = currentSnake.pop();
				squares[tail].classList.remove('snake')
				currentSnake.unshift(currentSnake[0] + direction)


			if(squares[currentSnake[0]].classList.contains('apple')){

				eat.play();
				squares[currentSnake[0]].classList.remove('apple')
				squares[tail].classList.add('snake')
				currentSnake.push(tail)
				generateApple();
				score++;
				scoreDisplay.textContent = score;
				if(score % 5 == 0){
						levelup.play();
				}
				clearInterval(timerId)
				interval = interval * speed;
				timerId = setInterval (move , interval);
			
			}

			squares[currentSnake[0]].classList.add('snake')


}

function generateApple(){

			do{
						 appleIndex = Math.floor(Math.random() * squares.length)
			  }
			while(squares[appleIndex].classList.contains('snake'))

						squares[appleIndex].classList.add('apple')

}

generateApple();


function control(e){

			if(e.keyCode === 39){
					direction = 1 ;
					bleep.play();
			}
			else if(e.keyCode === 37){
					direction = -1;
					bleep.play();
			}
			else if(e.keyCode === 38){
					direction = -width;
					bleep.play();
			}
			else if(e.keyCode === 40){
					direction = +width;
					bleep.play();
			}

}

		document.addEventListener("keydown" , control)


		upBtn.addEventListener('click' ,function(){
					direction = -width;

		})

		downBtn.addEventListener('click' ,function(){
					direction = +width;
		})

		leftBtn.addEventListener('click' ,function(){
					direction = -1;
		})

		rightBtn.addEventListener('click' ,function(){
					direction = 1;
		})


start.addEventListener('click', startGame)

		function startGame(){

					startMusic.currentTime = 0.0;
					currentSnake.forEach(index => squares[index].classList.remove('snake'));
					squares[appleIndex].classList.remove('apple')
					clearInterval(timerId)
					currentSnake = [2,1,0]
					direction = 1
				    interval = 1000
				    score = 0
				    scoreDisplay.textContent = score
				    generateApple()
				    currentSnake.forEach(index => squares[index].classList.add('snake'));
					timerId = setInterval (move , interval);
					over.style.display = "none"
		}


