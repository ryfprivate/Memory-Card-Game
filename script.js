// variables
var gameboard = document.querySelector(".game-board");
var curr_lvl = 0;

// arrays
const card_types = [
    "css3", "html5", "js", "react", "nodejs", "sass", "linkedin", "heroku", "github", "aws"
]
const levels = [
    2, 8, 18
]

// Event listeners
var button = document.querySelector(".game-stats__button");
button.addEventListener("click", buttonFunc);

function resetBoard() {
    // Create a new gameboard
    let new_board = document.createElement("div");
    new_board.classList.add("game-board")
    new_board.style.gridTemplateColumns = "1fr 1fr";
    // Insert new gameboard before old gameboard
    let body = gameboard.parentNode;
    body.insertBefore(new_board, gameboard);
    // Remove old gameboard then set new_board to gameboard variable
    body.removeChild(gameboard);
    gameboard = new_board;
}

function startGame() {
    resetBoard();
    for (let i = 0; i < levels[curr_lvl]; i++) {
        createCard(card_types[i]);
        createCard(card_types[i]);
    }
}

function buttonFunc() {
    let _new = "New Game";
    let _end = "End Game";
    let _start = "Start Game";

    if (button.innerHTML===_new) {
        startGame();
        button.innerHTML = _end;
    } else if (button.innerHTML === _end) {
        button.innerHTML = _start;
    } else {
        button.innerHTML = _end;
    }
}

function createCard(type) {
    let card = document.createElement("div");
    let card_front = document.createElement("div");
    let card_back = document.createElement("div");

    // Add classes/data attributes to card
    card.classList.add("card");
    card.classList.add(type);
    card.dataset.tech = type;

    // Add front and back card faces of card
    card_front.classList.add("card__face");
    card_front.classList.add("card__face--front");
    card_back.classList.add("card__face");
    card_back.classList.add("card__face--back");
    card.appendChild(card_front);
    card.appendChild(card_back);

    gameboard.appendChild(card);
}
