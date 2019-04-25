function init() {
    let mouse = {
        click: false,
        move: false,
        pos: {
            x: 0,
            y: 0
        },
        pos_prev: false
    }

    // Canvas
    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight

    canvas.width = width
    canvas.height = height

    const socket = io()

    canvas.addEventListener('mousedown', e => {
        mouse.click = true
    })

    canvas.addEventListener('mouseup', e => {
        mouse.click = false
    })

    canvas.addEventListener('mousemove', e => {
        mouse.pos.x = e.clientX / width
        mouse.pos.y = e.clientY / height
        mouse.move = true
    })

    socket.on('draw', data => {
        const line = data.line
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.moveTo(line[0].x * width, line[0].y * height)
        ctx.lineTo(line[1].x * width, line[1].y * height)
        ctx.stroke()
    })

    function mainLoop() {
        if (mouse.click && mouse.move && mouse.pos_prev) {
            socket.emit('draw', {
                line: [mouse.pos, mouse.pos_prev]
            })
            mouse.move = false
        }

        mouse.pos_prev = {
            x: mouse.pos.x,
            y: mouse.pos.y
        }

        setTimeout(mainLoop, 25)
    }

    mainLoop()
}

document.addEventListener('DOMContentLoaded', init)