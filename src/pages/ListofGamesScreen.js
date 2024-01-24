import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../animations/Animation - 1705746445626.json';
import leftAnimationData from '../animations/animasyon5.json';
import rightAnimationData from '../animations/animasyon6.json';
import "../css/ListofGame.css";

const ListofGamesScreen = () => {
  const [winnersCount, setWinnersCount] = useState({});
  const [gameName, setGameName] = useState(''); // State for storing the current game name
  const [gameHistory, setGameHistory] = useState(JSON.parse(localStorage.getItem("gameHistory") || "[]")); // State for game history

  useEffect(() => {
    const storedWinners = JSON.parse(localStorage.getItem('winners')) || [];
    const storedGameName = localStorage.getItem('gameName'); // Retrieve game name from local storage
    setGameName(storedGameName || 'Unknown Game'); // Set the game name or default to 'Unknown Game'

    // Count the winners and store in a state
    const count = {};
    storedWinners.forEach(winner => {
      count[winner] = (count[winner] || 0) + 1;
    });
    setWinnersCount(count);
  }, []);

  // Function to reset winners
  const resetWinners = () => {
    localStorage.removeItem('winners');
    setWinnersCount({});
  };

  // Default options for the main Lottie animation
  const defaultOptionsMain = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  // Default options for the left Lottie animation
  const defaultOptionsLeft = {
    loop: true,
    autoplay: true,
    animationData: leftAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  // Default options for the right Lottie animation
  const defaultOptionsRight = {
    loop: true,
    autoplay: true,
    animationData: rightAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="scoreboard">
      <div className="header">
        <h1>List Of Games</h1>
      </div>
      <h3>Winners</h3>
      
      <table>
        <thead>
          <tr>
            <th>GameName</th>
            <th>Player</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through game history and display each game in reverse order */}
          {gameHistory.reverse().map((game, index) => (
            <tr key={index}>
              <td>{game.gamename}</td>
              <td>{game.username}</td>
              <td>{game.winner}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Link to start a new game */}
      <Link to="/game" className="button button-start">Start Game</Link>
      {/* Button to reset scores */}
      <button onClick={resetWinners} className="button button-reset">Reset Scores</button>

      {/* Main animation container */}
      <div className="animation-container">
        <Lottie options={defaultOptionsMain} height={400} width={400} />
      </div>
      {/* Left animation container */}
      <div style={{ position: 'absolute', left: '90px', top: '50%', transform: 'translateY(-10%)' }}>
        <Lottie options={defaultOptionsLeft} height={300} width={300} />
      </div>

      {/* Right animation container */}
      <div style={{ position: 'absolute', right: '70px', top: '50%', transform: 'translateY(-10%)' }}>
        <Lottie options={defaultOptionsRight } height={300} width={300} speed={0.4} />
      </div>
    </div>
  );
};

export default ListofGamesScreen;
