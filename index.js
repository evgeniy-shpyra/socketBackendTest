const express = require("express")
const cors = require("cors")
const socket = require("socket.io")

const app = express()
const port = 8080

app.use(cors())
app.use(express.json())

const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
    },
})

io.on("connection", (socket) => {
    console.log("user connected " + socket.id)

    socket.on('join_room', (data) => {
        socket.join(data)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit('receive_message', {message: data.message})
        // broadcast
    })
})
