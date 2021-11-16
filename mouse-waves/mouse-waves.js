const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
canvas.height = window.innerHeight
canvas.width = window.innerWidth
canvas.style.position = 'fixed'
canvas.style.top = '0'
canvas.style.left = '0'
canvas.style.pointerEvents = 'none'

document.querySelector('body').appendChild(canvas)
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
})

function Wave(x, y) {
    var radius = 1
    var speed = 5
    var wavelenght = 5
    var amplitude = 0.5

    this.draw = (ctx) => {
        ctx.beginPath()
        ctx.strokeStyle = '#000000'
        ctx.globalAlpha = amplitude > 0 ? amplitude : 0
        ctx.lineWidth = wavelenght
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
        ctx.stroke();
    }

    this.propagate = () => {
        radius += speed
        wavelenght += 0.5
        amplitude -= 0.01
        if (amplitude < 0) {
            this.invisible = true
        }
    }
}

function throttle(func, interval) {
    var lastCall = 0;
    return function() {
        var now = Date.now();
        if (lastCall + interval < now) {
            lastCall = now;
            return func.apply(this, arguments);
        }
    };
}

const waves = []
const handleMouseMove = throttle((ev) => {
    waves.unshift(new Wave(ev.clientX, ev.clientY))
}, 200)

window.addEventListener('mousemove', handleMouseMove)

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    waves.forEach((wave, _, array) => {
        wave.draw(ctx)
        wave.propagate()
        if (wave.invisible) {
           array.pop() 
        }
    })
    requestAnimationFrame(animate)
}

animate();