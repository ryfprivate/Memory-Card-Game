// Variables
var gameboard = document.querySelector(".game-board");
var curr_lvl = 0;
// Match logic variables
var flip_status = false;
var two_flipped = false;
var card_one, card_two;

// Arrays
const card_types = [
    "css3", "html5", "js", "react", "nodejs", "sass", "linkedin", "heroku", "github", "aws"
]
const levels = [
    2, 8, 18
]

// Event listeners
var button = document.querySelector(".game-stats__button");
button.addEventListener("click", buttonFunc);

// Functions
function startGame() {
    resetBoard();
    // Create new cards based on current level
    for (let i = 0; i < levels[curr_lvl]; i++) {
        createCard(card_types[i]);
        createCard(card_types[i]);
    }
    const all_cards = document.querySelectorAll(".card");

    all_cards.forEach((card) => {
        card.addEventListener("click", flipCard);
    });
}

function buttonFunc() {
    let _new = "New Game";
    let _end = "End Game";
    let _start = "Start Game";

    if (button.innerHTML === _new) {
        startGame();
        button.innerHTML = _end;
    } else if (button.innerHTML === _end) {
        button.innerHTML = _start;
    } else {
        startGame();
        button.innerHTML = _end;
    }
}

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

function flipCard() {
    if (two_flipped) {
        // If two cards have been flipped, prevent any more flips
        return;
    }
    if (this === card_one) {
        // If the current card is the same card, prevent any interaction
        return;
    }
    this.classList.add("card--flipped");
    if (!flip_status) {
        // If no cards have been flipped
        flip_status = true;
        card_one = this;
        return;
    }
    card_two = this;
    checkForMatch();
}

function checkForMatch() {
    // Checks if the data attributes of the two cards match
    // If matched, executes disableCards function
    // If not, executes unflipCards function
    let match_status = card_one.dataset.tech === card_two.dataset.tech;
    match_status ? disableCards() : unflipCards();
}

function disableCards() {
    // Removes flip event from both cards
    card_one.removeEventListener('click', flipCard);
    card_two.removeEventListener('click', flipCard);
    resetVar();
}

function unflipCards() {
    two_flipped = true;
    // Unflips cards after 1.5 secs
    setTimeout(() => {
        card_one.classList.remove('card--flipped');
        card_two.classList.remove('card--flipped');
        // Allow cards to be flipped only after 1.5 secs
        resetVar();
    }, 1500);
}

function resetVar() {
    // Resets all match logic variables
    [flip_status, two_flipped] = [false, false];
    [card_one, card_two] = [null, null];
}