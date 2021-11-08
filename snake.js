function init(){
    canvas = document.getElementById("mycanvas");
    W = canvas.width = 737;
    H = canvas.height =737;
    pen = canvas.getContext("2d");
    cellsize = 67;
    game_over = false;
    score = 0;

    food_img  = new Image();
    food_img.src = "img/apple.png";

    trophy = new Image();
    trophy.src = "img/trophy.png";
    
    food = getRandomFood();

    snake = {
        init_len :5,
        color : "blue",
        cells : [],
        direction : "right",

        createSnake: function(){
            for(var i=this.init_len; i>0; i--){
                this.cells.push({x:i,y:0});
            }
        },

        drawSnake: function(){
            pen.fillStyle = "blue";
            for(var i=0;i<this.cells.length;i++){
                pen.fillRect(this.cells[i].x*cellsize, this.cells[i].y*cellsize, cellsize, cellsize);
            }
        },

        updateSnake: function(){
            
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if(headX == food.x && headY == food.y){
                food = getRandomFood();
                score++;
            }
            else{
                this.cells.pop();
            }

            var nextX, nextY;
            if(this.direction == "right"){
                nextX = headX+1;
                nextY = headY;
            }
            else if(this.direction == "left"){
                nextX = headX - 1;
                nextY = headY;
            }
            else if(this.direction == "down"){
                nextX = headX;
                nextY = headY+1;
            }
            else{
                nextX = headX;
                nextY = headY-1;
            }
            // if(nextX < 0 || nextX >= W || nextY < 0 || nextY >= H ){
            //     game_over = true;
            //     return ; 
            // }

            this.cells.unshift({x:nextX, y:nextY}); //unshift add element at front of array
            
            var last_x = Math.round(W/cellsize);
            var last_y = Math.round(H/cellsize);

            if(this.cells[0].x<0 || this.cells[0].y <0 || this.cells[0].x >= last_x || this.cells[0].y >= last_y){
                game_over = true;
            }

        }

    };

    snake.createSnake();

    function keyPressed(e){
        //console.log(e.key);
        if(e.key == "ArrowRight") {
            snake.direction = "right";
        }
        else if(e.key == "ArrowLeft"){
            snake.direction = "left";
        }
        else if(e.key == "ArrowUp"){
            snake.direction = "up";
        }
        else{
            snake.direction = "down";
        }
    }

    document.addEventListener('keydown', keyPressed);
}

function draw(){
    //erase the old snake
    pen.clearRect(0, 0,W,H)
    snake.drawSnake();

    pen.fillStyle = food.color;
    pen.drawImage(food_img,food.x*cellsize,  food.y*cellsize, cellsize, cellsize);

    pen.drawImage(trophy, 18, 20, cellsize, cellsize);
    pen.fillStyle = "blue";
    pen.font = "20px Roboto";
    pen.fillText(score, 50, 50);

}

function update(){
        
    snake.updateSnake();

}

function getRandomFood(){
    var foodX = Math.round(Math.random()*(W-cellsize)/cellsize);
    var foodY = Math.round(Math.random()*(H-cellsize)/cellsize);
    
    var food = {
        x: foodX,
        y: foodY,
        color: "red",
    }
    return food;
}

function gameloop(){
    if(game_over == true){
        clearInterval(f);
        alert("Game Over");
    }
    draw();
    update();
}

init();

var f = setInterval(gameloop, 200)