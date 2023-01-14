class UI {
  constructor() {
    this.btnRoll = document.querySelector('.btn--roll');
    this.btnHold = document.querySelector('.btn--hold');
    this.btnNew = document.querySelector('.btn--new');
    this.player1 = document.querySelector('.player--0');
    this.player2 = document.querySelector('.player--1');
    this.player1TotalScore = document.querySelector('#score--0');
    this.player1CurrentScore = document.querySelector('#current--0');
    this.player2TotalScore = document.querySelector('#score--1');
    this.player2CurrentScore = document.querySelector('#current--1');
    this.diceImage = document.querySelector('.dice');
  }

  showDiceImage(value) {
    this.diceImage.src = `dice-${value}.png`;
    this.diceImage.classList.remove('hidden');
  }

  showCurrentScore(player, score) {
    player === 1
      ? (this.player1CurrentScore.textContent = score)
      : (this.player2CurrentScore.textContent = score);
  }

  showTotalScore(player, score) {
    player === 1
      ? (this.player1TotalScore.textContent = score)
      : (this.player2TotalScore.textContent = score);
  }

  showActive(player) {
    document
      .querySelector('.player--active')
      .classList.remove('player--active');

    player === 1
      ? this.player1.classList.toggle('player--active')
      : this.player2.classList.toggle('player--active');
  }

  showWinner(player) {
    document
      .querySelector('.player--active')
      .classList.remove('player--active');
    player === 1
      ? this.player1.classList.add('player--winner')
      : this.player2.classList.add('player--winner');
  }

  showNewGame() {
    document
      .querySelector('.player--winner')
      .classList.remove('player--winner');
    this.toggleDiceImg();
    this.player1.classList.add('player--active');
  }

  toggleDiceImg() {
    this.diceImage.classList.toggle('hidden');
  }
}

export const ui = new UI();
