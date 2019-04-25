// Variables
const express = require('express')
const path = require('path')
const socket = require('socket.io')
const http = require('http')

// Inicialización
const app = express()
const server = http.createServer(app)
const io = socket(server)

// Configuraciones
app.set('port', process.env.PORT || 3000)

// Sockets
require('./socket')(io)

// Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

// Start server
server.listen(app.get('port'), () => {
    console.log(`Server corriendo en el puerto ${app.get('port')}`)
})