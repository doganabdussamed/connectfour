import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [userColor, setUserColor] = useState('');
  const [computerColor, setComputerColor] = useState('');
  const [savedUsername, setSavedUsername] = useState('');
  const [rememberUser, setRememberUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Daha önce kaydedilmiş bir kullanıcı adı ve renk var mı kontrol et
    const savedUsernameFromStorage = localStorage.getItem('username');
    const savedUserColorFromStorage = localStorage.getItem('userColor');
    const savedComputerColorFromStorage = localStorage.getItem('computerColor');

    if (savedUsernameFromStorage) {
      setSavedUsername(savedUsernameFromStorage);
    }

    if (savedUserColorFromStorage) {
      setUserColor(savedUserColorFromStorage);
    }

    if (savedComputerColorFromStorage) {
      setComputerColor(savedComputerColorFromStorage);
    }
  }, []);

  const handleLogin = () => {
    // Eğer daha önce isim girilmişse ve şu anki isimle aynı değilse uyarı ver
    if (savedUsername && username !== savedUsername && !rememberUser) {
      const confirmMessage = "You've played the game before with a different username. If you continue, your previous progress will be lost. Do you want to continue?";
      if (!window.confirm(confirmMessage)) {
        return;
      }
    }

    // Kullanıcı ve bilgisayarın renklerini kaydet
    localStorage.setItem('username', username);
    localStorage.setItem('userColor', userColor);
    localStorage.setItem('computerColor', computerColor);

    // Kullanıcıyı karşıla ve console'a yazdır
    console.log(`Welcome, ${username}! Your color is ${userColor}. Computer's color is ${computerColor}.`);

    // Eğer kullanıcı hatırlanması istiyorsa, kullanıcı bilgilerini state'te sakla
    if (rememberUser) {
      setSavedUsername(username);
    } else {
      // Hatırlanmıyorsa, önceki kullanıcı bilgilerini temizle
      setSavedUsername('');
    }

    // Giriş başarılıysa GameOption sayfasına yönlendir
    navigate('/game-option');
  };

  return (
    <div>
      <h2>Login</h2>
      {savedUsername && <p>Welcome back, {savedUsername}!</p>}
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
      <label>
        Remember me:
        <input
          type="checkbox"
          checked={rememberUser}
          onChange={() => setRememberUser(!rememberUser)}
        />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
