// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GameCreationScreen from './pages/GameCreationScreen';
import ListofGamesScreen from './pages/ListofGamesScreen';
import GameScreen from './pages/GameScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/GameCreation" />} />
        <Route path="/GameCreation" element={<GameCreationScreen />} />
        <Route path="/ListofGames" element={<ListofGamesScreen />} />
        <Route path="/game" element={<GameScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
