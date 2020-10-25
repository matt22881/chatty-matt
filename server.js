const io = require('socket.io')(5555)

const colors = ['mdntgrn','silvjer','silvhel','blk','char','vintgrn','vintsilv','vintgry','vintyel','vintbrn','vintblk']

const getColor = () => {
    const randnum = Math.round(Math.random()*11)
    return colors[randnum]
}

const styles = {}
const users = {}

io.on('connection', (socket) => {
    
    socket.on('new-user', name => {
        const style = getColor()
        users[socket.id] = name
        styles[socket.id] = style
        socket.broadcast.emit('user-connected', name, style)
        console.log(name ,' connected')
        console.log(users)
        console.log(styles)
    })

    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {
            message: message,
            name: users[socket.id],
            style: styles[socket.id]
        })
   })

   socket.on('disconnect', () => {
       socket.broadcast.emit('user-disconnected', users[socket.id], styles[socket.id])
       console.log(users[socket.id] ,' disconnected')
       delete users[socket.id]
       delete styles[socket.id]
    console.log(users)
    console.log(styles)
   })
})
  