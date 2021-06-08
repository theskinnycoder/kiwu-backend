import { config } from 'dotenv-safe';

// DotENV Config
config();

// Export all environment variables
export const { PORT, NODE_ENV, MONGO_URI, COOKIE_NAME, JWT_SECRET } = process.env;

// Export all constants
export const IS_PROD = NODE_ENV === 'production';
