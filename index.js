let player = {
  name: "Per",
  chips: 200,
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");

playerEl.textContent = player.name + ": $" + player.chips;

// Add player name input and setPlayerName function
function setPlayerName() {
  const playerNameInput = document.getElementById("player-name").value;
  if (playerNameInput) {
    player.name = playerNameInput;
    playerEl.textContent = player.name + ": $" + player.chips;
  }
}

function resetGame() {
  cards = [];
  sum = 0;
  hasBlackJack = false;
  isAlive = false;
  message = "Want to play a round?";
  messageEl.textContent = message;
  cardsEl.textContent = "Cards:";
  sumEl.textContent = "Sum:";
}

function getRandomCard() {
  const suits = ["♠", "♥", "♦", "♣"];
  const randomSuit = suits[Math.floor(Math.random() * suits.length)];
  let randomNumber = Math.floor(Math.random() * 13) + 1;
  let cardValue =
    randomNumber > 10 ? 10 : randomNumber === 1 ? 11 : randomNumber;
  let displayValue =
    randomNumber === 1
      ? "A"
      : randomNumber === 11
      ? "J"
      : randomNumber === 12
      ? "Q"
      : randomNumber === 13
      ? "K"
      : randomNumber;
  return { value: cardValue, display: `${displayValue}${randomSuit}` };
}

function startGame() {
  isAlive = true;
  hasBlackJack = false;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard.value + secondCard.value;
  renderGame();
}

function renderGame() {
  cardsEl.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i].display + " ";
  }
  sumEl.textContent = "Sum: " + sum;
  if (sum <= 20) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    message = "You've got Blackjack!";
    hasBlackJack = true;
  } else {
    message = "You're out of the game!";
    isAlive = false;
  }
  messageEl.textContent = message;
}

function newCard() {
  if (isAlive === true && hasBlackJack === false) {
    let card = getRandomCard();
    sum += card.value;
    cards.push(card);
    renderGame();
  }
}
