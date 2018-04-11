const w : number = window.innerWidth
const h : number = window.innerHeight
class State {
    public scales : Array<number> = [0, 0]
    private prevScale : number = 0
    private j : number = 0
    private dir : number = 0
    update(stopcb : Function) {
        this.scales[this.j] += this.dir * 0.1
        if (Math.abs(this.prevScale - this.scales[this.j]) > 1) {
            this.scales[this.j] = this.prevScale + this.dir
            this.j += this.dir
            if (this.j == this.scales.length || this.j == -1) {
                this.j -= this.dir
                this.dir = 0
                this.prevScale = this.scales[this.j]
                stopcb()
            }
        }
    }
    startUpdating(startcb : Function) {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale
            startcb()
        }
    }
}

class Animator {
    private animated : boolean = false
    private interval : number
    start(updatecb : Function) {
        if (!this.animated) {
            this.animated = true
            this.interval = setInterval(() => {
                updatecb()
            }, 50)
        }
    }
    stop() {
        if (this.animated) {
            this.animated = false
            clearInterval(this.interval)
        }
    }
}

function drawArc(context : CanvasRenderingContext2D, x : number, y : number, r : number, center : boolean, fill : boolean, scale : number) {
    context.save()
    context.translate(x, y)
    for (var i = 0; i < 360 * scale; i++) {
        const xa : number = r * Math.cos(i * Math.PI/180)
        const ya : number = r * Math.sin(i * Math.PI/180)
        if (i == 0) {
            if (center) {
                context.moveTo(0, 0)
            }
            else {
                context.moveTo(xa, ya)
            }
        }
        else {
            context.lineTo(xa, ya)
        }
    }
    if (fill) {
        context.fill()
    }
    else {
        context.lineWidth = r/6
        context.lineCap = 'round'
        context.stroke()
    }
    context.restore()
}

class ArcSweeper {
    private state : State = new State()
    draw(context : CanvasRenderingContext2D) {
        context.fillStyle = '#4527A0'
        context.strokeStyle = '#4527A0'
        drawArc(context, w/2, h/2, Math.min(w,h)/8, false, false, this.state.scales[0])
        drawArc(context, w/2, h/2, Math.min(w,h)/8, true, true, this.state.scales[1])
    }
    update(stopcb : Function) {
        this.state.update(stopcb)
    }
    startUpdating(startcb : Function) {
        this.state.startUpdating(startcb)
    }
}
