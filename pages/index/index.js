var index = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idx:1,
    list:[
      "http://paly17y6j.bkt.clouddn.com/study1.mp4",
      "http://paly17y6j.bkt.clouddn.com/study2.mp4",
      "http://paly17y6j.bkt.clouddn.com/study3.mp4",
      "http://paly17y6j.bkt.clouddn.com/study4.mp4",
      "http://paly17y6j.bkt.clouddn.com/study5.mp4"
    ]
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
    var that= this 
    try {
      var res = wx.getSystemInfoSync()
      that.setData({
        height: res.screenHeight,
        width: res.screenWidth
        })
    } catch (e) {
      // Do something when catch error
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this 
    if (!that.data.playIndex) { // 没有播放时播放视频 
      that.setData({
        playIndex: "video1",
      })
      //console.log(this.data.playIndex)
      // 默认播放第一个视频
      var videoContext = wx.createVideoContext("video1")
      videoContext.play()
    }
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
    
  },
  next:function(e){
    var that = this 
    console.log(e.currentTarget.dataset.index);
    // 点击完之后,把当前的地址push到原数组中，增加数据，就可实现无限循环了。
    let array = that.data.list;
    array.push(array[e.currentTarget.dataset.index]);
    setTimeout(function () {
      that.setData({
        list: array
      })
    }.bind(that), 195)

    var index =  e.currentTarget.dataset.index + 1
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })
    that.animation = animation
    that.data.list.length
    // if (index == that.data.list.length){ //滑动到最后一个 就禁止滑动了
    //   return
    // }
    // else{
      var idx = that.data.idx += 1   //显示当前的是video 隐藏其他的video
      that.setData({
        idx: idx  
      })
      animation.translateY(-that.data.height * index).step(1)
      that.setData({
        animationData: animation.export()
      })
  // }

    var id = e.currentTarget.id  //点击的按钮id
    console.log(id)
    console.log(this.data.playIndex) //正在播放的id
    if (!this.data.playIndex) { // 没有播放时播放视频
      this.setData({
        playIndex: id,
      })
      //console.log(this.data.playIndex)
      var videoContext = wx.createVideoContext(id)
      videoContext.seek(0)
      videoContext.play()
    } else { // 有播放时先将prev暂停，再播放当前点击的current
      console.log(this.data.playIndex)
      var videoContextPrev = wx.createVideoContext(this.data.playIndex)
      // videoContextPrev.seek(0)
      if (this.data.playIndex != id) { //不知道为什么，不加这个判断的时候这个视频会一直在播放和暂停之间切换
        videoContextPrev.pause()
      }
      this.setData({
        playIndex: id
      })
      var videoContextCurrent = wx.createVideoContext(this.data.playIndex,this)
      videoContextCurrent.seek(0)
      videoContextCurrent.play()
    }
  },
  // 非自动播放情况下 
  bindplay: function (e) {
    console.log(e)
    var id = e.currentTarget.id //点击id
    console.log(id)
    console.log(this.data.playIndex) //正在播放的id
    if (!this.data.playIndex) { // 没有播放时播放视频
      this.setData({
        playIndex: id,  
      })
      var videoContext = wx.createVideoContext(id)
      videoContext.seek(0)
      videoContext.play()
    } else { // 有播放时先将prev暂停，再播放当前点击的current
      var videoContextPrev = wx.createVideoContext(this.data.playIndex)
      // videoContextPrev.seek(0)
      if (this.data.playIndex != id) { //不知道为什么，不加这个判断的时候这个视频会一直在播放和暂停之间切换
        videoContextPrev.pause()
      }
      this.setData({
        playIndex: id
      })
      var videoContextCurrent = wx.createVideoContext(this.data.playIndex)
      videoContextCurrent.seek(0)
      videoContextCurrent.play()
    }
  },

  //触摸开始事件
  touchstart: function (e) {
    console.log(e.touches[0].clientY)
    console.log(e.touches[0].pageX);
    this.data.touchDot = e.touches[0].pageX;
    this.data.touchstartY = e.touches[0].clientY
    var that = this;
    this.data.interval = setInterval(function () {
      that.data.time += 1;
    }, 100);
  },
  //触摸移动事件
  touchmove: function (e) {
    // console.log(e)
    let touchendY = e.touches[0].clientY  //
    let touchstartY = this.data.touchstartY
    let touchMove = e.touches[0].pageX;
    let touchDot = this.data.touchDot;
    let time = this.data.time;
    // console.log("touchMove: " + touchMove + ", touchDot: " + touchDot + ", diff: " + (touchMove - touchDot));
    //向左滑动
    if (touchMove - touchDot <= -40 && time < 10 && !this.data.done) {
      console.log("向左滑动");
      this.data.done = true;
      // this.scrollLeft();
    }
    //向右滑动
    if (touchMove - touchDot >= 40 && time < 10 && !this.data.done) {
      console.log("向右滑动");
      this.data.done = true;
      // this.scrollRight();
    }
    //向上滑动
    if (touchendY - touchstartY <= -40 && time < 10 && !this.data.done){
      console.log("向上滑动");
      this.data.done = true;
      this.scrollTop();
    }
    //向下滑动
    if (touchendY - touchstartY >= 40 && time < 10 && !this.data.done) {
      console.log("向下滑动");
      this.data.done = true;
      this.scrollBottom();
    }
    

  },
  //触摸结束事件
  touchend: function (e) {
    clearInterval(this.data.interval);
    this.data.time = 0;
    this.data.done = false;
  }, 
  scrollLeft() {
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
  },
  
  //向上滑动事件
  scrollTop() {
    var that = this
    index ++
    console.log(index)
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })
    that.animation = animation
    that.data.list.length
    // if (index == that.data.list.length){ //滑动到最后一个 就禁止滑动了
    //   return
    // }
    // else{
      var idx = that.data.idx += 1   //显示当前的是video 隐藏其他的video
      that.setData({
        idx: idx  
      })
      animation.translateY(-that.data.height * index).step(1)
      that.setData({
        animationData: animation.export()
      })
  // }

   
    let array = this.data.list;
    array.push(array[index-1]);

    setTimeout(function () {
      this.setData({
        list: array
      })
    }.bind(this), 195)
  },

  //向下滑动事件
  scrollBottom() {
    var that = this
    index --
    console.log(index)

    if (index <= 0){
      index = 0
      return
    }
    else{

      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'linear',
      })
      that.animation = animation
      that.data.list.length
      // if (index == that.data.list.length){ //滑动到最后一个 就禁止滑动了
      //   return
      // }
      // else{
      var idx = that.data.idx -= 1   //显示当前的是video 隐藏其他的video
      that.setData({
        idx: idx
      })
      animation.translateY(-that.data.height * index).step(1)
      that.setData({
        animationData: animation.export()
      })
      // }


      let array = this.data.list;
      array.push(array[index - 1]);

      setTimeout(function () {
        this.setData({
          list: array
        })
      }.bind(this), 195)
    } 

    
  },

})