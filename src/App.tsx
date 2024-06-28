import React, { useEffect, useState } from 'react';
import { getSecretValue } from './fetchSecrets';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchSecrets = async () => {
      try {
        const secrets = await getSecretValue('secretmaangertest');
        setApiKey(secrets.REACT_APP_API_KEY);
      } catch (error) {
        console.error('Error fetching secrets', error);
      }
    };
    fetchSecrets();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>API Key: {apiKey}</p>
      </header>
    </div>
  );
};

export default App;
