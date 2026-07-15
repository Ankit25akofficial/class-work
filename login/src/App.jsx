import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function App() {
  const [userEmail, setUserEmail] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portal_theme') || 'dark';
  });

  // Load accounts from localStorage or initialize with a default account
  useEffect(() => {
    const savedAccounts = localStorage.getItem('portal_accounts');
    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts));
    } else {
      const defaultAccounts = [
        { email: 'admin@example.com', password: 'admin123', name: 'System Admin' }
      ];
      localStorage.setItem('portal_accounts', JSON.stringify(defaultAccounts));
      setAccounts(defaultAccounts);
    }
  }, []);

  // Sync theme with document class or attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portal_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogin = (email, password) => {
    const account = accounts.find(acc => acc.email.toLowerCase() === email.toLowerCase());
    
    if (!account) {
      return { success: false, error: 'No account registered with this email address' };
    }
    
    if (account.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again' };
    }

    setUserEmail(account.email);
    return { success: true };
  };

  const handleRegister = (name, email, password) => {
    const emailExists = accounts.some(acc => acc.email.toLowerCase() === email.toLowerCase());
    
    if (emailExists) {
      return { success: false, error: 'An account with this email already exists' };
    }

    const newAccount = { name, email, password };
    const updatedAccounts = [...accounts, newAccount];
    setAccounts(updatedAccounts);
    localStorage.setItem('portal_accounts', JSON.stringify(updatedAccounts));
    
    return { success: true };
  };

  const handleLogout = () => {
    setUserEmail('');
  };

  return (
    <div className="app-container">
      {userEmail ? (
        <Dashboard 
          email={userEmail} 
          onLogout={handleLogout} 
          theme={theme} 
          onToggleTheme={toggleTheme} 
        />
      ) : (
        <LoginForm 
          onLogin={handleLogin} 
          onRegister={handleRegister} 
          theme={theme} 
          onToggleTheme={toggleTheme} 
        />
      )}
    </div>
  );
}

export default App;
