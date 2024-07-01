import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

// Configure AWS SDK with your credentials
AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: 'eu-central-1', // Replace with your AWS region
});

const secretsManager = new AWS.SecretsManager();

const SecretComponent: React.FC = () => {
    const [secretValue, setSecretValue] = useState<string>('');

    useEffect(() => {
        const fetchSecret = async () => {
            try {
                const data = await secretsManager.getSecretValue({ SecretId: 'secretmaangertest' }).promise();
                if (data.SecretString) {
                    setSecretValue(JSON.parse(data.SecretString));
                } else {
                    throw new Error('SecretString not found');
                }
            } catch (err) {
                console.error('Error retrieving secret:', err);
                // Handle error as needed
            }
        };

        fetchSecret();
    }, []);

    return (
        <div>
            <h1>Secret Value</h1>
            <p>{secretValue}</p>
        </div>
    );
};

export default SecretComponent;
