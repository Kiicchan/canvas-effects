const canvas = document.getElementById('canvas1')
canvas.height = window.innerHeight
canvas.width = window.innerWidth
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
})

const ctx = canvas.getContext('2d')
ctx.strokeStyle = '#000000'
ctx.globalAlpha = 0.3
ctx.lineWidth = 5
ctx.arc(canvas.width/2, canvas.height/2, canvas.height/4, 0, 2 * Math.PI, false)
ctx.stroke();