import express from "express"
import dotenv from "dotenv"
import cors, { CorsOptions } from "cors"
import ConnectDB from "./Config/DB"
import userRoute from "./Routes/userRoute"
import notesRoute from "./Routes/notesRoute"
import { notFound, errorHandler } from "./Middleware/errorMiddleware"

const env = dotenv.config()

ConnectDB()

// Define your CORS whitelist
const whitelist = ["http://127.0.0.1:5173/"]

// Set up CORS options
const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (origin && whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
}

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/user", userRoute)
app.use("/api/notes", notesRoute)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
