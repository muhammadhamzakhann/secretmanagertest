import React, { useEffect, useState } from 'react';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secret_name = "secretmaangertest";

const client = new SecretsManagerClient({
  region: "eu-central-1",
});

const SecretComponent: React.FC = () => {
  const [secret, setSecret] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSecret = async () => {
      let response;
      try {
        response = await client.send(
          new GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
          })
        );
        if (response.SecretString) {
          const secretJson = JSON.parse(response.SecretString);
          setSecret(secretJson);
        }
      } catch (err) {
        setError(err as Error);
      }
    };

    fetchSecret();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {secret ? (
        <div>
          {/* Access specific values from the secret JSON object */}
          <div>Key1: {secret.API_SECRET}</div>
          <div>Key2: {secret.API_KEY}</div>
          {/* Add more keys as needed */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SecretComponent;
