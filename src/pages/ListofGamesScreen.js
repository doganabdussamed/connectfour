import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../animations/Animation - 1705746382104.json'; // Animasyon dosyasının yolu
import "../css/ListofGame.css"; // CSS dosyasını dahil et

const ListofGamesScreen = () => {
  const [winnersCount, setWinnersCount] = useState({});

  useEffect(() => {
    const storedWinners = JSON.parse(localStorage.getItem('winners')) || [];
    const count = {};
    storedWinners.forEach(winner => {
      count[winner] = (count[winner] || 0) + 1;
    });
    setWinnersCount(count);
  }, []);

  const resetWinners = () => {
    localStorage.removeItem('winners');
    setWinnersCount({});
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="scoreboard">
      <div className="header">
        <h1>List Of Game</h1>
      </div>
      <h3>Winners</h3>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(winnersCount)
            .sort((a, b) => b[1] - a[1]) 
            .slice(0, 5)
            .map(([winner, count], index) => (
              <tr key={index}>
                <td>{winner}</td>
                <td>{count}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Link to="/game" className="button button-start">Start Game</Link>
      <button onClick={resetWinners} className="button button-reset">Reset Scores</button>

      {/* Animasyonu ekle */}
      <div>
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    </div>
  );
};

export default ListofGamesScreen;
