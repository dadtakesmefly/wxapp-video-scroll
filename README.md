# wxapp-video-scroll
小程序里实现抖音效果，无限上滑播放视频

## 坑
- 不能用swiper，因为video原生组件，层级最高，滑动时候swiper并不能生效
- 手写轮播图用touch事件也不行。还是video层级最高，编辑器可以滑动，但是真机上不行
- 只能用点击事件，来切换视频
- 点击事件时候，也不能直接嵌套video，虽然能滑动，但是在真机上没有滑动切换的动画
- 最后只能在点击滑动时候，将video隐藏，滑动完毕后，再将video显示，自动播放，这样就解决了

## 视频管理
 ```  
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
  ```
## 手写轮播
 ```
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
