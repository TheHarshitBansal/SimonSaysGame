let started = false;
let level = 0;
let gameSeq = [];
let userSeq = [];
let colours = ["red", "blue", "green", "yellow"];

let subHead = document.querySelector("h2");

start();

function start() {
    document.addEventListener("keydown", (input) => {
        if (input.key == " ") {
            if (started == false) {
                level = 1
                subHead.innerText = "Level 1"
                started = true;
                gameplay();
            }
        }
    })
}


function flash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function gameplay() {
    let randIdx = Math.floor(Math.random() * 4);
    let randColour = colours[randIdx];
    let randBtn = document.querySelector(`.${randColour}`)
    flash(randBtn);
    gameSeq.push(randColour);
}

function userInput() {
    flash(this);
    userSeq.push(this.classList[1]);
    if (userSeq.length == level) {
        checkResult();
    }

}

function checkResult() {
    let verified = false;
    for (let i = 0; i < gameSeq.length; i++) {
        if (userSeq[i] == gameSeq[i]) {
            verified = true;
        } else {
            verified = false;
            break;
        }
    }
    if (verified) {
        level++;
        subHead.innerText = `Level ${level}`;
        userSeq = [];
        setTimeout(gameplay, 500);
    } else {
        subHead.innerText = `GAME OVER ! Your Score is ${level-1} \n Press Space Bar to restart the game.`;
        userSeq = [];
        gameSeq = [];
        started = false;
        start();
    }
}

let allBtns = document.querySelectorAll(".box");
for (btn of allBtns) {
    btn.addEventListener("click", userInput);
}