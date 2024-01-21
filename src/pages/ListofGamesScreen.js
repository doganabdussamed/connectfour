import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../animations/Animation - 1705746445626.json';
import leftAnimationData from '../animations/animasyon5.json';
import rightAnimationData from '../animations/animasyon6.json';
import "../css/ListofGame.css";

const ListofGamesScreen = () => {
  const [winnersCount, setWinnersCount] = useState({});
  const [boxShadowColor, setBoxShadowColor] = useState('rgb(66, 81, 215)'); // Örnek renk

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

  const defaultOptionsMain = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const defaultOptionsLeft = {
    loop: true,
    autoplay: true,
    animationData: leftAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const defaultOptionsRight = {
    loop: true,
    autoplay: true,
    animationData: rightAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  // Dinamik boxShadow stilini uygulamak için
  const dynamicBoxShadow = {
    boxShadow: `${boxShadowColor} 0px 0px 700px`
  };

  return (
    <div className="scoreboard" style={dynamicBoxShadow}>
      <div className="header">
        <h1>List Of Games</h1>
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

      <div>
        <Lottie options={defaultOptionsMain} height={400} width={400} />
      </div>

      <div style={{ position: 'absolute', left: '90px', top: '50%', transform: 'translateY(-90%)' }}>
        <Lottie options={defaultOptionsLeft} height={300} width={300} />
      </div>

      <div style={{ position: 'absolute', right: '70px', top: '50%', transform: 'translateY(-10%)' }}>
        <Lottie options={defaultOptionsRight } height={300} width={300} speed={0.4} />
      </div>
    </div>
  );
};

export default ListofGamesScreen;