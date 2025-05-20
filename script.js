var blockSize = 25;
var rows = 25;
var cols = 25;
var board;
var context;

var snakeX = 5*(blockSize);
var snakeY = 5*(blockSize);

var foodX;
var foodY;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var gameOver = false;

window.onload = function(){
    board = document.getElementById('board');
    board.height = rows*blockSize;
    board.width = cols*blockSize;
    context = board.getContext("2d");
    placeFood();
    document.addEventListener("keyup",changeDirection);
    setInterval(update,100);
}

function update(){

    if(gameOver){
        reeturn;
    }

    context.fillStyle="rgba(109, 153, 130, 0.8)";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle="#FF5722";
    context.fillRect(foodX,foodY,blockSize,blockSize);

    if(snakeX==foodX && snakeY==foodY){
        snakeBody.push([foodX,foodY]);
        placeFood();
    }
    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i]=snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX,snakeY];
    }

    if(snakeX<0){
        snakeX = (cols-1)*blockSize;
    }
    else if(snakeX>=(cols-1)*blockSize){
        snakeX = 0;
    }

    if(snakeY<0){
        snakeY = (rows-1)*blockSize;
    }
    else if(snakeY>=(rows-1)*blockSize){
        snakeY = 0;
    }


    context.fillStyle="rgba(26, 61, 43, 0.8)";
    snakeX+=velocityX*(blockSize);
    snakeY+=velocityY*(blockSize);
    context.fillRect(snakeX,snakeY,blockSize,blockSize);
    for(let i=0;i<snakeBody.length;i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
    }

    for(let i=0;i<snakeBody.length;i++){
        if(snakeX==snakeBody[i][0] && snakeY==snakeBody[i][1]){
            gameOver=true;
            alert("Game Over");
        }
    }

}

function placeFood(){
    foodX = Math.floor(Math.random()*cols)*blockSize;
    foodY = Math.floor(Math.random()*rows)*blockSize;
}

function changeDirection(e){
    if(e.key == "w" && velocityY!=1){
        velocityX = 0;
        velocityY = -1;
    }
    if(e.key == "s" && velocityY!=-1){
        velocityX = 0;
        velocityY = 1;
    }
    if(e.key == "a" && velocityX!=1){
        velocityX = -1;
        velocityY = 0;
    }
    if(e.key == "d" && velocityX!=-1){
        velocityX = 1;
        velocityY = 0;
    }
}