//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    clubs:[
      {name:"1"},
      { name: "2" },
      { name: "3" },
      { name: "4" },
      { name: "5" },
    ],
    showSkeleton: true
  },
  onLoad: function () {
    const that = this;
    setTimeout(() => {
      that.setData({
        showSkeleton: false
      })
    }, 3000)
  },
  //触摸开始事件
  touchstart: function (e) {
    console.log(e.touches[0].pageX);
    this.data.touchDot = e.touches[0].pageX;
    var that = this;
    this.data.interval = setInterval(function () {
      that.data.time += 1;
    }, 100);
  },
  //触摸移动事件
  touchmove: function (e) {
    let touchMove = e.touches[0].pageX;
    let touchDot = this.data.touchDot;
    let time = this.data.time;
    console.log("touchMove: " + touchMove + ", touchDot: " + touchDot + ", diff: " + (touchMove - touchDot));
    //向左滑动
    if (touchMove - touchDot <= -40 && time < 10 && !this.data.done) {
      console.log("向左滑动");
      this.data.done = true;
      this.scrollLeft();
    }
    //向右滑动
    if (touchMove - touchDot >= 40 && time < 10 && !this.data.done) {
      console.log("向右滑动");
      this.data.done = true;
      this.scrollRight();
    }
  },
  //触摸结束事件
  touchend: function (e) {
    clearInterval(this.data.interval);
    this.data.time = 0;
    this.data.done = false;
  }, scrollLeft() {
    var animation1 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation2 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation3 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation4 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation5 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })

    this.animation1 = animation1;
    this.animation2 = animation2;
    this.animation3 = animation3;
    this.animation4 = animation4;
    this.animation5 = animation5;

    this.animation1.translateX(-60).opacity(0).step();
    this.animation2.translateX(-140).opacity(0.5).scale(0.8, 0.8).step();
    this.animation3.translateX(-110).opacity(0.5).scale(1, 1).step();
    this.animation4.translateX(-70).opacity(1).scale(1.4, 1.4).step();
    this.animation5.translateX(-30).opacity(0.5).scale(1, 1).step();


    this.setData({
      animation1: animation1.export(),
      animation2: animation2.export(),
      animation3: animation3.export(),
      animation4: animation4.export(),
      animation5: animation5.export()
    })

    var that = this;
    setTimeout(function () {
      that.animation1.translateX(-50).opacity(0.2).scale(0.8, 0.8).step({ duration: 0, timingFunction: 'linear' });
      that.animation2.translateX(-40).opacity(0.5).scale(1, 1).step({ duration: 0, timingFunction: 'linear' });
      that.animation3.translateX(0).opacity(1).scale(1.4, 1.4).step({ duration: 0, timingFunction: 'linear' });
      that.animation4.translateX(40).opacity(0.5).scale(1, 1).step({ duration: 0, timingFunction: 'linear' });
      that.animation5.translateX(50).opacity(0.2).scale(0.8, 0.8).step({ duration: 0, timingFunction: 'linear' });
      that.setData({
        animation1: animation1.export(),
        animation2: animation2.export(),
        animation3: animation3.export(),
        animation4: animation4.export(),
        animation5: animation5.export()
      })
    }.bind(this), 195)

    let array = this.data.clubs;
    let shift = array.shift();
    array.push(shift);

    setTimeout(function () {
      this.setData({
        clubs: array
      })
    }.bind(this), 195)
  },

  //向右滑动事件
  scrollRight() {
    var animation1 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation2 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation3 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation4 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation5 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })

    this.animation1 = animation1;
    this.animation2 = animation2;
    this.animation3 = animation3;
    this.animation4 = animation4;
    this.animation5 = animation5;

    this.animation1.translateX(30).opacity(0.5).scale(1, 1).step();
    this.animation2.translateX(70).opacity(1).scale(1.4, 1.4).step();
    this.animation3.translateX(110).opacity(0.5).scale(1, 1).step();
    this.animation4.translateX(120).opacity(0.2).scale(0.8, 0.8).step();
    this.animation5.translateX(130).opacity(0).step();


    this.setData({
      animation1: animation1.export(),
      animation2: animation2.export(),
      animation3: animation3.export(),
      animation4: animation4.export(),
      animation5: animation5.export()
    })

    var that = this;
    setTimeout(function () {
      that.animation1.translateX(-50).opacity(0.2).scale(0.8, 0.8).step({ duration: 0, timingFunction: 'linear' });
      that.animation2.translateX(-40).opacity(0.5).scale(1, 1).step({ duration: 0, timingFunction: 'linear' });
      that.animation3.translateX(0).opacity(1).scale(1.4, 1.4).step({ duration: 0, timingFunction: 'linear' });
      that.animation4.translateX(40).opacity(0.5).scale(1, 1).step({ duration: 0, timingFunction: 'linear' });
      that.animation5.translateX(50).opacity(0.2).scale(0.8, 0.8).step({ duration: 0, timingFunction: 'linear' });
      that.setData({
        animation1: animation1.export(),
        animation2: animation2.export(),
        animation3: animation3.export(),
        animation4: animation4.export(),
        animation5: animation5.export()
      })
    }.bind(this), 195)

    let array = this.data.clubs;
    let pop = array.pop();
    array.unshift(pop);

    setTimeout(function () {
      this.setData({
        clubs: array
      })
    }.bind(this), 195)
  }
})
