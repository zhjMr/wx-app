import ShoppingModel from "../../model/indexModel"
import {addCart} from "../../common/cart"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swipeList: []
  },
  // 方法做的事情: 获取轮播图数据
  getAddswiper() {
    //轮播图的数据
    const data = [{
      id: 1,
      link: '',
      imgUrl: 'https://pic1.imgdb.cn/item/6360c8d916f2c2beb15b0de0.jpg'
    },
    {
      id: 2,
      link: '',
      imgUrl: 'https://pic1.imgdb.cn/item/6360c8d516f2c2beb15b0154.jpg'
    },
    {
      id: 3,
      link: '',
      imgUrl: 'https://pic1.imgdb.cn/item/6360c8d116f2c2beb15af2f5.jpg'
    }
    ]
    this.setData({
      swipeList: data
    })
  },
  //方法做的事情：扫码触发事件
  handleCode() {

    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        const { result } = res
        this.getviewCode(result)
      }
    })

  },
  // 方法做的事情: 根据商品条形码获取商品信息
  async getviewCode(code) {
    try {
      let data = { qcode: code }
      const response = await ShoppingModel.getProductInfo(data)
      console.log(response, 'response');
      if (response.length > 0) {
        //数据存储本地并跳转
        addCart(response[0])
           wx.navigateTo({
             url: '/pages/cart/cart',
           })
      } else {
        //商品信息提示
        wx.showToast({
          title: '商品信息获取不到',
          icon: "none"
        })
      }
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAddswiper()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})