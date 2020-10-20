const io = require('socket.io')(5555)

io.on('connection', (socket) => {
    console.log('new-user')
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', message)
        console.log('server-message')
   })
})
