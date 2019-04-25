module.exports = io => {

    let line_history = []

    io.on('connection', socket => {
        console.log('New User Connect')

        for (let i in line_history) {
            socket.emit('draw', {
                line: line_history[i]
            })
        }


        socket.on('draw', data => {
            line_history.push(data.line)
            io.emit('draw', data)
        })
    })
}