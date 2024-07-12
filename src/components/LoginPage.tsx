import React, { useState } from 'react';
import AWS from 'aws-sdk';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secretValue, setSecretValue] = useState<string | null>(null);

  const fetchSecret = async () => {
    const secretsManager = new AWS.SecretsManager({
      region: 'eu-central-1' // Update with your region
    });

    try {
      const data = await secretsManager.getSecretValue({ SecretId: 'your-secret-id' }).promise();
      if ('SecretString' in data && data.SecretString) {
        setSecretValue(data.SecretString);
      } else {
        console.error('SecretString is undefined');
      }
    } catch (err) {
      console.error('Failed to fetch secret', err);
    }
  };

  const handleLogin = () => {
    if (username === 'admin' && password === secretValue) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <h2>Login Page</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Loginn</button>
          <button onClick={fetchSecret}>Fetch Secret</button>
        </div>
      ) : (
        <div>
          <h2>Home Page</h2>
          <p>Welcome to the Home Page!</p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
