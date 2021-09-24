// pages/homepage/homepage.js

// const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
      navi: [
        "尹健",
        "本人健康码自查询",
        "本人信息扫码登记",
        "老幼健康码助查询",
        "他人健康码代查询",
        "核酸疫苗服务查询",
        "到访人信息登记簿",
        "京心自助"
      ]
    },

    click(e) {
        wx.navigateTo({
          url: '../index/index',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})