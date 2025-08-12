// Environment variable validation
export function validateEnv() {
  const requiredEnvVars = [
    'MONGODB_URI',
    'JWT_SECRET'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
}

// Validate environment variables on module load
validateEnv();
