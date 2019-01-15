// Variables
var gameboard = document.querySelector(".game-board");
var curr_lvl = 0;
// Match logic variables
var flip_status = false;
var two_flipped = false;
var card_one, card_two;
var matched_num = 0;
// Timer variables
var time = 60;
var width = 100;
var interval;
// Score variables
var score = document.querySelector(".game-stats__score--value");
var end_msg = "Congratulations, your score is ";
var score_num = 0;

// Arrays
const card_types = [
    "css3", "html5", "js", "react", "nodejs", "sass", "linkedin", "heroku", "github", "aws"
]
const levels = [
    2, 8, 18
]
const struct = [
    "1fr 1fr", "1fr 1fr 1fr 1fr", "1fr 1fr 1fr 1fr 1fr 1fr"
]

// Event listeners
var button = document.querySelector(".game-stats__button");
button.addEventListener("click", buttonFunc);

// Functions
function advance() {
    // Function that checks if the win condition is met
    if (matched_num === levels[curr_lvl]) {
        // If all cards have been matched, and it is the last level
        // End game and print out the score
        if (curr_lvl === (levels.length-1)) {
            endGame();
        }
        // Otherwise, advance to the next level
        curr_lvl++;
        startGame();
    }
}
function startGame() {
    resetBoard();
    // Create new cards based on current level
    var j = 0;
    for (let i = 0; j < levels[curr_lvl]; i++) {
        if (i === (card_types.length)) {
            // If the end of the array has been reached
            // Re-iterate from the start
            i = 0;
        }
        createCard(card_types[i]);
        createCard(card_types[i]);
        j++;
    }
    // Updates level display
    document.querySelector(".game-stats__level--value").innerHTML = `${curr_lvl+1}`;
    // Sets up new card deck
    const all_cards = document.querySelectorAll(".card");
    all_cards.forEach((card) => {
        // Shuffles the card order
        let num_cards = all_cards.length
        let rand_pos = Math.floor(Math.random() * num_cards);
        card.style.order = rand_pos;
        // Add click event to each card
        card.addEventListener("click", flipCard);
        card.addEventListener("click", advance);
    });
    startTimer();
}

function buttonFunc() {
    let _new = "New Game";
    let _end = "End Game";
    let _start = "Start Game";

    if (button.innerHTML === _new) {
        startGame();
        button.innerHTML = _end;
    } else if (button.innerHTML === _end) {
        endGame();
        button.innerHTML = _start;
    } else {
        // Reset score and level
        score_num = 0;
        score.innerHTML = score_num;
        curr_lvl = 0;
        startGame();
        button.innerHTML = _end;
    }
}

function resetBoard() {
    // Create a new gameboard
    let new_board = document.createElement("div");
    new_board.classList.add("game-board")
    new_board.style.gridTemplateColumns = struct[curr_lvl];
    // Insert new gameboard before old gameboard
    let body = gameboard.parentNode;
    body.insertBefore(new_board, gameboard);
    // Remove old gameboard then set new_board to gameboard variable
    body.removeChild(gameboard);
    gameboard = new_board;
    clearInterval(interval);
    // Resets variables
    [matched_num, time, width] = [0, 60, 100];
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
    updateScore();
    matched_num++;
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

function updateScore() {
    score_num += time*(curr_lvl+1);
    score.innerHTML = score_num;
}

function startTimer() {
    let timerbar = document.querySelector(".game-timer__bar");
    interval = setInterval(function () {
        time--;
        timerbar.innerHTML = `${time}s`;
        width -= 1.66;
        timerbar.style.width = `${width}%`;
        if (time === 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(interval);
    alert(`${end_msg}${score.innerHTML}`);
}