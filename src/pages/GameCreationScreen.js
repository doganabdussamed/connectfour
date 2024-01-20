import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div>
      <h2>GameCreation</h2>
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
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <button onClick={handleGameCreation}>GameCreation</button>
    </div>
  );
};

export default GameCreation;
