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

// Variables to track player side selection
let playerSide = null; // Will be 'X' or 'O'

// Function to handle player side selection
function handleSideSelection(side) {
  playerSide = side;
  document.querySelector('.choose-side').style.display = 'none'; // Hide the side selection
  document.querySelector('.board').style.display = 'grid'; // Show the board
}

// Add click event listeners to side selection buttons
const chooseXButton = document.getElementById('chooseX');
const chooseOButton = document.getElementById('chooseO');

chooseXButton.addEventListener('click', () => {
  handleSideSelection('X');
});

chooseOButton.addEventListener('click', () => {
  handleSideSelection('O');
});

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

// Function to handle cell click or touch
function handleCellInteraction(index) {
  // Check if player has chosen a side
  if (!playerSide) {
    return;
  }

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

// Add event listeners to cells for both click and touch events
const cells = document.querySelectorAll('.cell');
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    handleCellInteraction(index);
  });
  cell.addEventListener('touchstart', (event) => {
    event.preventDefault(); // Prevent touch from scrolling
    handleCellInteraction(index);
  });
});

// Add a click event listener to the restart button
const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', () => {
  location.reload(); // Reload the page to restart the game
});

// Initialize the board in the DOM
updateBoard();
