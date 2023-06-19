document.addEventListener('DOMContentLoaded', main);

function main() {
    console.log('loaded');
    const game = new TicTacToeGame();
    const cells = [...document.getElementsByClassName('cell')];

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = cells.shift();
            cell.id = getCellId(row, col);
            cell.addEventListener('click', () => clickCell(game, cell, row, col));
        }
    }

    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', () => reset(game));
}

function reset(game) {
    game.reset();

    const cells = [...document.getElementsByClassName('cell')];
    for (const cell of cells) {
        cell.textContent = '_';
        cell.classList.remove('win');
    }

    const message = game.turn + "'s turn";
    setPrompt(message);
}

function clickCell(game, cell, row, col) {
    console.log('clicked on', row, col);
    const isValid = game.makeMove(row, col);
    if (!isValid) {
        return;
    }

    cell.textContent = game.board[row][col];
    console.log('game is now', game);
    console.log('board is now', game.board);

    if (game.isGameOver) {
        handleGameOver(game);
    } else {
        const message = game.turn + "'s turn";
        setPrompt(message);
    }
}

function handleGameOver(game) {
    const message = "Game over. " + game.turn + " won!";
    setPrompt(message);

    if (game.winningLine) {
        highlightWinningLine(...game.winningLine);
    } else {
        setPrompt("Cats!");
    }
}

function highlightWinningLine(row0, col0, row1, col1, row2, col2) {
    markWinningCell(row0, col0);
    markWinningCell(row1, col1);
    markWinningCell(row2, col2);
}

function markWinningCell(row, col) {
    const cell = document.getElementById(getCellId(row, col));
    cell.classList.add('win');
}

function getCellId(row, col) {
    const id = 'cell-' + row + '-' + col;
    return id;
}

function getCell(row, col) {
    const id = getCell(row, col);
    const cell = document.getElementById(id);
    return cell;
}

function setPrompt(message) {
    const prompt = document.getElementById('prompt');
    prompt.textContent = message;
}