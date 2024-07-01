import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

const SecretComponent: React.FC = () => {
  const [secretValue, setSecretValue] = useState<string>('');

  useEffect(() => {
    const fetchSecret = async () => {
      const secretName = 'secretmaangertest';  // Change this to your secret name
      const region = 'eu-central-1';  // Change this to your AWS region
      const secretKey = 'REACT_APP_API_KEY';  // Change this to the specific key you want to retrieve
      AWS.config.update({ region: region });

      const client = new AWS.SecretsManager();

      try {
        const data = await client.getSecretValue({ SecretId: secretName }).promise();
        let secretString;
        if ('SecretString' in data) {
          secretString = data.SecretString;
        } else {
          const buff = Buffer.from(data.SecretBinary as string, 'base64');
          secretString = buff.toString('ascii');
        }

        if (secretString) {
          const secretJSON = JSON.parse(secretString);
          setSecretValue(secretJSON[secretKey]);
        }
      } catch (err) {
        console.error('Error fetching secret:', err);
      }
    };

    fetchSecret();
  }, []);

  return (
    <div>
      <h1>Secret Value:</h1>
      <p>{secretValue}</p>
    </div>
  );
};

export default SecretComponent;
