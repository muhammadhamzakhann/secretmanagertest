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
  const [secret, setSecret] = useState<string | null>(null);
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
        setSecret(response.SecretString || null);
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
      {secret ? <div>Secret: {secret}</div> : <div>Loading...</div>}
    </div>
  );
};

export default SecretComponent;
