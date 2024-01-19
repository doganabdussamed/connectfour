// src/pages/GamePage.js
import React, { useState, useEffect } from 'react';
import '../css/GamePage.css';

const GamePage = () => {
  const numRows = 6;
  const numCols = 7;
  const [board, setBoard] = useState(Array.from({ length: numRows }, () => Array(numCols).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('player');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    setCurrentPlayer(Math.random() < 0.5 ? 'computer' : 'player');
  }, []);

  // Sütunun üstündeki boş hücreyi bul ve taşı bırakk
  const dropPiece = (col) => {
    if (winner === null && board[0][col] === null) {
      const newBoard = [...board];
      for (let row = numRows - 1; row >= 0; row--) {
        if (newBoard[row][col] === null) {
          newBoard[row][col] = currentPlayer;
          setBoard(newBoard);
          checkWinner(row, col);
          setCurrentPlayer(currentPlayer === 'player' ? 'computer' : 'player');
          break;
        }
      }
    }
  };

  // Bilgisayarın hamlesini gerçekleştir
  const computerMove = () => {
    const validMoves = [];
    for (let col = 0; col < numCols; col++) {
      if (!board[0][col]) {
        validMoves.push(col);
      }
    }

    if (validMoves.length > 0) {
      const randomColumn = validMoves[Math.floor(Math.random() * validMoves.length)];
      dropPiece(randomColumn);
    }
  };

  // Kazananı kontrol et
  const checkWinner = (row, col) => {
    // Satır, sütun ve çaprazlarda aynı rengin dört tane olup olmadığını kontrol et
    if (
      checkLine(row, col, 0, 1) ||
      checkLine(row, col, 1, 0) ||
      checkLine(row, col, 1, 1) ||
      checkLine(row, col, 1, -1)
    ) {
      setWinner(currentPlayer);
    }
  };

  // Belirli bir yönde dört aynı taşı kontrol et
  const checkLine = (row, col, dRow, dCol) => {
    let count = 0;
    let r = row;
    let c = col;
    const player = board[row][col];

    // İleri yönde kontrol et
    while (r < numRows && r >= 0 && c < numCols && c >= 0 && board[r][c] === player) {
      count++;
      r += dRow;
      c += dCol;
    }

    r = row - dRow;
    c = col - dCol;

    // Geri yönde kontrol et
    while (r < numRows && r >= 0 && c < numCols && c >= 0 && board[r][c] === player) {
      count++;
      r -= dRow;
      c -= dCol;
    }

    return count >= 4; // Dört veya daha fazla aynı taş bulundu mu?
  };

  useEffect(() => {
    if (currentPlayer === 'computer' && winner === null) {
      // Bilgisayarın hamlesini yapması için biraz bekleyelim
      const delay = setTimeout(() => {
        computerMove();
      }, 500); // İstediğiniz süreyi ayarlayabilirsiniz
      return () => clearTimeout(delay);
    }
  }, [currentPlayer, winner]);

  return (
    <div className="game-container">
      {winner && <div className="winner">Winner: {winner}</div>}
      <div className="board-container">
        <div className="board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell, colIndex) => (
                <div key={colIndex} className={`cell ${cell}`} onClick={() => dropPiece(colIndex)}>
                  {cell && <div className={`piece ${cell}`}></div>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
