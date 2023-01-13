'use strict';

class Player {
  constructor() {}
  data = {
    currentScore: 0,
    totalScore: 0,
    hold: false,
    turn: false,
  };

  getCurrentScore() {
    return this.data.currentScore;
  }

  getTotalScore() {
    return this.data.totalScore;
  }

  getHold() {
    return hold;
  }

  getTurn() {
    return turn;
  }

  setCurrentScore(score) {
    this.data.currentScore = score;
  }

  setTotalScore(score) {
    this.data.totalScore = score;
  }

  setHold(state) {
    this.data.hold = state;
  }

  setTurn(turn) {
    this.data.turn = turn;
  }
}

export const player = new Player();
