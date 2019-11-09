//index.js
//获取应用实例
const app = getApp()
var wxDraw = require("../../utils/wxdraw.min.js").wxDraw;
var Shape = require("../../utils/wxdraw.min.js").Shape;
var AnimationFrame = require("../../utils/wxdraw.min.js").AnimationFrame;

Page({
  data: {
    tarbarItems:[
      {
        "key": "home",
        "text": "首页",
        "iconPath": "../../assets/icons/home.png",
        "selectedIconPath": "../../assets/icons/home_active.png"
      },
      {
        "key": "mine",
        "text": "我的",
        "iconPath": "../../assets/icons/mine.png",
        "selectedIconPath": "../../assets/icons/mine_active.png"
      }
    ],
    currentTab: 0,
    isCanvasShow: 0,
    wxCanvas: null,
    animateColor: ["#4285f4", "#ea4335", "#fbbc05", "#5961F9", "#4285f4", "#34a853", "#ea4335", "#C32BAC", "#F067B4", "#1904E5", "#81FFEF",
     "#3C8CE7", "#FFE985", "#FFE985"]
  },
  //事件处理函数
  tabbarChange: function(e) {
    let that = this
    if (this.data.currentTab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  bindtouchmove: function (e) {
    // 检测手指点击 之后的移动事件
    this.wxCanvas.touchmoveDetect(e);
  },
  bindtouchend: function () {
    //检测手指点击 移出事件
    this.wxCanvas.touchendDetect();
  },
  bindtap: function (e) {
    this.wxCanvas.tapDetect(e);
  },
  bindlongpress: function (e) {
    // console.log(e);
    this.wxCanvas.longpressDetect(e);
  },
  sayingsInit: function (sayings) {
    var textArr = []
    var colorArr = this.data.animateColor
    for(var i= 0;i < sayings.length; i++) {
      var text = new Shape('text', {
        text: sayings[i],
        x: 50 + 30 * parseInt(i),
        y: 400,
        fontSize: 30,
        fillStyle: colorArr[i]
      }, 'fill', false)
      this.wxCanvas.add(text)
      textArr.push(text)
    }
    for (var i = 0; i < sayings.length; i++) {
      (function (j) {
        setTimeout(function () {
          textArr[j].animate({ "y": "-=100" }, { easing: "swingTo", duration: 1000 }).animate({ "y": "+=100" }, { easing: "swingFrom", duration: 1000 }).start(true)
        }, 300 + 50 * j);
      })(i)
    }
  },
  entryAnimation: function () {
    var context = wx.createCanvasContext('enteryCanvas')
    this.wxCanvas = new wxDraw(context, 0, 0, 400, 500);
    var sayings ="世上无难事，只要肯放弃" 
    this.sayingsInit(sayings)
  },
  onLoad: function () {
    this.entryAnimation()
    setTimeout(() => {
      this.setData({
        isCanvasShow: 1
      })
      this.wxCanvas.clear(); //推荐这个
    }, 3500)
  },
  onUnload: function () {
  }
})
