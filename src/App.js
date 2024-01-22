// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GameCreationScreen from './pages/GameCreationScreen';
import ListofGamesScreen from './pages/ListofGamesScreen';
import GameScreen from './pages/GameScreen';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
    <Toaster />
    <Router>
      <TestFuc />
      <Routes>
        <Route path="/" element={<Navigate to="/GameCreation" />} />
        <Route path="/GameCreation" element={<GameCreationScreen />} />
        <Route path="/ListofGames" element={<ListofGamesScreen />} />
        <Route path="/game" element={<GameScreen />} />
      </Routes>
    </Router>
    </>
  );
};


const TestFuc = () => {

if (localStorage.getItem('gameName') === null) {
  window.location.href = "/GameCreation";

}
}

export default App;
