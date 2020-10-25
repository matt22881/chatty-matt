const socket = io('http://localhost:5555')

const getLocalTime = () => {
    const d = new Date()
    var t = d.toLocaleString()
    return t
}

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-form')
const messageInput = document.getElementById('message-input')

let name = prompt('enter a username')
appendMessage(`You joined as ${name}`, 'user')
socket.emit('new-user', name)
   
socket.on('chat-message', (data) => {
    appendMessage(`${data.name}: ${data.message}`, data.style) 
})

socket.on('user-connected', (name, style) => {
    appendMessage(`${name} connected`, style)
})

socket.on('user-disconnected', (name, style) => {
    appendMessage(`${name} disconnected`, style)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    socket.emit('send-chat-message', message)
    appendMessage(`You: ${message}`, 'user')
    messageInput.value = ''
})

function appendMessage(message, style) {
    const t = getLocalTime()
    const messageElement = document.createElement('div')
    messageElement.classList.add(style)
    messageElement.classList.add('message')
    messageElement.innerText = `[${t}] ${message}`
    messageContainer.insertBefore(messageElement, messageContainer.firstChild)
}
