interface processEnv {
  MONGO_DB_URL: string
  PORT: number
  JWT_SECRET: string
  FRONTEND_ORIGIN: string
}

export { processEnv }
