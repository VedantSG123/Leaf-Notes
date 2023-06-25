export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_DB_URL:string
      PORT:string
      JWT_SECRET:string
    }
  }
}
