class TicTacToeGame {
    constructor() {
        this.reset()
    }

    reset() {
        this.isGameOver = false;
        this.winningLine = null;

        this.turn = 'X';
        this.marks = 0;

        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ]

        this.winLines = [
            // winning rows
            [0, 0, 0, 1, 0, 2],
            [1, 0, 1, 1, 1, 2],
            [2, 0, 2, 1, 2, 2],

            // winning columns
            [0, 0, 1, 0, 2, 0],
            [0, 1, 1, 1, 2, 1],
            [0, 2, 1, 2, 2, 2],

            // top left to bottom right
            [0, 0, 1, 1, 2, 2],

            // bottom left to top right
            [2, 0, 1, 1, 0, 2],
        ]
    }

    makeMove(row, col) {
        if (!this.isMoveValid(row, col)) {
            return false;
        }

        this.board[row][col] = this.turn;
        this.marks++;

        this.detectGameOver();

        if (this.isGameOver) {
            return true;
        }

        if (this.turn === 'X') {
            this.turn = 'O';
        } else {
            this.turn = 'X';
        }
        return true;
    }

    isMoveValid(row, col) {
        if (this.isGameOver) {
            return false;
        }

        if (this.board[row][col] === null) {
            return true;
        }
        return false;
    }

    detectGameOver() {
        for (let winLine of this.winLines) {
            if (this.checkThree(...winLine)) {
                this.isGameOver = true;
                this.winningLine = winLine;
                return;
            }
        }

        if (this.marks === 9) {
            this.isGameOver = true;
            this.winningLine = null;
            return;
        }

        this.isGameOver = false;
    }

    checkThree(row0, col0, row1, col1, row2, col2) {
        const mark1 = this.board[row0][col0];
        const mark2 = this.board[row1][col1];
        const mark3 = this.board[row2][col2];

        if (mark1 !== null && mark1 === mark2 && mark2 === mark3) {
            return true;
        }
        return false;
    }
}