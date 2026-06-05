import { useEffect, useState } from 'react';
import './PasswordProtect.css';

interface PasswordProtectProps {
  children: React.ReactNode;
}

export function PasswordProtect({ children }: PasswordProtectProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const CORRECT_PASSWORD = 'gyghiC-fytbyz-1cipdy';

  useEffect(() => {
    // Check if already authenticated
    if (localStorage.getItem('authenticated') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleCheckPassword = () => {
    if (password === CORRECT_PASSWORD) {
      localStorage.setItem('authenticated', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('❌ Incorrect password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    setIsAuthenticated(false);
    setPassword('');
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheckPassword();
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="password-container">
      <div className="password-box">
        <h1>🔒 Protected Site</h1>
        <p>Enter password to continue:</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Password"
        />
        <button onClick={handleCheckPassword}>Enter</button>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}
