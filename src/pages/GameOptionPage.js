// src/pages/GameOptionPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const GameOptionPage = () => {
  return (
    <div>
      <h2>Game Option Page</h2>
      {/* Oyun seçenekleri ve diğer içerikler buraya eklenecek */}
      <Link to="/game">
        <button>Start Game</button>
      </Link>
    </div>
  );
};

export default GameOptionPage;
