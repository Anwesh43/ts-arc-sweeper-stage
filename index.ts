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
    startUpating(startcb : Function) {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale
            startcb()
        }
    }
}
