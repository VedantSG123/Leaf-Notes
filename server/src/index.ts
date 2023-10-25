import express from "express"
import dotenv from "dotenv"
import cors, { CorsOptions } from "cors"
import socketIo from "socket.io"
import ConnectDB from "./Config/DB"
import userRoute from "./Routes/userRoute"
import notesRoute from "./Routes/notesRoute"
import requestRoute from "./Routes/requestRoute"
import { Note } from "./Models/noteModel"
import { notFound, errorHandler } from "./Middleware/errorMiddleware"

const env = dotenv.config()

ConnectDB()

const PORT = process.env.PORT
const FRONTEND = process.env.FRONTEND_ORIGIN

// Define your CORS whitelist
const whitelist = ["http://127.0.0.1:5173", FRONTEND]

// Set up CORS options
// const corsOptions: CorsOptions = {
//   origin: (
//     origin: string | undefined,
//     callback: (err: Error | null, allow?: boolean) => void
//   ) => {
//     if (origin && whitelist.includes(origin)) {
//       callback(null, true)
//     } else {
//       callback(new Error("Not allowed by CORS"))
//     }
//   },
// }

const corsOptions: CorsOptions = {
  origin: "*",
}

const app = express()
app.use(express.json())
app.use(cors(corsOptions))

app.use("/api/user", userRoute)
app.use("/api/notes", notesRoute)
app.use("/api/collab", requestRoute)
app.use(notFound)
app.use(errorHandler)

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

const io = new socketIo.Server(server, {
  /* options */
  cors: {
    origin: "*",
  },
})

io.on("connection", (socket) => {
  socket.on("connect-room", (id: string) => {
    socket.join(id)
    socket.emit("connected-room", id)
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(id).emit("receive-changes", delta)
    })
    socket.on("save-changes", async (payload) => {
      try {
        const updatedNote = await Note.findByIdAndUpdate(
          payload.id,
          { $set: { [payload.field]: payload.data } },
          {
            new: true,
          }
        )
      } catch (err) {
        socket.emit("save-error", err)
      }
    })
  })
})
