// Game controller
const GameCtrl = (function () {
    const data = {
        scores: [0, 0],
        currentScore: 0,
        currentPlayer: 0,
        playing: true,
    };
    return {
        getCurrentPlayer: function () {
            return data.currentPlayer;
        },
        setCurrentPlayer: function (player) {
            data.currentPlayer = player;
        },
        switchPlayer: function () {
            data.currentPlayer = data.currentPlayer === 0 ? 1 : 0;
        },
        getScore: function (player) {
            return data.scores[player];
        },
        setScore: function (score) {
            data.scores[data.currentPlayer] = score;
        },
        resetScore: function () {
            data.scores = [0, 0];
        },
        getCurrentScore: function () {
            return data.currentScore;
        },
        setCurrentScore: function (score) {
            data.currentScore = score;
        },
        getPlaying: function () {
            return data.playing;
        },
        setPlaying: function (value) {
            data.playing = value;
        },
        getRandomNumber: function () {
            return Math.floor(Math.random() * 6 + 1);
        },
        logdata: function () {
            return data;
        },
    };
})();

// UI Controller
const UICtrl = (function () {
    const UISelectors = {
        btnRoll: '.btn--roll',
        btnHold: '.btn--hold',
        btnNew: '.btn--new',
        player1: '.player--0',
        player2: '.player--1',
        player1TotalScore: '#score--0',
        player1CurrentScore: '#current--0',
        player2TotalScore: '#score--1',
        player2CurrentScore: '#current--1',
        diceImage: '.dice',
    };
    return {
        getSelectors: function () {
            return UISelectors;
        },
        initializeGame: function () {
            this.showCurrentScore(0);
            this.showCurrentScore(1);
            this.showTotalScore(0);
            this.showTotalScore(1);
            this.highlightCurrentPlayer(0);
            this.removeHighlightWinner();
            this.hideDice();
        },
        hideDice: function () {
            document
                .querySelector(UISelectors.diceImage)
                .classList.add('hidden');
        },
        showDice: function () {
            document
                .querySelector(UISelectors.diceImage)
                .classList.remove('hidden');
        },
        setDiceImg: function (value) {
            document.querySelector(
                UISelectors.diceImage
            ).src = `dice-${value}.png`;
        },
        showCurrentScore: function (
            currentPlayer = GameCtrl.getCurrentPlayer()
        ) {
            const currentScore = GameCtrl.getCurrentScore();

            document.querySelector(`#current--${currentPlayer}`).textContent =
                currentScore;
        },
        showTotalScore: function (currentPlayer = GameCtrl.getCurrentPlayer()) {
            const totalScore = GameCtrl.getScore(currentPlayer);

            document.querySelector(`#score--${currentPlayer}`).textContent =
                totalScore;
        },
        highlightCurrentPlayer: function (
            currentPlayer = GameCtrl.getCurrentPlayer()
        ) {
            document
                .querySelector(UISelectors.player1)
                .classList.remove('player--active');
            document
                .querySelector(UISelectors.player2)
                .classList.remove('player--active');
            document
                .querySelector(`.player--${currentPlayer}`)
                .classList.add('player--active');
        },
        highlightWinner: function (winner) {
            document
                .querySelector(UISelectors.player1)
                .classList.remove('player--active');
            document
                .querySelector(UISelectors.player2)
                .classList.remove('player--active');
            document
                .querySelector(`.player--${winner}`)
                .classList.add('player--winner');
        },
        removeHighlightWinner: function () {
            document
                .querySelector(UISelectors.player1)
                .classList.remove('player--winner');
            document
                .querySelector(UISelectors.player2)
                .classList.remove('player--winner');
        },
    };
})();

// App Controller
const App = (function (GameCtrl, UICtrl) {
    const UISelectors = UICtrl.getSelectors();

    // Load event listners
    document
        .querySelector(UISelectors.btnRoll)
        .addEventListener('click', rollDice);

    document
        .querySelector(UISelectors.btnHold)
        .addEventListener('click', holdScore);

    document
        .querySelector(UISelectors.btnNew)
        .addEventListener('click', resetGame);

    function rollDice() {
        if (GameCtrl.getPlaying()) {
            UICtrl.showDice();
            const value = GameCtrl.getRandomNumber();
            UICtrl.setDiceImg(value);
            if (value > 1) {
                GameCtrl.setCurrentScore(GameCtrl.getCurrentScore() + value);
                UICtrl.showCurrentScore();
            } else {
                GameCtrl.setCurrentScore(0);
                UICtrl.showCurrentScore();
                GameCtrl.switchPlayer();
                UICtrl.highlightCurrentPlayer();
            }
        }
    }

    function holdScore() {
        if (GameCtrl.getPlaying()) {
            GameCtrl.setScore(
                GameCtrl.getScore(GameCtrl.getCurrentPlayer()) +
                    GameCtrl.getCurrentScore()
            );
            UICtrl.showTotalScore();
            GameCtrl.setCurrentScore(0);
            UICtrl.showCurrentScore();
            if (GameCtrl.getScore(GameCtrl.getCurrentPlayer()) >= 100) {
                UICtrl.highlightWinner(GameCtrl.getCurrentPlayer());
                GameCtrl.setPlaying(false);
            } else {
                GameCtrl.switchPlayer();
                UICtrl.highlightCurrentPlayer();
            }
        }
    }

    function resetGame() {
        App.init();
    }

    return {
        init: function () {
            GameCtrl.resetScore();
            GameCtrl.setCurrentScore(0);
            GameCtrl.setCurrentPlayer(0);
            GameCtrl.setPlaying(true);
            UICtrl.initializeGame();
        },
    };
})(GameCtrl, UICtrl);

App.init();
