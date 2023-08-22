// Define the players and the current player
const players = ['X', 'O'];
let currentPlayer = 0;

// Define the board and winning combinations
const board = ['', '', '', '', '', '', '', '', ''];
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]           // Diagonals
];

// Function to check if the game is won
function checkWin() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return the winner (X or O)
    }
  }
  if (board.every(cell => cell !== '')) {
    return 'tie'; // Return 'tie' if the board is full and no winner
  }
  return null; // Return null if the game is ongoing
}

// Function to handle cell click
function handleCellClick(index) {
  if (board[index] === '' && !checkWin()) {
    board[index] = players[currentPlayer];
    updateBoard();
    const winner = checkWin();
    if (winner) {
      const winnerElement = document.getElementById('winner');
      if (winner === 'tie') {
        winnerElement.textContent = "It's a tie!";
      } else {
        winnerElement.textContent = `Player ${winner} wins!`;
      }
    } else {
      currentPlayer = (currentPlayer + 1) % 2;
    }
  }
}

// Function to update the board in the DOM
function updateBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

// Add click event listeners to cells
const cells = document.querySelectorAll('.cell');
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    handleCellClick(index);
  });
});

// Add a click event listener to the restart button
const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', () => {
  location.reload(); // Reload the page to restart the game
});

// Initialize the board in the DOM
updateBoard();
