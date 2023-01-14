'use strict';

import { ui } from './ui.js';

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const diceImg = document.querySelector('.dice');

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdBtnClicked);
btnNew.addEventListener('click', newGame);

ui.toggleDiceImg();

let playerOneCurrentScore = 0;
let playerTwoCurrentScore = 0;
let playerOneTotalScore = 0;
let playerTwoTotalScore = 0;

let currentPlayer = 1;

// Roll Dice and get a random value between 1 and 6
function rollDice() {
  const value = getRandomNumber();
  ui.showDiceImage(value);
  if (value > 1) {
    if (currentPlayer === 1) {
      playerOneCurrentScore += value;
      ui.showCurrentScore(currentPlayer, playerOneCurrentScore);
    } else {
      playerTwoCurrentScore += value;
      ui.showCurrentScore(currentPlayer, playerTwoCurrentScore);
    }
  } else {
    if (currentPlayer === 1) {
      playerOneCurrentScore = 0;
      ui.showCurrentScore(currentPlayer, playerOneCurrentScore);
    } else {
      playerTwoCurrentScore = 0;
      ui.showCurrentScore(currentPlayer, playerTwoCurrentScore);
    }
    switchPlayer();
  }
}

function holdBtnClicked() {
  if (currentPlayer === 1) {
    playerOneTotalScore += playerOneCurrentScore;
    ui.showTotalScore(currentPlayer, playerOneTotalScore);
    playerOneCurrentScore = 0;
    ui.showCurrentScore(currentPlayer, playerOneCurrentScore);
    if (playerOneTotalScore >= 100) {
      ui.showWinner(1);
      btnRoll.removeEventListener('click', rollDice);
      btnHold.removeEventListener('click', holdBtnClicked);
    } else {
      switchPlayer();
    }
  } else {
    playerTwoTotalScore += playerTwoCurrentScore;

    ui.showTotalScore(currentPlayer, playerTwoTotalScore);
    playerTwoCurrentScore = 0;
    ui.showCurrentScore(currentPlayer, playerTwoCurrentScore);
    if (playerTwoTotalScore >= 100) {
      ui.showWinner(2);
      btnRoll.removeEventListener('click', rollDice);
      btnHold.removeEventListener('click', holdBtnClicked);
    } else {
      switchPlayer();
    }
  }
}

function newGame() {
  currentPlayer = 1;
  playerOneCurrentScore = 0;
  playerTwoCurrentScore = 0;
  playerOneTotalScore = 0;
  playerTwoTotalScore = 0;
  ui.showCurrentScore(1, 0);
  ui.showCurrentScore(2, 0);
  ui.showTotalScore(1, 0);
  ui.showTotalScore(2, 0);
  ui.showNewGame();
  btnRoll.addEventListener('click', rollDice);
  btnHold.addEventListener('click', holdBtnClicked);
}

function switchPlayer() {
  currentPlayer === 1 ? (currentPlayer = 2) : (currentPlayer = 1);
  ui.showActive(currentPlayer);
}

function getRandomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}
