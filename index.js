const gameInfo = document.querySelector('.game-info');
const button = document.querySelector('.btn');
const boxes = document.querySelectorAll('.box');

let currentPlayer ;
let gameGrid;

const winningPositions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]
initGame();

            // To initialise Varibales
function initGame(){
    currentPlayer = 'X';
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;

    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box, idx) => {
        boxes[idx].innerHTML = "";
        boxes[idx].style.pointerEvents = "all";

                // One More thing is missing :- Make Color of greens transparent
        boxes[idx].classList.remove("win");
    })
    button.classList.remove("active");
}

            // Clicking function
function swapturn(){
    if(currentPlayer === 'X'){
        currentPlayer = 'O';
    }
    else{
        currentPlayer = 'X';
    }
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
};

function checkGameOver(){
    let answer = "";
    
    winningPositions.forEach((position) => {
        if((gameGrid[position[0]]!== "" && gameGrid[position[1]]!== "" && gameGrid[position[2]]!== "") && gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[0]] === gameGrid[position[2]]){
            if(gameGrid[position[0]]=="X"){
                answer = "X";
            }
            else{
                answer = "O";
            }
                    // Color them Green 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

                    // Disable pointer Event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
        }
    });
    
    if(answer !== ""){
                // Make new Game button Visible
        button.classList.add("active");

                // Show Who is Winner
        gameInfo.innerHTML = `Winner Player - ${answer}`;
        return ;
    }

        // When there is no Winner :- Game tied !
    let filledCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            filledCount++;
        }
    });

    if(filledCount === 9){
        gameInfo.innerHTML = "Game tied !";
        button.classList.add("active");
    }
};

function handleClick(idx){
    if(gameGrid[idx] != ""){
        return ;
    }
    boxes[idx].innerHTML = currentPlayer;
    boxes[idx].style.pointerEvents = "none";
    gameGrid[idx] = currentPlayer;
    swapturn();
    checkGameOver();
};

boxes.forEach((box, index) => {
    box.addEventListener('click', function(){
        handleClick(index);
    });
});

button.addEventListener('click', initGame);