import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

const SecretComponent: React.FC = () => {
  const [secretValue, setSecretValue] = useState<string>('');

  useEffect(() => {
    const fetchSecret = async () => {
      const secretName = 'secretmaangertest';  // Change this to your secret name
      const region = 'eu-central-1';  // Change this to your AWS region

      AWS.config.update({ region: region });

      const client = new AWS.SecretsManager({ region: region });

      try {
        const data = await client.getSecretValue({ SecretId: secretName }).promise();
        if ('SecretString' in data) {
          setSecretValue(data.SecretString!);
        } else {
          const buff = Buffer.from(data.SecretBinary as string, 'base64');
          setSecretValue(buff.toString('ascii'));
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
