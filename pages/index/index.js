const app = getApp()

import util from "../../utils/util.js";

Page({
    data: {
        day_now: "2021年09月22日",
        minute_now: "20:20",
        lookup_time: "09-23 06:30",
        invalid_time: "09-23 24:00",
        my_name: "尹*",
        my_id: "43**************34",
    },

    onLoad: function (options) {
        var that = this
        that.setData({
            day_now: util.formatDayTime(new Date()),
            lookup_time: util.lookupTime(new Date()),
            invalid_time: util.invalidTime(new Date())
        })
        setInterval(function () {
            that.setData({
                minute_now: util.formatMinuteTime(new Date())
            })
        }, 1000)

        this.top = []
        this.bottom = []
        this.left = []
        this.right = []
        this.v = 5
        this.clock = 0

        // 通过 SelectorQuery 获取 Canvas 节点
        wx.createSelectorQuery()
            .select('#canvas')
            .fields({
                node: true,
                size: true,
            })
            .exec(this.init.bind(this))
    },

    init(res) {
        const width = res[0].width
        const height = res[0].height
        this.width = width
        this.height = height
        const canvas = res[0].node
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = width * dpr
        canvas.height = height * dpr
        const ctx = canvas.getContext('2d')
        ctx.scale(dpr, dpr)

        const number = 12
        const offset = 3
        const x_gap = height / number
        const y_gap = width / number
        for (var i = 0; i < number; ++i) {
            this.left.push(x_gap * i + offset)
            this.right.push(x_gap * i + offset)
            this.top.push(y_gap * i + offset)
            this.bottom.push(y_gap * i + offset)
        }

        const renderLoop = () => {
            this.render(canvas, ctx)
            canvas.requestAnimationFrame(renderLoop)
        }
        canvas.requestAnimationFrame(renderLoop)

        const img = canvas.createImage()
        img.onload = () => {
            this._img = img
        }
        img.src = '../../img/1.jpg'
    },

    render(canvas, ctx) {
        this.clock = (this.clock + 1) % 5
        if (this.clock) {
            return
        }
        ctx.clearRect(0, 0, this.width, this.height)
        this.drawMarquee(ctx)
        this.drawEgo(ctx)
    },

    drawMarquee(ctx) {
        function ball(x, y, r) {
            ctx.beginPath()
            ctx.arc(x, y, r, 0, Math.PI * 2)
            ctx.fillStyle = '#1aad19'
            ctx.strokeStyle = 'rgba(1,1,1,0)'
            ctx.fill()
            ctx.stroke()
        }
        const radius = 3
        const offset = 5
        const left = this.left
        const right = this.right
        const height_len = left.length
        for (var i = 0; i < height_len; ++i) {
            if (this.inRange(left[i], offset, this.height - offset)) {
                ball(left[i], radius, radius)
            }
            if (this.inRange(right[i], offset, this.height - offset)) {
                ball(right[i], this.width - radius, radius)
            }
            left[i] = (left[i] + this.v) % this.height
            right[i] = (right[i] - this.v + this.height) % this.height
        }

        const top = this.top
        const bottom = this.bottom
        const width_len = top.length
        for (var i = 0; i < width_len; ++i) {
            if (this.inRange(top[i], offset, this.width - offset)) {
                ball(radius, top[i], radius)
            }
            if (this.inRange(bottom[i], offset, this.width - offset)) {
                ball(this.height - radius, bottom[i], radius)
            }
            bottom[i] = (bottom[i] + this.v) % this.width
            top[i] = (top[i] - this.v + this.width) % this.width
        }
    },

    inRange(x, a, b) {
        return x > a && x < b
    },

    drawEgo(ctx) {
        if (!this._img) return
        ctx.drawImage(this._img, 15, 15, 210, 210)
        ctx.restore()
    }
})