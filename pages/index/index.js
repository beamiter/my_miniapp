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

    onLoad: function(options) {
        var that = this;
        that.setData({
            day_now: util.formatDayTime(new Date()),
            lookup_time: util.lookupTime(new Date()),
            invalid_time: util.invalidTime(new Date())
        })
        setInterval(function(){
            that.setData({
                minute_now: util.formatMinuteTime(new Date())
            })
        })
    },
})