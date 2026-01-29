import 'dotenv/config';

type Environment = 'development' | 'test' | 'production';

const requiredEnvVars = ['PORT', 'NODE_ENV'] as const;

function validateEnv(): void {
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

validateEnv();

export const env = {
  nodeEnv: (process.env.NODE_ENV as Environment) || 'development',
  port: Number(process.env.PORT) || 3000,
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
};
