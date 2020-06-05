// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: getApp().globalData.baseUrl,
    carouselList:[{"img":"./img/1.jpeg"},{"img":"./img/2.jpg"}], 
    // 页面总高度将会放在这里
    windowHeight: 0,
    // navbar的高度
    navbarHeight: 0,
    // header的高度
    headerHeight: 0,
    // scroll-view的高度
    scrollViewHeight: 0
  },
 onLoad: function () {
    // this.requestCarouselListData();//请求轮播图
    let that = this;
      // 先取出页面高度 windowHeight
      wx.getSystemInfo({
        success: function(res) {
            that.setData({
                windowHeight: res.windowHeight
            });
        }
    });

    // setTimeout(() => {  
        let query = wx.createSelectorQuery().in(this);
        // 然后逐个取出navbar和header的节点信息
        // 选择器的语法与jQuery语法相同
        // query.select('.index_model').boundingClientRect(function(data){
        //   var h = data.height;
        //   console.log(h)
        // }).exec();
        query.select('.index_model').boundingClientRect();
        query.select('#navbar').boundingClientRect();
        query.select('#header').boundingClientRect();
        // 执行上面所指定的请求，结果会按照顺序存放于一个数组中，在callback的第一个参数中返回
        query.exec((res) => {
            // 分别取出navbar和header的高度
            let modelHeight = res[0].height;
            // let navbarHeight = res[1].height;
            // let headerHeight = res[2].height;
            // console.log(modelHeight)
            // console.log(navbarHeight)
            // console.log(headerHeight)
            // 然后就是做个减法
            let scrollViewHeight = this.data.windowHeight - modelHeight-25;

            // 算出来之后存到data对象里面
            this.setData({
                scrollViewHeight: scrollViewHeight
            });
        });
      // },2000)
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