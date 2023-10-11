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
let aiSide = null; // Will be the opposite side of player

// Function to handle player side selection
function handleSideSelection(side) {
    playerSide = side;
    aiSide = (playerSide === 'X') ? 'O' : 'X'; // Determine AI's side
    document.querySelector('.choose-side').style.display = 'none'; // Hide the side selection
    document.querySelector('.board').style.display = 'grid'; // Show the board
    currentPlayer = (playerSide === 'X') ? 0 : 1; // Set current player
    if (aiSide === 'X') {
      aiMove(); // AI starts if AI's side is 'X'
    }
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

// Function for AI's move
function aiMove() {
    setTimeout(() => {
      let emptyCells = [];
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          emptyCells.push(i);
        }
      }
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const aiMoveIndex = emptyCells[randomIndex];
      board[aiMoveIndex] = aiSide; // AI takes its side
      updateBoard();
      currentPlayer = (currentPlayer + 1) % 2; // Switch current player
    }, 700); // Delay of 700 milliseconds (0.7 second)
  }
  
  

// Function to check if AI has won
function aiHasWon() {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === aiSide && board[a] === board[b] && board[a] === board[c]) {
        return true; // AI has won
      }
    }
    return false; // AI has not won
  }
  
  // Function to handle cell click
function handleCellClick(index) {
    if (playerSide === null || currentPlayer === 1) {
      return; // Exit function if AI's turn or player side not chosen
    }
  
    if (board[index] === '' && currentPlayer === 0 && !checkWin()) {
      board[index] = playerSide; // Player's chosen side
      updateBoard();
  
      const winner = checkWin();
      if (winner) {
        const winnerElement = document.getElementById('winner');
        if (winner === 'tie') {
          winnerElement.textContent = "It's a tie!";
        } else if (winner === playerSide) {
          winnerElement.textContent = `Player ${winner} wins!`;
        } else if (aiHasWon()) {
          winnerElement.textContent = "You Lost!";
        }
      } else {
        currentPlayer = (currentPlayer + 1) % 2;
        if (currentPlayer === 1) {
          aiMove(); // AI's turn
        }
      }
    }
  }
  
  
  
  // ... (rest of the code remains the same)
  
// Function to update the board in the DOM
function updateBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

// Add event listeners to cells for click events
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