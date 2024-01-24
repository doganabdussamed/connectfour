import React, { useEffect, useState } from "react";
import "../css/GamePage.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

// Constants for the game board
const ROWS = 6;
const COLUMNS = 7;
const EMPTY = "EMPTY";
const PLAYER = "PLAYER";
const AI = "AI";

function App() {
  // State variables
  const [board, setBoard] = useState(createBoard());
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER);
  const [winner, setWinner] = useState(null);
  const [username, setUsername] = useState("");
  const [userColor, setUserColor] = useState("#ffffff"); // Default color is white
  const [computerColor, setComputerColor] = useState("#000000"); // Default color is black
  const [isPaused, setIsPaused] = useState(false); // State to track if the game is paused
  const [tablacolor, setTablacolor] = useState(localStorage.getItem("tablacolor")); // Default color is black
  const [gameHistory, setGameHistory] = useState(JSON.parse(localStorage.getItem("gameHistory") || "[]"));
  const [gamename, setGameName] = useState(localStorage.getItem("gameName") || null); // State to store game history

  // Function to pause the game
  const pauseGame = () => {
    setIsPaused(true);
  };

  // Functions linked to buttons in the Dialog
  const handleResume = () => {
    setIsPaused(false);
  };

  const handleRestart = () => {
    setIsPaused(false);
    window.location.href = "/ListofGames";
  };

  const handleQuit = () => {
    setIsPaused(false);
    window.location.href = "/GameCreation";
    // Exit procedures
  };

  // Function to reset the game state
  const resetGame = () => {
    setBoard(createBoard());
    setCurrentPlayer(PLAYER);
    setWinner(null);
    setIsPaused(false);
  };

  // useEffect to fetch user preferences from localStorage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedUserColor = localStorage.getItem("userColor");
    const storedComputerColor = localStorage.getItem("computerColor");

    if (storedUsername) setUsername(storedUsername);
    if (storedUserColor) setUserColor(storedUserColor);
    if (storedComputerColor) setComputerColor(storedComputerColor);
  }, []);

  // useEffect to update game history and winners on game completion
  useEffect(() => {
    if (winner) {
      const winnerName = winner === PLAYER ? username : "AI";
      const winners = JSON.parse(localStorage.getItem("winners")) || [];
      winners.push(winnerName);
      localStorage.setItem("winners", JSON.stringify(winners));

      // Update game history
      gameHistory.push({ username: username, winner: winnerName, gamename: gamename });
      localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
    }
  }, [winner, username]);

  // Function to create an initial game board
  function createBoard() {
    return Array(ROWS)
      .fill(null)
      .map(() => Array(COLUMNS).fill(EMPTY));
  }

  // Function to place a disc in a specific column
  function placeDisc(board, column, player) {
    const newBoard = [...board];
    for (let row = ROWS - 1; row >= 0; row--) {
      if (newBoard[row][column] === EMPTY) {
        newBoard[row][column] = player;
        break;
      }
    }
    return newBoard;
  }

  // Function to handle player's move
  function dropDisc(column) {
    if (winner || board[0][column] !== EMPTY || currentPlayer !== PLAYER)
      return;

    let newBoard = placeDisc(board, column, PLAYER);
    setBoard(newBoard);
    checkWinner(newBoard);

    if (!winner) {
      setCurrentPlayer(AI);
      setTimeout(() => aiMove(newBoard), 500);
    }
  }

  // Function to simulate AI's move
  function aiMove(currentBoard) {
    console.log("Sending board to server for AI move:", currentBoard);
    fetch("http://localhost:3010/ai-move", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ board: currentBoard }),
    })
      .then((response) => response.json())
      .then((aiBoard) => {
        console.log("Received updated board from server:", aiBoard);
        setBoard(aiBoard);
        setCurrentPlayer(PLAYER);
        checkWinner(aiBoard);
      })
      .catch((error) => {
        console.error("Error:", error);
        setCurrentPlayer(PLAYER);
      });
  }

  // Function to check if there is a winner after each move
  function checkWinner(board) {
    // Horizontal check
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS - 3; col++) {
        if (
          board[row][col] !== EMPTY &&
          board[row][col] === board[row][col + 1] &&
          board[row][col] === board[row][col + 2] &&
          board[row][col] === board[row][col + 3]
        ) {
          setWinner(board[row][col]);
          return;
        }
      }
    }

    // Vertical check
    for (let col = 0; col < COLUMNS; col++) {
      for (let row = 0; row < ROWS - 3; row++) {
        if (
          board[row][col] !== EMPTY &&
          board[row][col] === board[row + 1][col] &&
          board[row][col] === board[row + 2][col] &&
          board[row][col] === board[row + 3][col]
        ) {
          setWinner(board[row][col]);
          setIsPaused(true);
          return;
        }
      }
    }

    // Diagonal check (from top-right to bottom-left)
    for (let row = 0; row < ROWS - 3; row++) {
      for (let col = 0; col < COLUMNS - 3; col++) {
        if (
          board[row][col] !== EMPTY &&
          board[row][col] === board[row + 1][col + 1] &&
          board[row][col] === board[row + 2][col + 2] &&
          board[row][col] === board[row + 3][col + 3]
        ) {
          setWinner(board[row][col]);
          setIsPaused(true);
          return;
        }
      }
    }

    // Diagonal check (from top-left to bottom-right)
    for (let row = 3; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS - 3; col++) {
        if (
          board[row][col] !== EMPTY &&
          board[row][col] === board[row - 1][col + 1] &&
          board[row][col] === board[row - 2][col + 2] &&
          board[row][col] === board[row - 3][col + 3]
        ) {
          setWinner(board[row][col]);
          setIsPaused(true);
          return;
        }
      }
    }
  }

  // Function to render each cell in the game board
  function renderCell(cell, rowIndex, columnIndex) {
    let cellClass =
      cell === EMPTY
        ? "cell empty"
        : cell === PLAYER
        ? "cell player"
        : "cell ai";
    let cellStyle = {};

    if (cell === PLAYER) {
      cellStyle.backgroundColor = userColor;
      cellClass += " falling";
    } else if (cell !== EMPTY) {
      cellStyle.backgroundColor = computerColor;
      cellClass += " falling";
    }

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
      <h1 style={{ color: "white" }}>Connect Four</h1>
      <br />
      {winner && (
        <h2 style={{ color: "white" }}>
          Winner: {winner === PLAYER ? username : "AI"}
        </h2>
      )}

      <div
        className="board"
        style={{
          boxShadow: `0px 0px 150px ${
            currentPlayer === PLAYER ? userColor : computerColor
          }`,
          backgroundColor: tablacolor,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, columnIndex) =>
            renderCell(cell, rowIndex, columnIndex)
          )
        )}
      </div>
      <div className="buttonGame" style={{ color: computerColor }}>
        <button
          onClick={resetGame}
          className="button button-reset"
          style={{ backgroundColor: userColor, color: computerColor }}
        >
          Reset Game
        </button>
      </div>
      <button
        onClick={pauseGame}
        className="button button-pause"
        style={{ backgroundColor: userColor, color: computerColor }}
      >
        Pause Game
      </button>

      <Dialog open={isPaused} onClose={handleResume}>
        <DialogContent>
          <DialogContentText>Game is paused.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleResume} style={{ backgroundColor: tablacolor }}>
            Resume
          </button>
          <button
            onClick={handleQuit}
            style={{ backgroundColor: tablacolor }}
          >
            Create New Game
          </button>
          <button
            onClick={handleRestart}
            style={{ backgroundColor: tablacolor }}
          >
            Scores
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
