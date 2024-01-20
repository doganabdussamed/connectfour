import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import leftAnimationData from '../animations/Animation - 1705746382104.json'; // Sol animasyon verisi
import rightAnimationData from '../animations/animasyon8.json'; // Sağ animasyon verisi
import "../css/GameCreation.css"; // CSS dosyası dahil edildi

const GameCreation = () => {
  const [username, setUsername] = useState('');
  const [userColor, setUserColor] = useState('#ffffff'); // Varsayılan renk beyaz
  const [computerColor, setComputerColor] = useState('#000000'); // Varsayılan renk siyah
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('username', username);
    localStorage.setItem('userColor', userColor);
    localStorage.setItem('computerColor', computerColor);
  }, [username, userColor, computerColor]);

  const handleGameCreation = () => {
    navigate('/ListofGames');
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

  const dynamicStyle = {
    boxShadow: `0px 0px 700px ${userColor}`, // Oyuncunun seçtiği renk
  };

  return (
    <div className="game-creation-container" style={dynamicStyle}>
      <div className="header">
        <h1>Game Creation</h1>
      </div>
      <div className="form-container">
        {/* Form elemanları */}
        <label>
          Select your color:
          <input
            type="color"
            value={userColor}
            onChange={(e) => setUserColor(e.target.value)}
          />
        </label>
        <br />
        <label>
          Select computer's color:
          <input
            type="color"
            value={computerColor}
            onChange={(e) => setComputerColor(e.target.value)}
          />
        </label>
        <br />
        <input
          type="text"
          placeholder="Enter your username"
          className="username-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <button onClick={handleGameCreation} className="button button-create">Create Game</button>
      </div>
      <div style={{ position: 'absolute', left: '90px', top: '50%', transform: 'translateY(-1%)' }}>
        <Lottie options={defaultOptionsLeft} height={500} width={350} />
      </div>
      <div style={{ position: 'absolute', right: '70px', top: '50%', transform: 'translateY(-99%)' }}>
        <Lottie options={defaultOptionsRight} height={300} width={300} />
      </div>
    </div>
  );
};

export default GameCreation;
