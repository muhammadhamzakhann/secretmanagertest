import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({ region: 'eu-central-1' });

const secretsManager = new AWS.SecretsManager();

const SecretComponent: React.FC = () => {
    const [secretValue, setSecretValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchSecret = async () => {
            try {
                const data = await secretsManager.getSecretValue({ SecretId: 'secretmaangertest' }).promise();
                if (data.SecretString) {
                    setSecretValue(JSON.parse(data.SecretString));
                } else {
                    throw new Error('SecretString not found');
                }
                console.log(data);
            } catch (err) {
                let errorMessage = 'Error retrieving secret: ';

                // Check if the error is an AWS SDK error
                if (err instanceof Error && (err as AWS.AWSError).code) {
                    const awsError = err as AWS.AWSError;
                    errorMessage += `AWS Error Code: ${awsError.code}, Message: ${awsError.message}`;
                } else if (err instanceof Error) {
                    errorMessage += err.message;
                }

                // Log the full error object for debugging purposes
                console.error('Error object:', err);
                console.error(errorMessage);

                setError(errorMessage);
            }
        };

        fetchSecret();
    }, []);

    return (
        <div>
            <h1>Secret Value</h1>
            {secretValue ? <p>{secretValue}</p> : <p>{error}</p>}
        </div>
    );
};

export default SecretComponent;
