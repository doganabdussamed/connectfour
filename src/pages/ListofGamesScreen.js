import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/ListofGame.css'; // CSS dosyasını dahil et

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

  return (
    <div className="container">
      <h2>Game Option Page</h2>
      <div>
        <h3>Winners</h3>
        <ul className="winners-list">
          {Object.entries(winnersCount)
            .sort((a, b) => b[1] - a[1]) // Kazanma sayısına göre sırala
            .slice(0, 5) // En fazla 5 kazananı al
            .map(([winner, count], index) => (
              <li key={index}>
                {winner}: {count} wins
              </li>
            ))}
        </ul>
      </div>
      <button onClick={resetWinners}>Reset Scores</button>
      <br />
      <Link to="/game" className="link-button">
        <button>Start Game</button>
      </Link>
    </div>
  );
};

export default ListofGamesScreen;
