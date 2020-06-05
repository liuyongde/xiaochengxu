// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: getApp().globalData.baseUrl,
    carouselList:[{"img":"./img/1.jpeg"},{"img":"./img/2.jpg"}],
  },
 onLoad: function () {
    // this.requestCarouselListData();//请求轮播图
  },
  //请求轮播图
  requestCarouselListData(){
    var that = this;//注意this指向性问题
    var urlStr = that.data.host + "/xjj/chome_carousel_list.json"; //请求连接注意替换（我用本地服务器模拟）
    console.log("请求轮播图：" + urlStr);
    wx.request({
      url: urlStr,
      data: {//这里放请求参数，如果传入参数值不是String，会被转换成String 
        // x: '',
        // y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("轮播图返回值：");
        console.log(res.data.result);
        var resultArr = res.data.result;
        that.setData({
          carouselList: resultArr
        })
      }
    })
  },

//点击了轮播图
chomeCarouselClick: function (event) {
    var urlStr = event.currentTarget.dataset.url;
    console.log("点击了轮播图：" + urlStr);
    // wx.navigateTo({
    //   url: 'test?id=1'
    // })
  }
})