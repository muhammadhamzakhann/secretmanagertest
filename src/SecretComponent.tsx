import React, { useEffect, useState } from 'react';

const SecretComponent: React.FC = () => {
  const [secret, setSecret] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSecret = async () => {
      try {
        const response = await fetch('https://73afw5og0k.execute-api.eu-central-1.amazonaws.com/default/secrets');
        if (!response.ok) {
          throw new Error('Failed to fetch secret');
        }
        const data = await response.json();
        const secretJson = JSON.parse(data.secret);
        setSecret(secretJson);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchSecret();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {secret ? (
        <div>
          <div>Key1: {secret.API_SECRET}</div>
          <div>Key2: {secret.API_ACCESS}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SecretComponent;