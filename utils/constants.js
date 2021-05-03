import dotenv from "dotenv-safe"

// DotENV Config
dotenv.config()

// Export all environment variables
export const {
  PORT,
  NODE_ENV,
  MONGO_URI,
  COOKIE_NAME,
  JWT_SECRET
} = process.env

// Export all constants
export const __is_prod__ = NODE_ENV === "production"
