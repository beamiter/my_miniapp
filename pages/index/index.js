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

        this.vec1d = []
        this.v = 5
        this.radius = 3
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
        const canvas = res[0].node
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = width * dpr
        canvas.height = height * dpr
        const ctx = canvas.getContext('2d')
        ctx.scale(dpr, dpr)

        this.width = width - 2 * this.radius
        this.height = height - 2 * this.radius

        const number = 48
        const gap = (this.width + this.height) * 2 / number
        // console.log(number, gap, this.width, this.height)
        for (var i = 0; i < number; ++i) {
            this.vec1d.push(gap * i)
            // console.log(gap * i)
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
        ctx.clearRect(0, 0, this.width + 50, this.height + 50)
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

        function toCoord(dim1, width, height) {
            const mile0 = 2 * (width + height)
            const mile1 = 2 * width + height
            const mile2 = width + height
            const mile3 = width
            if (dim1 >= mile0) {
                return toCoord(dim1 - mile0, width, height)
            }
            if (dim1 > mile1) {
                return [mile0 - dim1, 0]
            }
            if (dim1 > mile2) {
                return [height, mile1 - dim1]
            }
            if (dim1 > mile3) {
                return [dim1 - mile3, width]
            }
            return [0, dim1]
        }

        const vec1d = this.vec1d
        const dim1_len = vec1d.length
        const perimeter = 2 * (this.width + this.height)
        for (var i = 0; i < dim1_len; ++i) {
            const coord = toCoord(vec1d[i], this.width, this.height)
            // console.log(i, vec1d[i], coord[0], coord[1], perimeter)
            ball(coord[0] + this.radius, coord[1] + this.radius, this.radius)
            vec1d[i] = (vec1d[i] + this.v) % perimeter
        }
    },

    drawEgo(ctx) {
        if (!this._img) return
        ctx.drawImage(this._img, 15, 15, 210, 210)
        ctx.restore()
    }
})