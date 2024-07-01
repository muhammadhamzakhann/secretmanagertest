import React from 'react';
import './App.css';
import SecretComponent from './SecretComponent';
import dotenv from 'dotenv';

dotenv.config();

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Secrets Manager Demo</h1>
        <SecretComponent />
      </header>
    </div>
  );
};

export default App;