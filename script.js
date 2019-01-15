// your logic here
const card_types = [
    "css3", "html5", "js", "react", "nodejs", "sass", "linkedin", "heroku", "github", "aws"
]

for (let i=0; i<2; i++) {
    createCard(card_types[i]);
}

// Event listeners
var button = document.querySelector(".game-stats__button");
button.addEventListener("click", buttonFunc);

function buttonFunc() {
    let _new = "New Game";
    let _end = "End Game";
    let _start = "Start Game";

    if (button.innerHTML===_new) {
        button.innerHTML = _end;
    } else if (button.innerHTML === _end) {
        button.innerHTML = _start;
    } else {
        button.innerHTML = _end;
    }
}
function createCard(type) {
    var gameboard = document.querySelector(".game-board");
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
