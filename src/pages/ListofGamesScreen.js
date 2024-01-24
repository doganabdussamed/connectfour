import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../animations/Animation - 1705746445626.json';
import leftAnimationData from '../animations/animasyon5.json';
import rightAnimationData from '../animations/animasyon6.json';
import "../css/ListofGame.css";

const ListofGamesScreen = () => {
  const [winnersCount, setWinnersCount] = useState({});
  const [gameName, setGameName] = useState(''); // GameName için state
const [gameHistory, setGameHistory] = useState(JSON.parse(localStorage.getItem("gameHistory") || "[]"));

  useEffect(() => {
    const storedWinners = JSON.parse(localStorage.getItem('winners')) || [];
    const storedGameName = localStorage.getItem('gameName'); // Yerel depolamadan GameName al
    setGameName(storedGameName || 'Unknown Game'); // Eğer GameName yoksa varsayılan değer

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
        {gameHistory.reverse().map((game, index) => (
  // GameHistory'i burada ters sırayla göster
  <tr key={index}>
    <td>{game.gamename}</td>
    <td>{game.username}</td>
    <td>{game.winner}</td>
  </tr>
))}

        </tbody>
      </table>
      <Link to="/game" className="button button-start">Start Game</Link>
      <button onClick={resetWinners} className="button button-reset">Reset Scores</button>

    <div className="animation-container">
      <Lottie options={defaultOptionsMain} height={400} width={400} />
    </div>
      <div style={{ position: 'absolute', left: '90px', top: '50%', transform: 'translateY(-10%)' }}>
        <Lottie options={defaultOptionsLeft} height={300} width={300} />
      </div>

      <div style={{ position: 'absolute', right: '70px', top: '50%', transform: 'translateY(-10%)' }}>
        <Lottie options={defaultOptionsRight } height={300} width={300} speed={0.4} />
      </div>
    </div>
  );
};

export default ListofGamesScreen;