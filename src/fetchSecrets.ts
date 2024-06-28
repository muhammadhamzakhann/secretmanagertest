import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({
  region: "eu-central-1", // Update to your region
});

export const getSecretValue = async (secretName: string): Promise<any> => {
  try {
    const command = new GetSecretValueCommand({ SecretId: secretName });
    const response = await client.send(command);
    if (response.SecretString) {
      return JSON.parse(response.SecretString);
    } else {
      throw new Error("SecretString is undefined");
    }
  } catch (error) {
    console.error("Error fetching secret: ", error);
    throw error;
  }
};
