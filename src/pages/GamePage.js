import React, { useEffect, useState } from 'react';
import "../css/GamePage.css";

const ROWS = 6;
const COLUMNS = 7;
const EMPTY = 'EMPTY';
const PLAYER = 'PLAYER';
const AI = 'AI';

function App() {
  const [board, setBoard] = useState(createBoard());
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER);
  const [winner, setWinner] = useState(null);
  const [username, setUsername] = useState('');
  const [userColor, setUserColor] = useState('#ffffff'); // Varsayılan renk beyaz
  const [computerColor, setComputerColor] = useState('#000000'); // Varsayılan renk siyah

  useEffect(() => {
    // localStorage'dan değerleri al
    const storedUsername = localStorage.getItem('username');
    const storedUserColor = localStorage.getItem('userColor');
    const storedComputerColor = localStorage.getItem('computerColor');

    // Eğer değerler varsa, state'i güncelle
    if (storedUsername) setUsername(storedUsername);
    if (storedUserColor) setUserColor(storedUserColor);
    if (storedComputerColor) setComputerColor(storedComputerColor);

    // Konsola loglama
    console.log('Username:', storedUsername);
    console.log('User Color:', storedUserColor);
    console.log('Computer Color:', storedComputerColor);

    console.log('Current Player:', currentPlayer);
  }, [currentPlayer]);

  function createBoard() {
    return Array(ROWS).fill(null).map(() => Array(COLUMNS).fill(EMPTY));
  }

  function dropDisc(column) {
    if (winner || board[0][column] !== EMPTY) return;

    let newBoard = placeDisc(board, column, currentPlayer);
    let nextPlayer = currentPlayer === PLAYER ? AI : PLAYER;
    setBoard(newBoard);
    setCurrentPlayer(nextPlayer);
    checkWinner(newBoard);

    if (nextPlayer === AI) {
      setTimeout(() => aiMove(), 800); // Bilgisayarın hamlesi için kısa bir gecikme
    }
  }

  function placeDisc(board, column, player) {
    let newBoard = [...board];
    for (let row = ROWS - 1; row >= 0; row--) {
      if (newBoard[row][column] === EMPTY) {
        newBoard[row][column] = player;
        break;
      }
    }
    return newBoard;
  }

  function aiMove() {
    if (winner) return;
    let availableColumns = [];
    for (let col = 0; col < COLUMNS; col++) {
      if (board[0][col] === EMPTY) {
        availableColumns.push(col);
      }
    }
    if (availableColumns.length > 0) {
      const randomColumn = availableColumns[Math.floor(Math.random() * availableColumns.length)];
      let newBoard = placeDisc(board, randomColumn, AI);
      setBoard(newBoard);
      setCurrentPlayer(PLAYER);
      checkWinner(newBoard);
    }
  }
  function checkWinner(board) {
    // Yatay kontrol
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS - 3; col++) {
        if (board[row][col] !== EMPTY && 
            board[row][col] === board[row][col + 1] && 
            board[row][col] === board[row][col + 2] && 
            board[row][col] === board[row][col + 3]) {
          setWinner(board[row][col]);
          return;
        }
      }
    }
  
    // Dikey kontrol
    for (let col = 0; col < COLUMNS; col++) {
      for (let row = 0; row < ROWS - 3; row++) {
        if (board[row][col] !== EMPTY &&
            board[row][col] === board[row + 1][col] &&
            board[row][col] === board[row + 2][col] &&
            board[row][col] === board[row + 3][col]) {
          setWinner(board[row][col]);
          return;
        }
      }
    }
  
    // Çapraz kontrol (sağ üstten sol alta)
    for (let row = 0; row < ROWS - 3; row++) {
      for (let col = 0; col < COLUMNS - 3; col++) {
        if (board[row][col] !== EMPTY &&
            board[row][col] === board[row + 1][col + 1] &&
            board[row][col] === board[row + 2][col + 2] &&
            board[row][col] === board[row + 3][col + 3]) {
          setWinner(board[row][col]);
          return;
        }
      }
    }
  
    // Çapraz kontrol (sol üstten sağ alta)
    for (let row = 3; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS - 3; col++) {
        if (board[row][col] !== EMPTY &&
            board[row][col] === board[row - 1][col + 1] &&
            board[row][col] === board[row - 2][col + 2] &&
            board[row][col] === board[row - 3][col + 3]) {
          setWinner(board[row][col]);
          return;
        }
      }
    }
  }
  

  function renderCell(cell, rowIndex, columnIndex) {
    let cellClass = cell === EMPTY ? 'cell empty' : cell === PLAYER ? 'cell player' : 'cell ai';
    let cellStyle = {};
  
    if (cell === PLAYER) {
      // PLAYER için userColor'ı arka plan rengi olarak ayarla
      cellStyle.backgroundColor = userColor;
      cellClass += ' falling';

    } else if (cell !== EMPTY) {
      // PLAYER olmayan ve EMPTY olmayan hücreler için bir renk ayarla
      cellStyle.backgroundColor = computerColor;
      cellClass += ' falling';
    }
    // EMPTY hücreler için ekstra bir stil gerekmez
  
    return (
      <div 
        key={columnIndex} 
        className={cellClass} 
        style={cellStyle} 
        onClick={() => dropDisc(columnIndex)} 
      />
    );
  }
  

  return (
    <div className="App">
      <h1>Connect Four</h1>
      <br />
      {winner && <h2>Winner: {winner}</h2>}
      <div className="board" style={{ boxShadow: `0px 0px 150px ${currentPlayer === PLAYER ? userColor : computerColor}` }}>
        {board.map((row, rowIndex) => row.map((cell, columnIndex) => renderCell(cell, rowIndex, columnIndex)))}
      </div>
    </div>
  );
}

export default App;
