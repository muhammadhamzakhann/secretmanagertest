import React from 'react';
import './App.css';
import SecretComponent from './SecretComponent';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <SecretComponent />
      </header>
    </div>
  );
};

export default App;
