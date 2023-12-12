let boxes = document.querySelectorAll(".button");
let resetBtn = document.querySelector(".reset-btn");
let greeting = document.querySelector(".greeting-para");
let msgContainer= document.querySelector(".msg-container");
let newBtn = document.querySelector(".new-btn");
let quitBtn = document.querySelector(".quit-game-btn");
let turnO = true;//player x,player O

let count =0;
let winningPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]
const reset = ()=>{
    count = 0;
    turnO =true;
    enable();
    msgContainer.classList.add("hide");
    quitBtn.classList.add("hide");
}
boxes.forEach((box) =>{
    box.addEventListener("click",()=>{
        console.log("button clicked");
        count++;
        console.log(count);
        if(turnO===true){
            box.innerText = "X";
            turnO= false;
        }
        else{
            box.innerText="O";
            turnO =true;
        }
        box.disabled = true;
        let winner = checkWinner();
        if(count === 9 && !winner){
            noWinner();
        }
    });
});
const disable = ()=>{
    for(box of boxes){
        box.disabled = true;
    }
}
const enable = ()=>{
    for(box of boxes){
        box.disabled = false;
        box.innerText="";
    }
}

const showWinner = (winner)=>{ 
    greeting.innerText = `Congratulations! player ${winner}`;
    msgContainer.classList.remove("hide");
    quitBtn.classList.remove("hide");
    disable();
}

const noWinner = ()=>{
    greeting.innerText = "Oops! No winner";
    msgContainer.classList.remove("hide");
    quitBtn.classList.remove("hide");
    disable();
}

const checkWinner = ()=>{
    for(let pattern of winningPatterns){

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
    
        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            
            if(pos1Val === pos2Val && pos2Val === pos3Val ){
                showWinner(pos1Val); 
                return true;
            }
           
        }
    }
}
newBtn.addEventListener("click",reset);
resetBtn.addEventListener("click",reset);

quitBtn.addEventListener("click",()=>{
    window.close();
    //close the game window

    if(!window.closed){
        alert("Unable to close the game window. Please use the browser's close button.");
    }
});