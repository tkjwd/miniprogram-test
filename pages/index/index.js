//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //motto: {},
    latitude: '',
    longitude: '',
    speed: '',
    accuracy: '',
    altitude:'',
    verticalAccuracy: '',
    horizontalAccuracy:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  clickMe: function() {
    this.setData({
      motto:'欢迎来到上下链群接龙！'
    })
  },
  getLocation:function(){
    var _this=this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        var altitude = res.altitude
        var verticalAccuracy = res.verticalAccuracy
        var horizontalAccuracy = res.horizontalAccuracy
        _this.setData({
          latitude: latitude,
          longitude: longitude,
          speed: speed,
          accuracy: accuracy,
          altitude: altitude,
          verticalAccuracy: verticalAccuracy,
          horizontalAccuracy: horizontalAccuracy
        })
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/index/index'
    }
  }
})
