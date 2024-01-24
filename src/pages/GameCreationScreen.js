import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import leftAnimationData from '../animations/Animation - 1705746382104.json';
import rightAnimationData from '../animations/animasyon8.json';
import "../css/GameCreation.css";
import toast from 'react-hot-toast';

const GameCreation = () => {
  // State variables
  const [username, setUsername] = useState('');
  const [gameName, setGameName] = useState('');
  const [userColor, setUserColor] = useState('#ffffff');
  const [computerColor, setComputerColor] = useState('#000000');
  const [tablacolor, settablacolor] = useState("#000000"); // Default color is black
  const navigate = useNavigate();

  // useEffect to load last used username and game name from localStorage
  useEffect(() => {
    const storedUsernames = JSON.parse(localStorage.getItem('usernames')) || [];
    const storedGameNames = JSON.parse(localStorage.getItem('gameNames')) || [];

    setUsername(storedUsernames[storedUsernames.length - 1] || '');
    setGameName(storedGameNames[storedGameNames.length - 1] || '');
  }, []);

  // useEffect to update localStorage with user preferences
  useEffect(() => {
    localStorage.setItem('username', username);
    localStorage.setItem('gameName', gameName);
    localStorage.setItem('userColor', userColor);
    localStorage.setItem('computerColor', computerColor);
    localStorage.setItem("tablacolor", tablacolor);

    // Update last 5 usernames and game names
    const storedUsernames = JSON.parse(localStorage.getItem('usernames')) || [];
    const storedGameNames = JSON.parse(localStorage.getItem('gameNames')) || [];

    storedUsernames.push(username);
    storedGameNames.push(gameName);

    const last5Usernames = storedUsernames.slice(-5);
    const last5GameNames = storedGameNames.slice(-5);

    localStorage.setItem('usernames', JSON.stringify(last5Usernames));
    localStorage.setItem('gameNames', JSON.stringify(last5GameNames));
  }, [username, gameName, userColor, computerColor, tablacolor]);

  // Function to handle game creation
  const handleGameCreation = () => {
    if (!username) {
      toast.error('Username not entered. Please enter a username.');
    } else {
      // Navigate to the ListofGames screen
      navigate('/ListofGames');
    }
  };

  // Animation options for the left Lottie animation
  const defaultOptionsLeft = {
    loop: true,
    autoplay: true,
    animationData: leftAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  // Animation options for the right Lottie animation
  const defaultOptionsRight = {
    loop: true,
    autoplay: true,
    animationData: rightAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  // Dynamic styles based on userColor and tablacolor
  const dynamicStyle = {
    boxShadow: `0px 0px 700px ${userColor}`,
    background: tablacolor,
  };

  return (
    <div className="game-creation-container" style={dynamicStyle}>
      <div className="header">
        <h1>Game Creation</h1>
      </div>
      <div className="form-container">
        {/* Input for selecting user color */}
        <label>
          Select your color:
          <input
            type="color"
            value={userColor}
            onChange={(e) => setUserColor(e.target.value)}
          />
        </label>
        <br />
        {/* Input for selecting AI color */}
        <label>
          Select AI color:
          <input
            type="color"
            value={computerColor}
            onChange={(e) => setComputerColor(e.target.value)}
          />
        </label>
        <br />
        {/* Input for selecting game board color */}
        <label>
          Game Board color:
          <input
            type="color"
            value={tablacolor}
            onChange={(e) => settablacolor(e.target.value)}
          />
        </label>
        <br />
        {/* Input for entering username */}
        <input
          type="text"
          placeholder="Enter your username"
          className="username-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        {/* Input for entering game name */}
        <input
          type="text"
          placeholder="Enter game name"
          className="game-name-input"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />
        <br />
        {/* Button to create the game */}
        <button 
          onClick={handleGameCreation} 
          className="button button-create"
        >
          Create Game
        </button>
      </div>
      {/* Left Lottie animation */}
      <div style={{ position: 'absolute', left: '90px', top: '50%', transform: 'translateY(-1%)' }}>
        <Lottie options={defaultOptionsLeft} height={500} width={350} />
      </div>
      {/* Right Lottie animation */}
      <div style={{ position: 'absolute', right: '70px', top: '50%', transform: 'translateY(-99%)' }}>
        <Lottie options={defaultOptionsRight} height={300} width={300} />
      </div>
    </div>
  );
};

export default GameCreation;
